#!/usr/bin/env python3
import urllib.request
import urllib.parse
import json
import time
import re
import sys
import random
import argparse
from html import unescape

# -------- Config (defaults) --------
DEFAULT_DELAY_SEC = 5
DEFAULT_SAMPLE_SIZE = 10
DEFAULT_SEARCH_LIMIT = 50     # how many results to fetch before random sampling
EXACT_WORD = True             # True = count whole words, False = substrings
USER_AGENT = "Mozilla/5.0 (compatible; RedditWordCounter/1.0; +https://example.com)"

# -------- HTTP helpers --------
def http_get(url: str, timeout=20) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()

# -------- Reddit search --------
def reddit_search_urls(query: str, limit: int = DEFAULT_SEARCH_LIMIT):
    """
    Returns a list of canonical Reddit post URLs from search results for the query.
    """
    q = urllib.parse.quote_plus(query)
    # Using Reddit's public search JSON for links
    search_url = f"https://www.reddit.com/search.json?q={q}&limit={limit}&sort=relevance&type=link"
    try:
        raw = http_get(search_url)
        data = json.loads(raw.decode("utf-8", errors="ignore"))
        children = data.get("data", {}).get("children", [])
        urls = []
        for ch in children:
            d = ch.get("data", {})
            # Build canonical URL via permalink
            pl = d.get("permalink")
            if pl:
                urls.append("https://www.reddit.com" + pl)
        # Deduplicate while preserving order
        seen = set()
        uniq = []
        for u in urls:
            if u not in seen:
                uniq.append(u)
                seen.add(u)
        return uniq
    except Exception as e:
        print(f"[search] ERROR {type(e).__name__}: {e}", file=sys.stderr)
        return []

# -------- Post JSON parsing --------
def to_json_url(url: str) -> str:
    if not url.endswith("/"):
        url += "/"
    return url + ".json"

def collect_post_text_and_title(json_root):
    """
    json_root is a list: [submission listing, comments listing]
    Returns (full_text, subject)
    """
    subject = "No Title Found"
    full_text_parts = []

    if not isinstance(json_root, list) or not json_root:
        return "", subject

    # Submission
    post_listing = json_root[0].get("data", {}).get("children", [])
    if post_listing:
        post = post_listing[0].get("data", {})
        title = unescape(post.get("title", "") or "").strip()
        selftext = unescape(post.get("selftext", "") or "")
        if title:
            subject = title
            full_text_parts.append(title)
        if selftext:
            full_text_parts.append(selftext)

    # Comments
    if len(json_root) > 1:
        comments_listing = json_root[1].get("data", {}).get("children", [])

        def walk(children):
            for child in children:
                kind = child.get("kind")
                data = child.get("data", {})
                if kind == "t1":  # comment
                    body = unescape(data.get("body", "") or "")
                    if body:
                        full_text_parts.append(body)
                    replies = data.get("replies")
                    if isinstance(replies, dict):
                        walk(replies.get("data", {}).get("children", []))
                # kind == "more" is ignored (not expanded)
        walk(comments_listing)

    return "\n".join(full_text_parts), subject

def count_occurrences(text: str, word: str, exact: bool = True) -> int:
    if not text or not word:
        return 0
    if exact:
        pattern = r"\b{}\b".format(re.escape(word))
    else:
        pattern = re.escape(word)
    return len(re.findall(pattern, text, flags=re.IGNORECASE))

# -------- Main workflow --------
def process_urls_for_word(word: str, urls, sample_size: int, delay_sec: int):
    if not urls:
        print(f"\n{word}:\n")
        return

    # Randomly sample up to sample_size distinct URLs
    sample = urls if len(urls) <= sample_size else random.sample(urls, sample_size)

    results = []
    for idx, u in enumerate(sample, start=1):
        json_url = to_json_url(u)
        try:
            raw = http_get(json_url)
            data = json.loads(raw.decode("utf-8", errors="ignore"))
            full_text, subject = collect_post_text_and_title(data)
            occ = count_occurrences(full_text, word, EXACT_WORD)
            result = f"{u}|{subject}|{occ}"
        except Exception as e:
            result = f"{u}|ERROR {type(e).__name__}: {e}|0"
        results.append(result)
        print(f"[{word}] {idx}/{len(sample)} -> {result}", file=sys.stderr)
        time.sleep(delay_sec)

    print(f"\n{word}:{', '.join(results)}\n")

def main():
    parser = argparse.ArgumentParser(
        description="Search Reddit for posts containing a word, sample 10 at random, and count occurrences in title+post+comments."
    )
    parser.add_argument("word", help="The target word to search for and count.")
    parser.add_argument("--sample", type=int, default=DEFAULT_SAMPLE_SIZE, help="Number of posts to sample (default: 10)")
    parser.add_argument("--delay", type=int, default=DEFAULT_DELAY_SEC, help="Delay (seconds) between post fetches (default: 5)")
    parser.add_argument("--limit", type=int, default=DEFAULT_SEARCH_LIMIT, help="Search result limit before sampling (default: 50)")
    parser.add_argument("--substring", action="store_true", help="Count substrings instead of whole words")
    args = parser.parse_args()

    global EXACT_WORD
    EXACT_WORD = not args.substring

    # Search
    urls = reddit_search_urls(args.word, limit=args.limit)
    if not urls:
        print(f"[search] No results for '{args.word}'.", file=sys.stderr)

    # Process & output
    process_urls_for_word(args.word, urls, sample_size=args.sample, delay_sec=args.delay)

if __name__ == "__main__":
    main()