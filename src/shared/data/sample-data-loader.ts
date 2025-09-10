import type { RedditPost } from '../types/game';

// Real sample data from data.sample file
const REAL_SAMPLE_DATA = `aberrant:https://www.reddit.com/r/OnyxPathRPG/comments/17mfrxx/how_is_aberrant/|How is Aberrant?|7, https://www.reddit.com/r/rpg/comments/jy01yg/aberrant_opinions/|Aberrant opinions...|6, https://www.reddit.com/r/Deathcore/comments/1f7r4ve/new_disembodied_tyrant_aberrant_waltz/|(NEW) Disembodied Tyrant - Aberrant Waltz|2, https://www.reddit.com/r/OnyxPathRPG/comments/ky3fkr/aberrant_first_read_through_questions/|Aberrant: First read through questions|6
banal:https://www.reddit.com/r/vocabulary/comments/15wpqbg/banal/|Banal|5, https://www.reddit.com/r/literature/comments/1d5l5up/do_you_like_banal_viewpoints/|Do you like banal viewpoints?|7, https://www.reddit.com/r/ENGLISH/comments/1avrup3/how_do_you_pronounce_the_word_banal/|How do you pronounce the word "banal?"|37, https://www.reddit.com/r/Anarchism/comments/1fmtl0h/til_about_the_term_banal_nationalism/|TIL about the term "banal nationalism"|5
cacophony:https://www.reddit.com/r/vocabulary/comments/152zpos/cacophony/|Cacophony|3, https://www.reddit.com/r/popheads/comments/1f4mzja/paris_paloma_cacophony/|Paris Paloma - Cacophony|14, https://www.reddit.com/r/Emo/comments/1b1gujl/can_we_talk_about_cacophony_by_blink182/|Can we talk about Cacophony by blink-182?|6, https://www.reddit.com/r/etymology/comments/lsyknr/if_a_cacophony_is_a_horrible_sound_how_would_you/|If a cacophony is a horrible sound, how would you call a horrible experience/feeling? Cacoaesthetic?|8
debacle:https://www.reddit.com/r/OaklandAthletics/comments/1lpyg34/debacle_in_the_desert/|Debacle in the Desert|2, https://www.reddit.com/r/acotar/comments/1kfu7m5/the_announcement_debacle/|The announcement debacle|2, https://www.reddit.com/r/THPS/comments/1l72vca/my_final_thoughts_on_the_34_debacle/|My final thoughts on the 3+4 debacle.|1, https://www.reddit.com/r/ATT/comments/1hnkpin/return_debacle/|Return Debacle|1
ebullient:https://www.reddit.com/r/grammar/comments/1amo8ya/today_i_knowingly_used_a_word_i_didnt_know/|Today i knowingly used a word i didnt know. Ebullient in the sentence below. I was just being silly, however when my partner and I looked up the word…|14, https://www.reddit.com/r/ENGLISH/comments/1mtzaig/special_vocabulary_ebullient/|Special vocabulary: Ebullient|4, https://www.reddit.com/r/CasualConversation/comments/c1ip33/just_wanted_to_share_a_good_word_with_you/|Just wanted to share a good word with you: Ebullient|2, https://www.reddit.com/r/EnglishLearning/comments/en0qa8/whats_the_difference_between_joyful_and_ebullient/|whats the difference between joyful and ebullient?|2
facetious:https://www.reddit.com/r/grammar/comments/9lf1c7/trying_to_nail_down_what_facetious_actually_is/|Trying to nail down what "facetious" actually is...|34, https://www.reddit.com/r/explainlikeimfive/comments/gpqubp/eli5_whats_the_difference_between_being_facetious/|ELI5: What's the difference between being facetious and sarcastic?|14, https://www.reddit.com/r/EnglishLearning/comments/vy47ie/proper_use_of_facetious/|Proper use of "facetious"?|19, https://www.reddit.com/r/IWantToLearn/comments/4jm12a/iwtl_how_to_stop_being_facetious_and_to_respond/|IWTL: How to stop being facetious and to respond to people maturely?|3
garrulous:https://www.reddit.com/r/words/comments/onbhqz/garrulous/|GARRULOUS|3, https://www.reddit.com/r/logophilia/comments/1hpp2e6/garrulous/|Garrulous|3, https://www.reddit.com/r/VocabWordOfTheDay/comments/yui9hv/garrulous/|Garrulous|1, https://www.reddit.com/r/GRE/comments/1djkp45/gre_word_of_the_day_garrulous/|GRE Word of the Day: Garrulous|11
hackneyed:https://www.reddit.com/r/etymology/comments/i5u9r5/hackneyed/|Hackneyed|5, https://www.reddit.com/r/sciencefiction/comments/1ixq43z/hackneyed_phrases/|Hackneyed Phrases?|2, https://www.reddit.com/r/words/comments/10ur5wi/anyone_who_uses_the_hackneyed_prior_to_instead_of/|Anyone who uses the hackneyed 'prior to' instead of 'before' is required to use 'posterior to' instead of 'after'.|3, https://www.reddit.com/r/GRE/comments/m4pxwz/platitude_vs_hackneyed_what_is_the_difference/|platitude vs hackneyed what is the difference?|1
iconoclast:https://www.reddit.com/r/metroidvania/comments/yqkkbp/your_thoughts_about_iconoclasts/|Your thoughts about iconoclasts ?|1, https://www.reddit.com/r/metroidvania/comments/1fmefep/so_whats_the_deal_with_iconoclasts/|So what's the deal with Iconoclasts?|0, https://www.reddit.com/r/explainlikeimfive/comments/ybjuul/eli5_the_difference_between_iconoclast_and/|ELI5 the difference between iconoclast and philistine.|5, https://www.reddit.com/r/RogueTraderCRPG/comments/1gha75r/why_is_iconoclast_so_popular/|Why is Iconoclast so popular ?|102
jaded:https://www.reddit.com/r/Life/comments/1bpjf9s/is_it_normal_to_become_jaded_as_you_get_older/|Is it normal to become jaded as you get older?|5, https://www.reddit.com/r/CasualConversation/comments/191oeai/how_to_not_be_jaded_with_the_world/|How to not be jaded with the world?|5, https://www.reddit.com/r/datingoverthirty/comments/jv0mra/i_realize_that_i_am_jaded/|I realize that I am jaded|5, https://www.reddit.com/r/AskMenOver30/comments/cd3ok9/have_you_noticed_yourself_become_more_jaded_the/|Have you noticed yourself become more jaded the older you get?|15
kaleidoscopic:https://www.reddit.com/r/progmetal/comments/1j3vkgq/fallujah_kaleidoscopic_waves/|Fallujah - Kaleidoscopic Waves|2, https://www.reddit.com/r/MovieSuggestions/comments/1ish93e/movies_that_can_be_described_as_kaleidoscopic/|Movies that can be described as "kaleidoscopic"|7, https://www.reddit.com/r/CasualConversation/comments/13j3x1o/i_have_whats_called_kaleidoscope_vision/|I have what's called Kaleidoscope Vision.|0, https://www.reddit.com/r/footballcards/comments/1i25xrc/how_rare_are_kaleidoscopic_cards_from_mosaic/|How rare are kaleidoscopic cards from mosaic?|4
labyrinthine:https://www.reddit.com/r/offmychest/comments/mtygpf/i_got_diagnosed_with_labyrinthitis_its_not_as/|I got diagnosed with Labyrinthitis, its not as cool as it sounds.|3, https://www.reddit.com/r/virtualreality/comments/18x0zj0/labyrinthine_is_2023_vr_game_of_the_year_of_steam/|Labyrinthine is 2023 vr game of the year of steam|10, https://www.reddit.com/r/HorrorGaming/comments/126upj1/the_blackout_club_vs_devour_vs_labyrinthine_which/|The Blackout Club vs DEVOUR vs Labyrinthine, which is best?|4, https://www.reddit.com/r/LabyrinthineGame/comments/z830dh/need_tips_and_tricks_to_navigate_in_this_game/|Need tips and tricks to navigate in this game!|0
magnanimous:https://www.reddit.com/r/VocabWordOfTheDay/comments/oyl8h0/magnanimous/|Magnanimous|5, https://www.reddit.com/r/etymology/comments/gbjm27/magnanimous_magnificent_major_animate_unanimous/|magnanimous → magnificent, major, animate, unanimous|2, https://www.reddit.com/r/Stoicism/comments/ut5x0w/magnanimous_man/|Magnanimous Man|6, https://www.reddit.com/r/asoiaf/comments/1dkizlz/spoilers_extended_hotd_aegon_the_magnanimous/|(Spoilers extended) HOTD 'Aegon the Magnanimous'|8
nascent:https://www.reddit.com/r/FanFiction/comments/vo7zgc/word_of_the_day_nascent/|Word of the day - nascent|15, https://www.reddit.com/r/wuxiaworld/comments/ye8mee/nascent_soul_explanation/|Nascent Soul Explanation.|52, https://www.reddit.com/r/EDM/comments/xmljdz/nascent_album_review_incredible_sound_design/|'Nascent' album review (Incredible sound design)|2, https://www.reddit.com/r/hiphopheads/comments/ncc0ot/fresh_album_nascent_minus_the_bullshit_lifes_great/|[FRESH ALBUM] Nascent - Minus The Bullshit Life's Great|12
obsequious:https://www.reddit.com/r/INTP/comments/5ocxhj/how_do_you_deal_with_obsequious_coworkers/|How do you deal with obsequious co-workers?|2, https://www.reddit.com/r/words/comments/10gpfi8/obsequious/|Obsequious.|1, https://www.reddit.com/r/whatstheword/comments/1fwgicn/waw_for_obsequious_or_ingratiating/|WAW for obsequious or ingratiating?|3, https://www.reddit.com/r/suggestmeabook/comments/ci6xwu/please_recommend_books_that_might_help_an/|Please recommend books that might help an obsequious person like me feel comfortable after saying NO to other people's requests.|2
palpable:https://www.reddit.com/r/words/comments/3mvjh8/what_is_the_difference_between_palpable_and/|What is the difference between palpable and tangible?|8, https://www.reddit.com/r/words/comments/toynn7/palpable/|Palpable|1, https://www.reddit.com/r/breastcancer/comments/1kjoupa/palpable_nodes_pcr_unlikely/|Palpable nodes = PCR Unlikely?|3, https://www.reddit.com/r/saltierthankrayt/comments/1jlg2q2/the_cringe_is_palpable/|The cringe is PALPABLE|1
quaint:https://www.reddit.com/r/AskACanadian/comments/138ae8m/is_quaint_a_polite_word_to_use_in_describing_a/|Is "quaint" a polite word to use in describing a town or a place?|50, https://www.reddit.com/r/AskAnAmerican/comments/ii2ota/what_do_you_mean_when_you_refer_to_somewhere_as/|What do you mean when you refer to somewhere as being 'quaint'?|43, https://www.reddit.com/r/VocabWordOfTheDay/comments/14l2rih/quaint/|Quaint|3, https://www.reddit.com/r/AskAnAmerican/comments/ii2ota/what_do_you_mean_when_you_refer_to_somewhere_as/|What do you mean when you refer to somewhere as being 'quaint'?|44
rancorous:https://www.reddit.com/r/socialskills/comments/4kic8q/im_a_rancorous_person/|I'm a rancorous person|1, https://www.reddit.com/r/infp/comments/ztghrb/are_you_rancorous_on_others/|Are you rancorous on others ?|2, https://www.reddit.com/r/DestinyFashion/comments/rw2kho/the_rancorous_serpent/|The Rancorous Serpent|1, https://www.reddit.com/r/StarWarsJediSurvivor/comments/134ej9e/rancorous_good_time/|Rancorous good time|1
sagacious:https://www.reddit.com/r/logophilia/comments/aqlts7/sagacious_having_or_showing_keen_mental/|Sagacious: Having or showing keen mental discernment and good judgement; wise or shrewd.|4, https://www.reddit.com/r/words/comments/12vxp0n/sagacious/|Sagacious|1, https://www.reddit.com/r/AdviceAnimals/comments/1f91g30/sagacity_the_quality_of_being_sagacious/|sa•gac•i•ty: the quality of being sagacious|4, https://www.reddit.com/r/writing/comments/3yn2vh/what_is_the_difference_between_prudence_and/|What is the difference between prudence and sagacity?|4
taciturn:https://www.reddit.com/r/EnglishLearning/comments/ieq5lb/does_the_word_taciturn_have_a_negative_connotation/|Does the word "taciturn" have a negative connotation?|3, https://www.reddit.com/r/Parenting/comments/1beo2ut/teen_daughter_taciturn_and_negative/|Teen Daughter taciturn and negative|2, https://www.reddit.com/r/words/comments/dacicl/taciturn/|taciturn|4, https://www.reddit.com/r/intj/comments/rzvbgk/do_intjs_become_laconic_and_taciturn_with_age/|Do INTJs become laconic and taciturn with age?|3
ubiquitous:https://www.reddit.com/r/ENGLISH/comments/1fy1lxg/is_the_word_ubiquitous_a_thing/|Is the word ubiquitous a thing?|34, https://www.reddit.com/r/VocabWordOfTheDay/comments/lzvtxg/ubiquitous/|Ubiquitous|8, https://www.reddit.com/r/grammar/comments/taor76/ubiquitous_usage_debate/|Ubiquitous usage debate|11, https://www.reddit.com/r/EnglishLearning/comments/10mjlt7/whats_the_difference_between_ubiquitous_and/|What's the difference between 'ubiquitous' and 'pervasive'?|6
vacillate:https://www.reddit.com/r/VocabWordOfTheDay/comments/mr0jrh/vacillate/|Vacillate|12, https://www.reddit.com/r/EnglishLearning/comments/17k04mf/if_i_vacillate_about_do_i_have_only_two_options/|If I vacillate about - do I have only two options?|7, https://www.reddit.com/r/grammar/comments/o7gi9h/vacillate/|Vacillate|5, https://www.reddit.com/r/AroundTheNFL/comments/5huo8r/oscillate_vs_vacillate/|Oscillate vs. Vacillate|4
wanton:https://www.reddit.com/r/FanFiction/comments/imi4wx/word_of_the_day_wanton/|Word of the day - "wanton"|9, https://www.reddit.com/r/PetPeeves/comments/1hgqok3/wanton_vs_wonton_in_fiction/|Wanton vs Wonton in fiction|2, https://www.reddit.com/r/EnglishLearning/comments/16gwn6q/when_should_i_use_world_wanton_is_it_common_use/|When should i use world wanton? Is it common use?|6, https://www.reddit.com/r/FanFiction/comments/11zjoo8/the_word_wanton/|The word "wanton"|40
xenophobic:https://www.reddit.com/r/changemyview/comments/1jqyirs/cmv_xenophobia_is_just_racism/|CMV: xenophobia is just racism|9, https://www.reddit.com/r/Healthygamergg/comments/1hhnotd/i_feel_like_im_becoming_xenophobic_and_racist_out/|I feel like I'm becoming xenophobic and racist out of guilt, but I really don't want to be and I don't have it in my heart.|5, https://www.reddit.com/r/PoliticalScience/comments/1l2aznz/why_does_it_seem_that_xenophobia_is_becoming_new/|Why does it seem that xenophobia is becoming new US government policy?|2, https://www.reddit.com/r/asklatinamerica/comments/17zqo8t/whats_the_most_blatantly_xenophobic_or_bigoted/|What's the most blatantly xenophobic or bigoted thing you've seen or heard from a gringo?|3
yearning:https://www.reddit.com/r/RomanceBooks/comments/18k826j/does_unrequited_yearning_really_happen_in_real/|Does (unrequited?) yearning really happen in real life?|12, https://www.reddit.com/r/limerence/comments/1gc6oof/the_deliciousness_of_painful_yearning/|The deliciousness of painful yearning|6, https://www.reddit.com/r/fantasyromance/comments/1k25y8u/what_is_yearning_to_you/|What is "yearning" to you?|15, https://www.reddit.com/r/RomanceBooks/comments/1gof17b/yearning_is_a_lost_art/|Yearning is a lost art.|87
zealous:https://www.reddit.com/r/words/comments/21xsb6/i_dont_understand_what_zealous_is_is_it_someone/|I don't understand what zealous is. Is it someone very religious or can it be used in non religious situations?|5, https://www.reddit.com/r/CrusaderKings/comments/1girr53/zealous_will_preach_in_atier_for_all_eternity/|Zealous will preach in A-tier for all eternity! That's the tier list done, thanks so much to everyone who participated!|4, https://www.reddit.com/r/etymology/comments/ukdt5r/jealous_and_zealous_dont_just_rhyme_they_have_a/|Jealous and zealous don't just rhyme, they have a common Medieval Latin root. Jealous came up earlier in English via French, while Zealous came to English later but more directly from <zelosus>. (Links in comments)|9, https://www.reddit.com/r/Planetside/comments/us0ngt/zealous_is_ps2s_worst_content_creator/|Zealous is PS2's worst content creator|17`;

type ParsedSampleData = {
  [word: string]: RedditPost[];
};

let parsedData: ParsedSampleData | null = null;

function parseSampleData(): ParsedSampleData {
  if (parsedData) {
    return parsedData;
  }

  const result: ParsedSampleData = {};
  const lines = REAL_SAMPLE_DATA.trim().split('\n');

  for (const line of lines) {
    // Split on the first colon to separate word from posts
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const word = line.substring(0, colonIndex).trim();
    const postsString = line.substring(colonIndex + 1);

    if (!word || !postsString) continue;

    const posts: RedditPost[] = [];
    // Split posts by ", " but be careful of commas in titles
    const postEntries = postsString.split(', https://').map((entry, index) => {
      // Add back the "https://" prefix except for the first entry
      return index === 0 ? entry : 'https://' + entry;
    });

    for (const entry of postEntries) {
      // Split by | to get URL, title, and occurrence count
      const parts = entry.split('|');
      if (parts.length !== 3) continue;

      const [url, title, occurrenceStr] = parts;
      const occurrenceCount = parseInt(occurrenceStr || '0', 10);

      if (!url || !title || isNaN(occurrenceCount)) continue;

      // Extract post ID and subreddit from URL
      const urlMatch = url.match(/\/r\/([^\/]+)\/comments\/([a-zA-Z0-9]+)\//);
      const subreddit = urlMatch?.[1] || 'unknown';
      const postId = urlMatch?.[2] || url.split('/').pop() || 'unknown';

      posts.push({
        id: postId,
        title: title.trim(),
        url: url.trim(),
        subreddit,
        upvotes: 0, // Will be fetched from Reddit API
        commentCount: 0, // Will be fetched from Reddit API
        occurrenceCount,
      });
    }

    if (posts.length > 0) {
      result[word] = posts;
    }
  }

  parsedData = result;
  return result;
}

export function getCuratedPostsForWord(word: string): RedditPost[] {
  const data = parseSampleData();
  return data[word] || [];
}

export function getPostOccurrenceCount(word: string, postId: string): number {
  const posts = getCuratedPostsForWord(word);
  const post = posts.find(p => p.id === postId);
  return post?.occurrenceCount || 0;
}

export function getAvailableSampleWords(): string[] {
  const data = parseSampleData();
  return Object.keys(data);
}

export function getRandomSampleWord(): string {
  const words = getAvailableSampleWords();
  if (words.length === 0) {
    throw new Error('No sample words available');
  }
  const selectedWord = words[Math.floor(Math.random() * words.length)];
  if (!selectedWord) {
    throw new Error('Failed to select a random word');
  }
  return selectedWord;
}
