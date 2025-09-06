import { SATWord } from '../types/game';

// Balanced SAT vocabulary words reflecting natural dictionary distribution
export const SAT_WORDS: SATWord[] = [
  // A words (12 words - ~6% of total)
  {
    word: 'aberrant',
    definition: 'departing from an accepted standard; deviant',
    synonyms: ['deviant', 'abnormal', 'atypical', 'irregular', 'anomalous'],
    lemmas: ['aberrant', 'aberrance', 'aberrancy'],
  },
  {
    word: 'abhor',
    definition: 'regard with disgust and hatred',
    synonyms: ['detest', 'loathe', 'despise', 'hate', 'abominate'],
    lemmas: ['abhor', 'abhorrent', 'abhorrence'],
  },
  {
    word: 'aesthetic',
    definition: 'concerned with beauty or the appreciation of beauty',
    synonyms: ['artistic', 'beautiful', 'tasteful', 'elegant', 'stylish'],
    lemmas: ['aesthetic', 'aesthetics', 'aesthetically'],
  },
  {
    word: 'alacrity',
    definition: 'brisk and cheerful readiness',
    synonyms: ['eagerness', 'enthusiasm', 'willingness', 'promptness', 'zeal'],
    lemmas: ['alacrity'],
  },
  {
    word: 'ambiguous',
    definition: 'open to more than one interpretation; having a double meaning',
    synonyms: ['unclear', 'vague', 'equivocal', 'confusing', 'uncertain'],
    lemmas: ['ambiguous', 'ambiguity', 'ambiguously'],
  },
  {
    word: 'anomaly',
    definition: 'something that deviates from what is standard, normal, or expected',
    synonyms: ['abnormality', 'irregularity', 'deviation', 'exception', 'oddity'],
    lemmas: ['anomaly', 'anomalous', 'anomalously'],
  },
  {
    word: 'apathetic',
    definition: 'showing or feeling no interest, enthusiasm, or concern',
    synonyms: ['indifferent', 'uninterested', 'unconcerned', 'listless', 'lethargic'],
    lemmas: ['apathetic', 'apathy', 'apathetically'],
  },
  {
    word: 'articulate',
    definition: 'having or showing the ability to speak fluently and coherently',
    synonyms: ['eloquent', 'fluent', 'coherent', 'clear', 'expressive'],
    lemmas: ['articulate', 'articulation', 'articulating'],
  },
  {
    word: 'astute',
    definition: 'having or showing an ability to accurately assess situations',
    synonyms: ['shrewd', 'sharp', 'clever', 'perceptive', 'discerning'],
    lemmas: ['astute', 'astutely', 'astuteness'],
  },
  {
    word: 'audacious',
    definition: 'showing a willingness to take surprisingly bold risks',
    synonyms: ['bold', 'daring', 'fearless', 'intrepid', 'brave'],
    lemmas: ['audacious', 'audacity', 'audaciously'],
  },
  {
    word: 'austere',
    definition: 'severe or strict in manner, attitude, or expression',
    synonyms: ['stern', 'strict', 'harsh', 'severe', 'rigid'],
    lemmas: ['austere', 'austerely', 'austerity'],
  },
  {
    word: 'avarice',
    definition: 'extreme greed for wealth or material gain',
    synonyms: ['greed', 'cupidity', 'covetousness', 'rapacity', 'acquisitiveness'],
    lemmas: ['avarice', 'avaricious', 'avariciously'],
  },

  // B words (10 words - ~5% of total)
  {
    word: 'banal',
    definition: 'so lacking in originality as to be obvious and boring',
    synonyms: ['trite', 'hackneyed', 'clichéd', 'predictable', 'unoriginal'],
    lemmas: ['banal', 'banality', 'banally'],
  },
  {
    word: 'belligerent',
    definition: 'hostile and aggressive',
    synonyms: ['aggressive', 'hostile', 'combative', 'pugnacious', 'warlike'],
    lemmas: ['belligerent', 'belligerence', 'belligerently'],
  },
  {
    word: 'benevolent',
    definition: 'well meaning and kindly',
    synonyms: ['kind', 'compassionate', 'charitable', 'generous', 'altruistic'],
    lemmas: ['benevolent', 'benevolence', 'benevolently'],
  },
  {
    word: 'bombastic',
    definition: 'high-sounding but with little meaning; inflated',
    synonyms: ['pompous', 'pretentious', 'grandiose', 'inflated', 'overblown'],
    lemmas: ['bombastic', 'bombast', 'bombastically'],
  },
  {
    word: 'brevity',
    definition: 'concise and exact use of words in writing or speech',
    synonyms: ['conciseness', 'succinctness', 'terseness', 'shortness', 'economy'],
    lemmas: ['brevity', 'brief', 'briefly'],
  },
  {
    word: 'bucolic',
    definition: 'relating to the pleasant aspects of the countryside and country life',
    synonyms: ['rural', 'rustic', 'pastoral', 'agricultural', 'idyllic'],
    lemmas: ['bucolic', 'bucolically'],
  },
  {
    word: 'burgeon',
    definition: 'begin to grow or increase rapidly; flourish',
    synonyms: ['flourish', 'thrive', 'prosper', 'bloom', 'expand'],
    lemmas: ['burgeon', 'burgeoning', 'burgeoned'],
  },
  {
    word: 'buttress',
    definition: 'increase the strength of or justification for; reinforce',
    synonyms: ['support', 'strengthen', 'reinforce', 'shore up', 'bolster'],
    lemmas: ['buttress', 'buttressed', 'buttressing'],
  },
  {
    word: 'byzantine',
    definition:
      'excessively complicated, typically involving a great deal of administrative detail',
    synonyms: ['complex', 'complicated', 'convoluted', 'intricate', 'labyrinthine'],
    lemmas: ['byzantine'],
  },
  {
    word: 'boorish',
    definition: 'rough or ill-mannered; coarse',
    synonyms: ['rude', 'crude', 'vulgar', 'uncouth', 'ill-mannered'],
    lemmas: ['boorish', 'boor', 'boorishly'],
  },

  // C words (12 words - ~6% of total)
  {
    word: 'cacophony',
    definition: 'a harsh, discordant mixture of sounds',
    synonyms: ['discord', 'dissonance', 'noise', 'din', 'racket'],
    lemmas: ['cacophony', 'cacophonous', 'cacophonously'],
  },
  {
    word: 'candid',
    definition: 'truthful and straightforward; frank',
    synonyms: ['honest', 'frank', 'direct', 'straightforward', 'sincere'],
    lemmas: ['candid', 'candidly', 'candidness'],
  },
  {
    word: 'capricious',
    definition: 'given to sudden and unaccountable changes of mood or behavior',
    synonyms: ['unpredictable', 'fickle', 'volatile', 'erratic', 'whimsical'],
    lemmas: ['capricious', 'caprice', 'capriciously'],
  },
  {
    word: 'caustic',
    definition: 'sarcastic in a scathing and bitter way',
    synonyms: ['sarcastic', 'cutting', 'biting', 'acerbic', 'harsh'],
    lemmas: ['caustic', 'caustically', 'causticity'],
  },
  {
    word: 'circumspect',
    definition: 'wary and unwilling to take risks',
    synonyms: ['cautious', 'careful', 'prudent', 'wary', 'vigilant'],
    lemmas: ['circumspect', 'circumspection', 'circumspectly'],
  },
  {
    word: 'cogent',
    definition: 'clear, logical, and convincing',
    synonyms: ['convincing', 'compelling', 'persuasive', 'logical', 'coherent'],
    lemmas: ['cogent', 'cogency', 'cogently'],
  },
  {
    word: 'complacent',
    definition: 'showing smug or uncritical satisfaction with oneself',
    synonyms: ['self-satisfied', 'smug', 'content', 'pleased', 'satisfied'],
    lemmas: ['complacent', 'complacency', 'complacently'],
  },
  {
    word: 'copious',
    definition: 'abundant in supply or quantity',
    synonyms: ['abundant', 'plentiful', 'ample', 'extensive', 'profuse'],
    lemmas: ['copious', 'copiously', 'copiousness'],
  },
  {
    word: 'credulous',
    definition: 'having or showing too great a readiness to believe things',
    synonyms: ['gullible', 'naive', 'trusting', 'unsuspecting', 'innocent'],
    lemmas: ['credulous', 'credulity', 'credulously'],
  },
  {
    word: 'cursory',
    definition: 'hasty and therefore not thorough or detailed',
    synonyms: ['superficial', 'perfunctory', 'casual', 'brief', 'hurried'],
    lemmas: ['cursory', 'cursorily', 'cursoriness'],
  },
  {
    word: 'cynical',
    definition: 'believing that people are motivated purely by self-interest',
    synonyms: ['skeptical', 'pessimistic', 'distrustful', 'suspicious', 'negative'],
    lemmas: ['cynical', 'cynicism', 'cynically'],
  },
  {
    word: 'conundrum',
    definition: 'a confusing and difficult problem or question',
    synonyms: ['puzzle', 'problem', 'dilemma', 'quandary', 'enigma'],
    lemmas: ['conundrum', 'conundrums'],
  },

  // D words (15 words - ~7.5% of total)
  {
    word: 'debacle',
    definition: 'a sudden and ignominious failure; a fiasco',
    synonyms: ['disaster', 'fiasco', 'catastrophe', 'failure', 'collapse'],
    lemmas: ['debacle'],
  },
  {
    word: 'decorous',
    definition: 'in keeping with good taste and propriety; polite and restrained',
    synonyms: ['proper', 'seemly', 'dignified', 'respectable', 'appropriate'],
    lemmas: ['decorous', 'decorum', 'decorously'],
  },
  {
    word: 'defiant',
    definition: 'boldly resistant or challenging',
    synonyms: ['rebellious', 'insubordinate', 'disobedient', 'resistant', 'unruly'],
    lemmas: ['defiant', 'defiance', 'defiantly'],
  },
  {
    word: 'deliberate',
    definition: 'done consciously and intentionally',
    synonyms: ['intentional', 'planned', 'calculated', 'purposeful', 'premeditated'],
    lemmas: ['deliberate', 'deliberately', 'deliberation'],
  },
  {
    word: 'demagogue',
    definition:
      'a political leader who seeks support by appealing to popular desires and prejudices',
    synonyms: ['rabble-rouser', 'agitator', 'firebrand', 'instigator', 'provocateur'],
    lemmas: ['demagogue', 'demagoguery', 'demagogic'],
  },
  {
    word: 'demure',
    definition: 'reserved, modest, and shy',
    synonyms: ['modest', 'reserved', 'shy', 'retiring', 'unassuming'],
    lemmas: ['demure', 'demurely', 'demureness'],
  },
  {
    word: 'deplore',
    definition: 'feel or express strong disapproval of something',
    synonyms: ['condemn', 'criticize', 'disapprove', 'denounce', 'censure'],
    lemmas: ['deplore', 'deplorable', 'deplorably'],
  },
  {
    word: 'deride',
    definition: 'express contempt for; ridicule',
    synonyms: ['mock', 'ridicule', 'scorn', 'laugh at', 'belittle'],
    lemmas: ['deride', 'derision', 'derisive'],
  },
  {
    word: 'despondent',
    definition: 'in low spirits from loss of hope or courage',
    synonyms: ['dejected', 'depressed', 'discouraged', 'disheartened', 'downcast'],
    lemmas: ['despondent', 'despondency', 'despondently'],
  },
  {
    word: 'didactic',
    definition: 'intended to teach, particularly in having moral instruction as an ulterior motive',
    synonyms: ['instructive', 'educational', 'informative', 'pedagogical', 'moralistic'],
    lemmas: ['didactic', 'didactically', 'didacticism'],
  },
  {
    word: 'diffident',
    definition: 'modest or shy because of a lack of self-confidence',
    synonyms: ['shy', 'bashful', 'modest', 'timid', 'unassuming'],
    lemmas: ['diffident', 'diffidence', 'diffidently'],
  },
  {
    word: 'diligent',
    definition: 'having or showing care and conscientiousness in work or duties',
    synonyms: ['hardworking', 'industrious', 'conscientious', 'assiduous', 'persistent'],
    lemmas: ['diligent', 'diligence', 'diligently'],
  },
  {
    word: 'discerning',
    definition: 'having or showing good judgment',
    synonyms: ['perceptive', 'astute', 'shrewd', 'discriminating', 'insightful'],
    lemmas: ['discerning', 'discern', 'discernment'],
  },
  {
    word: 'dogmatic',
    definition: 'inclined to lay down principles as incontrovertibly true',
    synonyms: ['opinionated', 'rigid', 'inflexible', 'doctrinaire', 'authoritarian'],
    lemmas: ['dogmatic', 'dogmatism', 'dogmatically'],
  },
  {
    word: 'dynamic',
    definition: 'characterized by constant change, activity, or progress',
    synonyms: ['energetic', 'vigorous', 'active', 'forceful', 'powerful'],
    lemmas: ['dynamic', 'dynamics', 'dynamically', 'dynamism'],
  },

  // E words (15 words - ~7.5% of total)
  {
    word: 'ebullient',
    definition: 'cheerful and full of energy',
    synonyms: ['exuberant', 'buoyant', 'cheerful', 'joyful', 'vivacious'],
    lemmas: ['ebullient', 'ebullience', 'ebulliently'],
  },
  {
    word: 'eclectic',
    definition: 'deriving ideas, style, or taste from a broad and diverse range of sources',
    synonyms: ['diverse', 'varied', 'mixed', 'heterogeneous', 'assorted'],
    lemmas: ['eclectic', 'eclecticism', 'eclectically'],
  },
  {
    word: 'efficacious',
    definition: 'successful in producing a desired or intended result; effective',
    synonyms: ['effective', 'successful', 'productive', 'potent', 'powerful'],
    lemmas: ['efficacious', 'efficacy', 'efficaciously'],
  },
  {
    word: 'eloquent',
    definition: 'fluent or persuasive in speaking or writing',
    synonyms: ['articulate', 'fluent', 'expressive', 'persuasive', 'silver-tongued'],
    lemmas: ['eloquent', 'eloquence', 'eloquently'],
  },
  {
    word: 'enigmatic',
    definition: 'difficult to interpret or understand; mysterious',
    synonyms: ['mysterious', 'puzzling', 'cryptic', 'perplexing', 'inscrutable'],
    lemmas: ['enigmatic', 'enigma', 'enigmatically'],
  },
  {
    word: 'ephemeral',
    definition: 'lasting for a very short time',
    synonyms: ['transient', 'fleeting', 'temporary', 'short-lived', 'momentary'],
    lemmas: ['ephemeral', 'ephemerally'],
  },
  {
    word: 'equivocal',
    definition: 'open to more than one interpretation; ambiguous',
    synonyms: ['ambiguous', 'unclear', 'vague', 'evasive', 'noncommittal'],
    lemmas: ['equivocal', 'equivocate', 'equivocation'],
  },
  {
    word: 'erudite',
    definition: 'having or showing great knowledge or learning',
    synonyms: ['learned', 'scholarly', 'knowledgeable', 'educated', 'well-read'],
    lemmas: ['erudite', 'erudition', 'eruditely'],
  },
  {
    word: 'esoteric',
    definition: 'intended for or likely to be understood by only a small number of people',
    synonyms: ['obscure', 'arcane', 'abstruse', 'recondite', 'specialized'],
    lemmas: ['esoteric', 'esoterically', 'esotericism'],
  },
  {
    word: 'exemplary',
    definition: 'serving as a desirable model; representing the best of its kind',
    synonyms: ['outstanding', 'excellent', 'model', 'ideal', 'admirable'],
    lemmas: ['exemplary', 'exemplarily'],
  },
  {
    word: 'exonerate',
    definition: 'absolve someone from blame for a fault or wrongdoing',
    synonyms: ['absolve', 'clear', 'acquit', 'vindicate', 'exculpate'],
    lemmas: ['exonerate', 'exoneration', 'exonerating'],
  },
  {
    word: 'expedient',
    definition: 'convenient and practical although possibly improper or immoral',
    synonyms: ['convenient', 'practical', 'advantageous', 'useful', 'beneficial'],
    lemmas: ['expedient', 'expediency', 'expediently'],
  },
  {
    word: 'extol',
    definition: 'praise enthusiastically',
    synonyms: ['praise', 'acclaim', 'applaud', 'commend', 'eulogize'],
    lemmas: ['extol', 'extolled', 'extolling'],
  },
  {
    word: 'extraneous',
    definition: 'irrelevant or unrelated to the subject being dealt with',
    synonyms: ['irrelevant', 'unrelated', 'immaterial', 'beside the point', 'superfluous'],
    lemmas: ['extraneous', 'extraneously', 'extraneousness'],
  },
  {
    word: 'exuberant',
    definition: 'filled with or characterized by a lively energy and excitement',
    synonyms: ['enthusiastic', 'energetic', 'excited', 'animated', 'spirited'],
    lemmas: ['exuberant', 'exuberance', 'exuberantly'],
  },

  // F words (12 words - ~6% of total)
  {
    word: 'facetious',
    definition: 'treating serious issues with deliberately inappropriate humor',
    synonyms: ['flippant', 'frivolous', 'tongue-in-cheek', 'playful', 'jesting'],
    lemmas: ['facetious', 'facetiously', 'facetiousness'],
  },
  {
    word: 'fastidious',
    definition: 'very attentive to and concerned about accuracy and detail',
    synonyms: ['meticulous', 'particular', 'fussy', 'finicky', 'demanding'],
    lemmas: ['fastidious', 'fastidiously', 'fastidiousness'],
  },
  {
    word: 'fervent',
    definition: 'having or displaying a passionate intensity',
    synonyms: ['passionate', 'intense', 'ardent', 'zealous', 'enthusiastic'],
    lemmas: ['fervent', 'fervor', 'fervently'],
  },
  {
    word: 'fickle',
    definition: "changing frequently, especially as regards one's loyalties or affections",
    synonyms: ['changeable', 'variable', 'volatile', 'capricious', 'inconstant'],
    lemmas: ['fickle', 'fickleness', 'fickly'],
  },
  {
    word: 'flagrant',
    definition: 'conspicuously or obviously offensive',
    synonyms: ['blatant', 'glaring', 'obvious', 'brazen', 'shameless'],
    lemmas: ['flagrant', 'flagrantly', 'flagrance'],
  },
  {
    word: 'frivolous',
    definition: 'not having any serious purpose or value',
    synonyms: ['trivial', 'superficial', 'silly', 'foolish', 'flippant'],
    lemmas: ['frivolous', 'frivolity', 'frivolously'],
  },
  {
    word: 'frugal',
    definition: 'sparing or economical with regard to money or food',
    synonyms: ['thrifty', 'economical', 'careful', 'prudent', 'sparing'],
    lemmas: ['frugal', 'frugality', 'frugally'],
  },
  {
    word: 'futile',
    definition: 'incapable of producing any useful result; pointless',
    synonyms: ['pointless', 'useless', 'vain', 'fruitless', 'hopeless'],
    lemmas: ['futile', 'futility', 'futilely'],
  },
  {
    word: 'flamboyant',
    definition:
      'tending to attract attention because of their exuberance, confidence, and stylishness',
    synonyms: ['showy', 'ostentatious', 'colorful', 'theatrical', 'extravagant'],
    lemmas: ['flamboyant', 'flamboyance', 'flamboyantly'],
  },
  {
    word: 'fortuitous',
    definition: 'happening by accident or chance rather than design',
    synonyms: ['accidental', 'chance', 'unexpected', 'unplanned', 'serendipitous'],
    lemmas: ['fortuitous', 'fortuitously', 'fortuity'],
  },
  {
    word: 'fractious',
    definition: 'irritable and quarrelsome',
    synonyms: ['irritable', 'grumpy', 'peevish', 'cantankerous', 'quarrelsome'],
    lemmas: ['fractious', 'fractiously', 'fractiousness'],
  },
  {
    word: 'furtive',
    definition:
      'attempting to avoid notice or attention, typically because of guilt or a belief that discovery would lead to trouble',
    synonyms: ['secretive', 'stealthy', 'surreptitious', 'clandestine', 'covert'],
    lemmas: ['furtive', 'furtively', 'furtiveness'],
  },

  // G words (8 words - ~4% of total)
  {
    word: 'garrulous',
    definition: 'excessively talkative, especially on trivial matters',
    synonyms: ['talkative', 'chatty', 'loquacious', 'verbose', 'voluble'],
    lemmas: ['garrulous', 'garrulity', 'garrulously'],
  },
  {
    word: 'gregarious',
    definition: 'fond of the company of others; sociable',
    synonyms: ['sociable', 'outgoing', 'friendly', 'companionable', 'extroverted'],
    lemmas: ['gregarious', 'gregariousness', 'gregariously'],
  },
  {
    word: 'guileless',
    definition: 'devoid of guile; innocent and without deception',
    synonyms: ['innocent', 'naive', 'honest', 'sincere', 'straightforward'],
    lemmas: ['guileless', 'guilelessly', 'guilelessness'],
  },
  {
    word: 'grandiose',
    definition: 'impressive and imposing in appearance or style, especially pretentiously so',
    synonyms: ['impressive', 'magnificent', 'majestic', 'pretentious', 'ostentatious'],
    lemmas: ['grandiose', 'grandiosely', 'grandiosity'],
  },
  {
    word: 'gratuitous',
    definition: 'uncalled for; lacking good reason; unwarranted',
    synonyms: ['unnecessary', 'unwarranted', 'unjustified', 'unprovoked', 'needless'],
    lemmas: ['gratuitous', 'gratuitously', 'gratuitousness'],
  },
  {
    word: 'gregarious',
    definition: 'fond of the company of others; sociable',
    synonyms: ['sociable', 'outgoing', 'friendly', 'companionable', 'extroverted'],
    lemmas: ['gregarious', 'gregariousness', 'gregariously'],
  },
  {
    word: 'gullible',
    definition: 'easily persuaded to believe something; credulous',
    synonyms: ['naive', 'trusting', 'credulous', 'innocent', 'unsuspecting'],
    lemmas: ['gullible', 'gullibility', 'gullibly'],
  },
  {
    word: 'gustatory',
    definition: 'concerned with tasting or the sense of taste',
    synonyms: ['taste-related', 'culinary', 'flavorful', 'palatable', 'savory'],
    lemmas: ['gustatory', 'gustation'],
  },

  // H words (8 words - ~4% of total)
  {
    word: 'hackneyed',
    definition: 'lacking originality or freshness; dull on account of overuse',
    synonyms: ['overused', 'clichéd', 'trite', 'stale', 'worn-out'],
    lemmas: ['hackneyed'],
  },
  {
    word: 'haughty',
    definition: 'arrogantly superior and disdainful',
    synonyms: ['arrogant', 'proud', 'conceited', 'snobbish', 'condescending'],
    lemmas: ['haughty', 'haughtily', 'haughtiness'],
  },
  {
    word: 'hedonistic',
    definition: 'engaged in the pursuit of pleasure; sensually self-indulgent',
    synonyms: ['pleasure-seeking', 'self-indulgent', 'sybaritic', 'epicurean', 'decadent'],
    lemmas: ['hedonistic', 'hedonism', 'hedonist'],
  },
  {
    word: 'hyperbole',
    definition: 'exaggerated statements or claims not meant to be taken literally',
    synonyms: ['exaggeration', 'overstatement', 'embellishment', 'amplification', 'magnification'],
    lemmas: ['hyperbole', 'hyperbolic', 'hyperbolically'],
  },
  {
    word: 'histrionic',
    definition: 'overly theatrical or melodramatic in character or style',
    synonyms: ['theatrical', 'melodramatic', 'dramatic', 'affected', 'artificial'],
    lemmas: ['histrionic', 'histrionics', 'histrionically'],
  },
  {
    word: 'homogeneous',
    definition: 'of the same kind; alike',
    synonyms: ['uniform', 'consistent', 'identical', 'similar', 'alike'],
    lemmas: ['homogeneous', 'homogeneously', 'homogeneity'],
  },
  {
    word: 'hubris',
    definition: 'excessive pride or self-confidence',
    synonyms: ['arrogance', 'pride', 'conceit', 'vanity', 'egotism'],
    lemmas: ['hubris', 'hubristic'],
  },
  {
    word: 'hypocritical',
    definition: 'behaving in a way that suggests one has higher standards than is the case',
    synonyms: ['insincere', 'false', 'duplicitous', 'two-faced', 'sanctimonious'],
    lemmas: ['hypocritical', 'hypocrisy', 'hypocrite'],
  },

  // I words (12 words - ~6% of total)
  {
    word: 'iconoclast',
    definition: 'a person who attacks cherished beliefs or institutions',
    synonyms: ['rebel', 'nonconformist', 'dissenter', 'radical', 'revolutionary'],
    lemmas: ['iconoclast', 'iconoclastic', 'iconoclasm'],
  },
  {
    word: 'immutable',
    definition: 'unchanging over time or unable to be changed',
    synonyms: ['unchangeable', 'fixed', 'permanent', 'constant', 'invariable'],
    lemmas: ['immutable', 'immutability', 'immutably'],
  },
  {
    word: 'impartial',
    definition: 'treating all rivals or disputants equally; fair and just',
    synonyms: ['unbiased', 'neutral', 'objective', 'fair', 'even-handed'],
    lemmas: ['impartial', 'impartiality', 'impartially'],
  },
  {
    word: 'impetuous',
    definition: 'acting or done quickly and without thought or care',
    synonyms: ['impulsive', 'rash', 'hasty', 'reckless', 'spontaneous'],
    lemmas: ['impetuous', 'impetuosity', 'impetuously'],
  },
  {
    word: 'inadvertent',
    definition: 'done without conscious intention, especially by mistake',
    synonyms: ['unintentional', 'accidental', 'unplanned', 'unconscious', 'involuntary'],
    lemmas: ['inadvertent', 'inadvertently', 'inadvertence'],
  },
  {
    word: 'incisive',
    definition: 'accurately analytical; clear-cut and distinct',
    synonyms: ['sharp', 'keen', 'penetrating', 'acute', 'perceptive'],
    lemmas: ['incisive', 'incisively', 'incisiveness'],
  },
  {
    word: 'indolent',
    definition: 'wanting to avoid activity or exertion; lazy',
    synonyms: ['lazy', 'idle', 'sluggish', 'lethargic', 'slothful'],
    lemmas: ['indolent', 'indolence', 'indolently'],
  },
  {
    word: 'ineffable',
    definition: 'too great or extreme to be expressed or described in words',
    synonyms: ['indescribable', 'inexpressible', 'unspeakable', 'unutterable', 'beyond words'],
    lemmas: ['ineffable', 'ineffably', 'ineffability'],
  },
  {
    word: 'ingenuous',
    definition: 'innocent and unsuspecting; showing innocent or childlike simplicity',
    synonyms: ['naive', 'innocent', 'trusting', 'guileless', 'candid'],
    lemmas: ['ingenuous', 'ingenuously', 'ingenuousness'],
  },
  {
    word: 'innovative',
    definition: 'featuring new methods; advanced and original',
    synonyms: ['creative', 'original', 'inventive', 'pioneering', 'groundbreaking'],
    lemmas: ['innovative', 'innovation', 'innovatively', 'innovate'],
  },
  {
    word: 'insidious',
    definition: 'proceeding in a gradual, subtle way, but with harmful effects',
    synonyms: ['subtle', 'cunning', 'crafty', 'treacherous', 'sly'],
    lemmas: ['insidious', 'insidiously', 'insidiousness'],
  },
  {
    word: 'intrepid',
    definition: 'fearless; adventurous (often used for rhetorical or humorous effect)',
    synonyms: ['fearless', 'brave', 'courageous', 'bold', 'daring'],
    lemmas: ['intrepid', 'intrepidity', 'intrepidly'],
  },

  // J words (6 words - ~3% of total)
  {
    word: 'jaded',
    definition: 'tired, bored, or lacking enthusiasm, typically after having too much of something',
    synonyms: ['weary', 'tired', 'worn out', 'wearied', 'dulled'],
    lemmas: ['jaded', 'jadedly', 'jadedness'],
  },
  {
    word: 'jocular',
    definition: 'fond of or characterized by joking; humorous or playful',
    synonyms: ['humorous', 'witty', 'amusing', 'playful', 'jovial'],
    lemmas: ['jocular', 'jocularity', 'jocularly'],
  },
  {
    word: 'judicious',
    definition: 'having, showing, or done with good judgment or sense',
    synonyms: ['wise', 'sensible', 'prudent', 'shrewd', 'astute'],
    lemmas: ['judicious', 'judiciously', 'judiciousness'],
  },
  {
    word: 'juxtapose',
    definition: 'place or deal with close together for contrasting effect',
    synonyms: ['contrast', 'compare', 'set side by side', 'oppose', 'differentiate'],
    lemmas: ['juxtapose', 'juxtaposition', 'juxtaposing'],
  },
  {
    word: 'jingoistic',
    definition:
      'characterized by extreme patriotism, especially in the form of aggressive foreign policy',
    synonyms: ['nationalistic', 'chauvinistic', 'patriotic', 'hawkish', 'bellicose'],
    lemmas: ['jingoistic', 'jingoism', 'jingoist'],
  },
  {
    word: 'jejune',
    definition: 'naive, simplistic, and superficial',
    synonyms: ['naive', 'simplistic', 'childish', 'immature', 'shallow'],
    lemmas: ['jejune', 'jejunely', 'jejuneness'],
  },

  // K words (4 words - ~2% of total)
  {
    word: 'kinetic',
    definition: 'relating to or resulting from motion',
    synonyms: ['dynamic', 'active', 'energetic', 'moving', 'mobile'],
    lemmas: ['kinetic', 'kinetics', 'kinetically'],
  },
  {
    word: 'kudos',
    definition: 'praise and honor received for an achievement',
    synonyms: ['praise', 'acclaim', 'accolades', 'plaudits', 'commendation'],
    lemmas: ['kudos'],
  },
  {
    word: 'kaleidoscopic',
    definition: 'having complex patterns of colors; constantly changing',
    synonyms: ['colorful', 'varied', 'changing', 'shifting', 'multifaceted'],
    lemmas: ['kaleidoscopic', 'kaleidoscope', 'kaleidoscopically'],
  },
  {
    word: 'knavish',
    definition: 'dishonest, especially in small matters; petty',
    synonyms: ['dishonest', 'deceitful', 'unscrupulous', 'roguish', 'crafty'],
    lemmas: ['knavish', 'knave', 'knavery'],
  },

  // L words (10 words - ~5% of total)
  {
    word: 'laconic',
    definition: 'using few words; expressing much in few words',
    synonyms: ['concise', 'terse', 'succinct', 'brief', 'pithy'],
    lemmas: ['laconic', 'laconically', 'laconicism'],
  },
  {
    word: 'languid',
    definition: 'displaying or having a disinclination for physical exertion or effort',
    synonyms: ['lethargic', 'listless', 'sluggish', 'torpid', 'lackadaisical'],
    lemmas: ['languid', 'languidly', 'languidness'],
  },
  {
    word: 'lethargic',
    definition: 'affected by lethargy; sluggish and apathetic',
    synonyms: ['sluggish', 'tired', 'weary', 'listless', 'languid'],
    lemmas: ['lethargic', 'lethargy', 'lethargically'],
  },
  {
    word: 'lucid',
    definition: 'expressed clearly; easy to understand',
    synonyms: ['clear', 'coherent', 'intelligible', 'comprehensible', 'transparent'],
    lemmas: ['lucid', 'lucidity', 'lucidly'],
  },
  {
    word: 'lugubrious',
    definition: 'looking or sounding sad and dismal',
    synonyms: ['mournful', 'gloomy', 'sad', 'sorrowful', 'melancholy'],
    lemmas: ['lugubrious', 'lugubriously', 'lugubriousness'],
  },
  {
    word: 'loquacious',
    definition: 'tending to talk a great deal; talkative',
    synonyms: ['talkative', 'chatty', 'garrulous', 'voluble', 'verbose'],
    lemmas: ['loquacious', 'loquacity', 'loquaciously'],
  },
  {
    word: 'luminous',
    definition: 'giving off light; bright or shining, especially in the dark',
    synonyms: ['bright', 'shining', 'glowing', 'radiant', 'brilliant'],
    lemmas: ['luminous', 'luminously', 'luminosity'],
  },
  {
    word: 'labyrinthine',
    definition: 'like a labyrinth; complicated and confusing',
    synonyms: ['complex', 'intricate', 'convoluted', 'complicated', 'maze-like'],
    lemmas: ['labyrinthine', 'labyrinth'],
  },
  {
    word: 'litigious',
    definition: 'unreasonably prone to go to law to settle disputes',
    synonyms: ['argumentative', 'contentious', 'quarrelsome', 'disputatious', 'combative'],
    lemmas: ['litigious', 'litigation', 'litigate'],
  },
  {
    word: 'lurid',
    definition:
      'unpleasantly bright in color, especially so as to create a harsh or unnatural effect',
    synonyms: ['vivid', 'glaring', 'shocking', 'sensational', 'gruesome'],
    lemmas: ['lurid', 'luridly', 'luridness'],
  },

  // M words (12 words - ~6% of total)
  {
    word: 'magnanimous',
    definition: 'very generous or forgiving, especially toward a rival or less powerful person',
    synonyms: ['generous', 'charitable', 'benevolent', 'noble', 'big-hearted'],
    lemmas: ['magnanimous', 'magnanimity', 'magnanimously'],
  },
  {
    word: 'malevolent',
    definition: 'having or showing a wish to do evil to others',
    synonyms: ['malicious', 'spiteful', 'vindictive', 'evil', 'hostile'],
    lemmas: ['malevolent', 'malevolence', 'malevolently'],
  },
  {
    word: 'meticulous',
    definition: 'showing great attention to detail; very careful and precise',
    synonyms: ['careful', 'thorough', 'scrupulous', 'precise', 'exact'],
    lemmas: ['meticulous', 'meticulously', 'meticulousness'],
  },
  {
    word: 'mundane',
    definition: 'lacking interest or excitement; dull',
    synonyms: ['ordinary', 'routine', 'everyday', 'commonplace', 'boring'],
    lemmas: ['mundane', 'mundanely', 'mundaneness'],
  },
  {
    word: 'mellifluous',
    definition: 'sweet or musical; pleasant to hear',
    synonyms: ['melodious', 'musical', 'harmonious', 'sweet-sounding', 'euphonious'],
    lemmas: ['mellifluous', 'mellifluously', 'mellifluousness'],
  },
  {
    word: 'mercurial',
    definition: 'subject to sudden or unpredictable changes of mood or mind',
    synonyms: ['volatile', 'changeable', 'unpredictable', 'fickle', 'erratic'],
    lemmas: ['mercurial', 'mercurially'],
  },
  {
    word: 'misanthropic',
    definition: 'disliking humankind and avoiding human society',
    synonyms: ['antisocial', 'unsociable', 'cynical', 'pessimistic', 'reclusive'],
    lemmas: ['misanthropic', 'misanthropy', 'misanthrope'],
  },
  {
    word: 'morose',
    definition: 'bad-tempered and sulky; gloomy',
    synonyms: ['sullen', 'gloomy', 'dejected', 'despondent', 'melancholy'],
    lemmas: ['morose', 'morosely', 'moroseness'],
  },
  {
    word: 'multifarious',
    definition: 'many and of various types; having great diversity or variety',
    synonyms: ['diverse', 'varied', 'multiple', 'numerous', 'manifold'],
    lemmas: ['multifarious', 'multifariously', 'multifariousness'],
  },
  {
    word: 'myriad',
    definition: 'a countless or extremely great number',
    synonyms: ['countless', 'innumerable', 'numerous', 'multitude', 'host'],
    lemmas: ['myriad', 'myriads'],
  },
  {
    word: 'magnate',
    definition: 'a wealthy and influential person, especially in business',
    synonyms: ['tycoon', 'mogul', 'baron', 'industrialist', 'entrepreneur'],
    lemmas: ['magnate', 'magnates'],
  },
  {
    word: 'maverick',
    definition: 'an unorthodox or independent-minded person',
    synonyms: ['nonconformist', 'rebel', 'individualist', 'dissenter', 'free spirit'],
    lemmas: ['maverick', 'mavericks'],
  },

  // N words (8 words - ~4% of total)
  {
    word: 'nefarious',
    definition: 'extremely wicked or villainous',
    synonyms: ['wicked', 'evil', 'sinister', 'villainous', 'heinous'],
    lemmas: ['nefarious', 'nefariously', 'nefariousness'],
  },
  {
    word: 'nonchalant',
    definition: 'feeling or appearing casually calm and relaxed; not displaying anxiety',
    synonyms: ['casual', 'relaxed', 'unperturbed', 'blasé', 'indifferent'],
    lemmas: ['nonchalant', 'nonchalance', 'nonchalantly'],
  },
  {
    word: 'nostalgic',
    definition: 'feeling or inspiring a sentimental longing for the past',
    synonyms: ['wistful', 'sentimental', 'reminiscent', 'yearning', 'homesick'],
    lemmas: ['nostalgic', 'nostalgia', 'nostalgically'],
  },
  {
    word: 'notorious',
    definition: 'famous or well known, typically for some bad quality or deed',
    synonyms: ['infamous', 'disreputable', 'scandalous', 'ill-famed', 'dishonored'],
    lemmas: ['notorious', 'notoriously', 'notoriety'],
  },
  {
    word: 'nebulous',
    definition: 'in the form of a cloud or haze; hazy, vague, indistinct, or confused',
    synonyms: ['vague', 'unclear', 'hazy', 'ambiguous', 'indistinct'],
    lemmas: ['nebulous', 'nebulously', 'nebulousness'],
  },
  {
    word: 'nascent',
    definition: 'just coming into existence and beginning to display signs of future potential',
    synonyms: ['emerging', 'developing', 'budding', 'incipient', 'fledgling'],
    lemmas: ['nascent', 'nascence'],
  },
  {
    word: 'nuanced',
    definition: 'characterized by subtle shades of meaning or expression',
    synonyms: ['subtle', 'refined', 'sophisticated', 'complex', 'intricate'],
    lemmas: ['nuanced', 'nuance', 'nuances'],
  },
  {
    word: 'noxious',
    definition: 'harmful, poisonous, or very unpleasant',
    synonyms: ['harmful', 'toxic', 'poisonous', 'dangerous', 'detrimental'],
    lemmas: ['noxious', 'noxiously', 'noxiousness'],
  },

  // O words (6 words - ~3% of total)
  {
    word: 'obsequious',
    definition: 'obedient or attentive to an excessive or servile degree',
    synonyms: ['servile', 'subservient', 'fawning', 'sycophantic', 'groveling'],
    lemmas: ['obsequious', 'obsequiously', 'obsequiousness'],
  },
  {
    word: 'obstinate',
    definition: "stubbornly refusing to change one's opinion or chosen course of action",
    synonyms: ['stubborn', 'headstrong', 'willful', 'intransigent', 'inflexible'],
    lemmas: ['obstinate', 'obstinacy', 'obstinately'],
  },
  {
    word: 'ostentatious',
    definition: 'characterized by vulgar or pretentious display',
    synonyms: ['showy', 'flashy', 'gaudy', 'pretentious', 'flamboyant'],
    lemmas: ['ostentatious', 'ostentation', 'ostentatiously'],
  },
  {
    word: 'omnipotent',
    definition: 'having unlimited power; able to do anything',
    synonyms: ['all-powerful', 'almighty', 'supreme', 'unlimited', 'infinite'],
    lemmas: ['omnipotent', 'omnipotence', 'omnipotently'],
  },
  {
    word: 'ominous',
    definition: 'giving the impression that something bad or unpleasant is going to happen',
    synonyms: ['threatening', 'menacing', 'sinister', 'foreboding', 'portentous'],
    lemmas: ['ominous', 'ominously', 'ominousness'],
  },
  {
    word: 'opulent',
    definition: 'ostentatiously rich and luxurious or lavish',
    synonyms: ['luxurious', 'sumptuous', 'lavish', 'rich', 'extravagant'],
    lemmas: ['opulent', 'opulence', 'opulently'],
  },

  // P words (15 words - ~7.5% of total)
  {
    word: 'parsimonious',
    definition: 'extremely frugal; unwilling to spend',
    synonyms: ['stingy', 'miserly', 'cheap', 'tight-fisted', 'penny-pinching'],
    lemmas: ['parsimonious', 'parsimony', 'parsimoniously'],
  },
  {
    word: 'pedantic',
    definition: 'being excessively concerned with minor details or rules',
    synonyms: ['nitpicking', 'fussy', 'finicky', 'perfectionist', 'meticulous'],
    lemmas: ['pedantic', 'pedantry', 'pedantically'],
  },
  {
    word: 'pensive',
    definition: 'engaged in, involving, or reflecting deep or serious thought',
    synonyms: ['thoughtful', 'reflective', 'contemplative', 'meditative', 'introspective'],
    lemmas: ['pensive', 'pensively', 'pensiveness'],
  },
  {
    word: 'perspicacious',
    definition: 'having a ready insight into and understanding of things',
    synonyms: ['perceptive', 'astute', 'shrewd', 'discerning', 'insightful'],
    lemmas: ['perspicacious', 'perspicacity', 'perspicaciously'],
  },
  {
    word: 'petulant',
    definition: 'childishly sulky or bad-tempered',
    synonyms: ['irritable', 'peevish', 'fretful', 'petty', 'cranky'],
    lemmas: ['petulant', 'petulance', 'petulantly'],
  },
  {
    word: 'philanthropic',
    definition: 'seeking to promote the welfare of others, especially by donating money',
    synonyms: ['charitable', 'benevolent', 'generous', 'altruistic', 'humanitarian'],
    lemmas: ['philanthropic', 'philanthropy', 'philanthropist'],
  },
  {
    word: 'placid',
    definition: 'not easily upset or excited; calm and peaceful',
    synonyms: ['calm', 'peaceful', 'tranquil', 'serene', 'unruffled'],
    lemmas: ['placid', 'placidity', 'placidly'],
  },
  {
    word: 'pragmatic',
    definition: 'dealing with things sensibly and realistically',
    synonyms: ['practical', 'realistic', 'sensible', 'down-to-earth', 'matter-of-fact'],
    lemmas: ['pragmatic', 'pragmatism', 'pragmatically'],
  },
  {
    word: 'pretentious',
    definition: 'attempting to impress by affecting greater importance than actually possessed',
    synonyms: ['pompous', 'self-important', 'grandiose', 'affected', 'ostentatious'],
    lemmas: ['pretentious', 'pretension', 'pretentiously'],
  },
  {
    word: 'prolific',
    definition: 'present in large numbers or quantities; plentiful',
    synonyms: ['productive', 'fertile', 'fruitful', 'abundant', 'copious'],
    lemmas: ['prolific', 'prolifically', 'proliferate'],
  },
  {
    word: 'prudent',
    definition: 'acting with or showing care and thought for the future',
    synonyms: ['wise', 'sensible', 'judicious', 'shrewd', 'careful'],
    lemmas: ['prudent', 'prudence', 'prudently'],
  },
  {
    word: 'palpable',
    definition: 'able to be touched or felt; so intense as to seem almost tangible',
    synonyms: ['tangible', 'touchable', 'obvious', 'evident', 'clear'],
    lemmas: ['palpable', 'palpably', 'palpability'],
  },
  {
    word: 'pernicious',
    definition: 'having a harmful effect, especially in a gradual or subtle way',
    synonyms: ['harmful', 'damaging', 'destructive', 'injurious', 'detrimental'],
    lemmas: ['pernicious', 'perniciously', 'perniciousness'],
  },
  {
    word: 'plausible',
    definition: 'seeming reasonable or probable',
    synonyms: ['believable', 'credible', 'reasonable', 'likely', 'feasible'],
    lemmas: ['plausible', 'plausibly', 'plausibility'],
  },
  {
    word: 'poignant',
    definition: 'evoking a keen sense of sadness or regret',
    synonyms: ['touching', 'moving', 'sad', 'emotional', 'heart-rending'],
    lemmas: ['poignant', 'poignantly', 'poignancy'],
  },

  // Q words (4 words - ~2% of total)
  {
    word: 'quaint',
    definition: 'attractively unusual or old-fashioned',
    synonyms: ['charming', 'picturesque', 'old-fashioned', 'antiquated', 'curious'],
    lemmas: ['quaint', 'quaintly', 'quaintness'],
  },
  {
    word: 'querulous',
    definition: 'complaining in a petulant or whining manner',
    synonyms: ['complaining', 'whining', 'grumbling', 'fretful', 'peevish'],
    lemmas: ['querulous', 'querulously', 'querulousness'],
  },
  {
    word: 'quintessential',
    definition: 'representing the most perfect example of a quality or class',
    synonyms: ['typical', 'archetypal', 'classic', 'model', 'ideal'],
    lemmas: ['quintessential', 'quintessentially', 'quintessence'],
  },
  {
    word: 'quixotic',
    definition: 'extremely idealistic; unrealistic and impractical',
    synonyms: ['idealistic', 'unrealistic', 'impractical', 'romantic', 'utopian'],
    lemmas: ['quixotic', 'quixotically'],
  },

  // R words (12 words - ~6% of total)
  {
    word: 'rancorous',
    definition: 'characterized by bitterness or resentment',
    synonyms: ['bitter', 'resentful', 'spiteful', 'vindictive', 'hostile'],
    lemmas: ['rancorous', 'rancor', 'rancorously'],
  },
  {
    word: 'recalcitrant',
    definition: 'having an obstinately uncooperative attitude toward authority',
    synonyms: ['defiant', 'disobedient', 'unruly', 'rebellious', 'stubborn'],
    lemmas: ['recalcitrant', 'recalcitrance', 'recalcitrantly'],
  },
  {
    word: 'resilient',
    definition: 'able to withstand or recover quickly from difficult conditions',
    synonyms: ['tough', 'strong', 'hardy', 'robust', 'durable'],
    lemmas: ['resilient', 'resilience', 'resiliently'],
  },
  {
    word: 'reticent',
    definition: "not revealing one's thoughts or feelings readily",
    synonyms: ['reserved', 'quiet', 'secretive', 'uncommunicative', 'taciturn'],
    lemmas: ['reticent', 'reticence', 'reticently'],
  },
  {
    word: 'reverent',
    definition: 'feeling or showing deep and solemn respect',
    synonyms: ['respectful', 'deferential', 'worshipful', 'devout', 'pious'],
    lemmas: ['reverent', 'reverence', 'reverently'],
  },
  {
    word: 'robust',
    definition: 'strong and healthy; vigorous',
    synonyms: ['strong', 'sturdy', 'tough', 'resilient', 'vigorous'],
    lemmas: ['robust', 'robustly', 'robustness'],
  },
  {
    word: 'raucous',
    definition: 'making or constituting a disturbingly harsh and loud noise',
    synonyms: ['loud', 'noisy', 'harsh', 'riotous', 'boisterous'],
    lemmas: ['raucous', 'raucously', 'raucousness'],
  },
  {
    word: 'reprehensible',
    definition: 'deserving censure or condemnation',
    synonyms: ['blameworthy', 'deplorable', 'disgraceful', 'shameful', 'inexcusable'],
    lemmas: ['reprehensible', 'reprehensibly', 'reprehensibility'],
  },
  {
    word: 'rudimentary',
    definition: 'involving or limited to basic principles',
    synonyms: ['basic', 'elementary', 'fundamental', 'primitive', 'simple'],
    lemmas: ['rudimentary', 'rudimentarily', 'rudiment'],
  },
  {
    word: 'rustic',
    definition: 'relating to the countryside; rural',
    synonyms: ['rural', 'country', 'pastoral', 'bucolic', 'provincial'],
    lemmas: ['rustic', 'rustically', 'rusticity'],
  },
  {
    word: 'rapacious',
    definition: 'aggressively greedy or grasping',
    synonyms: ['greedy', 'grasping', 'avaricious', 'voracious', 'predatory'],
    lemmas: ['rapacious', 'rapaciously', 'rapacity'],
  },
  {
    word: 'recondite',
    definition: 'little known; abstruse',
    synonyms: ['obscure', 'abstruse', 'arcane', 'esoteric', 'mysterious'],
    lemmas: ['recondite', 'reconditely', 'reconditeness'],
  },

  // S words (15 words - ~7.5% of total)
  {
    word: 'sagacious',
    definition: 'having or showing keen mental discernment and good judgment',
    synonyms: ['wise', 'shrewd', 'astute', 'perceptive', 'discerning'],
    lemmas: ['sagacious', 'sagacity', 'sagaciously'],
  },
  {
    word: 'sanguine',
    definition: 'optimistic or positive, especially in an apparently bad situation',
    synonyms: ['optimistic', 'positive', 'confident', 'hopeful', 'cheerful'],
    lemmas: ['sanguine', 'sanguinely', 'sanguineness'],
  },
  {
    word: 'sardonic',
    definition: 'grimly mocking or cynical',
    synonyms: ['mocking', 'cynical', 'scornful', 'derisive', 'contemptuous'],
    lemmas: ['sardonic', 'sardonically', 'sardonicism'],
  },
  {
    word: 'scrupulous',
    definition: 'diligent, thorough, and extremely attentive to details',
    synonyms: ['meticulous', 'careful', 'thorough', 'conscientious', 'precise'],
    lemmas: ['scrupulous', 'scrupulously', 'scrupulousness'],
  },
  {
    word: 'sedulous',
    definition: 'showing dedication and diligence',
    synonyms: ['diligent', 'assiduous', 'industrious', 'persistent', 'devoted'],
    lemmas: ['sedulous', 'sedulously', 'sedulousness'],
  },
  {
    word: 'somnolent',
    definition: 'sleepy; drowsy',
    synonyms: ['sleepy', 'drowsy', 'tired', 'lethargic', 'sluggish'],
    lemmas: ['somnolent', 'somnolence', 'somnolently'],
  },
  {
    word: 'spurious',
    definition: 'not being what it purports to be; false or fake',
    synonyms: ['false', 'fake', 'bogus', 'counterfeit', 'fraudulent'],
    lemmas: ['spurious', 'spuriously', 'spuriousness'],
  },
  {
    word: 'stoic',
    definition: 'enduring pain and hardship without showing feelings or complaining',
    synonyms: ['impassive', 'unemotional', 'resigned', 'patient', 'long-suffering'],
    lemmas: ['stoic', 'stoicism', 'stoically'],
  },
  {
    word: 'superfluous',
    definition: 'unnecessary, especially through being more than enough',
    synonyms: ['unnecessary', 'redundant', 'surplus', 'excessive', 'extra'],
    lemmas: ['superfluous', 'superfluously', 'superfluity'],
  },
  {
    word: 'sycophant',
    definition: 'a person who acts obsequiously to gain advantage',
    synonyms: ['flatterer', 'toady', 'yes-man', 'bootlicker', 'fawner'],
    lemmas: ['sycophant', 'sycophantic', 'sycophancy'],
  },
  {
    word: 'serendipitous',
    definition: 'occurring or discovered by chance in a happy or beneficial way',
    synonyms: ['fortunate', 'lucky', 'chance', 'accidental', 'unexpected'],
    lemmas: ['serendipitous', 'serendipity', 'serendipitously'],
  },
  {
    word: 'surreptitious',
    definition: 'kept secret, especially because it would not be approved of',
    synonyms: ['secret', 'stealthy', 'clandestine', 'covert', 'furtive'],
    lemmas: ['surreptitious', 'surreptitiously', 'surreptitiousness'],
  },
  {
    word: 'sublime',
    definition: 'of such excellence, grandeur, or beauty as to inspire great admiration',
    synonyms: ['magnificent', 'glorious', 'superb', 'wonderful', 'marvelous'],
    lemmas: ['sublime', 'sublimely', 'sublimity'],
  },
  {
    word: 'succinct',
    definition: 'briefly and clearly expressed',
    synonyms: ['concise', 'brief', 'compact', 'condensed', 'pithy'],
    lemmas: ['succinct', 'succinctly', 'succinctness'],
  },
  {
    word: 'supercilious',
    definition: 'behaving or looking as though one thinks oneself superior to others',
    synonyms: ['arrogant', 'haughty', 'condescending', 'patronizing', 'disdainful'],
    lemmas: ['supercilious', 'superciliously', 'superciliousness'],
  },

  // T words (12 words - ~6% of total)
  {
    word: 'taciturn',
    definition: 'reserved or uncommunicative in speech; saying little',
    synonyms: ['quiet', 'silent', 'reserved', 'reticent', 'uncommunicative'],
    lemmas: ['taciturn', 'taciturnity', 'taciturnly'],
  },
  {
    word: 'tempestuous',
    definition: 'very stormy; characterized by strong and turbulent emotion',
    synonyms: ['stormy', 'turbulent', 'violent', 'wild', 'passionate'],
    lemmas: ['tempestuous', 'tempestuously', 'tempestuousness'],
  },
  {
    word: 'tenacious',
    definition: 'tending to keep a firm hold of something; clinging or adhering closely',
    synonyms: ['persistent', 'determined', 'resolute', 'steadfast', 'unwavering'],
    lemmas: ['tenacious', 'tenacity', 'tenaciously'],
  },
  {
    word: 'truculent',
    definition: 'eager or quick to argue or fight; aggressively defiant',
    synonyms: ['aggressive', 'belligerent', 'combative', 'hostile', 'pugnacious'],
    lemmas: ['truculent', 'truculence', 'truculently'],
  },
  {
    word: 'trepidation',
    definition: 'a feeling of fear or agitation about something that may happen',
    synonyms: ['apprehension', 'anxiety', 'worry', 'nervousness', 'unease'],
    lemmas: ['trepidation'],
  },
  {
    word: 'trite',
    definition: 'overused and therefore lacking originality or freshness',
    synonyms: ['hackneyed', 'clichéd', 'banal', 'stale', 'overused'],
    lemmas: ['trite', 'tritely', 'triteness'],
  },
  {
    word: 'turbulent',
    definition: 'very disturbed or conflicted',
    synonyms: ['chaotic', 'tumultuous', 'stormy', 'unsettled', 'volatile'],
    lemmas: ['turbulent', 'turbulence', 'turbulently'],
  },
  {
    word: 'tyrannical',
    definition: 'exercising power in a cruel or arbitrary way',
    synonyms: ['oppressive', 'despotic', 'authoritarian', 'dictatorial', 'harsh'],
    lemmas: ['tyrannical', 'tyranny', 'tyrant'],
  },
  {
    word: 'tangible',
    definition: 'perceptible by touch; clear and definite; real',
    synonyms: ['touchable', 'palpable', 'concrete', 'real', 'substantial'],
    lemmas: ['tangible', 'tangibly', 'tangibility'],
  },
  {
    word: 'tedious',
    definition: 'too long, slow, or dull; tiresome or monotonous',
    synonyms: ['boring', 'monotonous', 'dull', 'tiresome', 'wearisome'],
    lemmas: ['tedious', 'tediously', 'tediousness'],
  },
  {
    word: 'transient',
    definition: 'lasting only for a short time; impermanent',
    synonyms: ['temporary', 'brief', 'short-lived', 'fleeting', 'ephemeral'],
    lemmas: ['transient', 'transiently', 'transience'],
  },
  {
    word: 'tremulous',
    definition: 'shaking or quivering slightly',
    synonyms: ['shaking', 'trembling', 'quivering', 'unsteady', 'nervous'],
    lemmas: ['tremulous', 'tremulously', 'tremulousness'],
  },

  // U words (6 words - ~3% of total)
  {
    word: 'ubiquitous',
    definition: 'present, appearing, or found everywhere',
    synonyms: ['omnipresent', 'pervasive', 'universal', 'widespread', 'prevalent'],
    lemmas: ['ubiquitous', 'ubiquity', 'ubiquitously'],
  },
  {
    word: 'unctuous',
    definition: 'excessively or ingratiatingly flattering; oily',
    synonyms: ['smarmy', 'obsequious', 'sycophantic', 'fawning', 'oily'],
    lemmas: ['unctuous', 'unctuously', 'unctuousness'],
  },
  {
    word: 'urbane',
    definition: 'suave, courteous, and refined in manner',
    synonyms: ['sophisticated', 'suave', 'debonair', 'refined', 'cultured'],
    lemmas: ['urbane', 'urbanely', 'urbanity'],
  },
  {
    word: 'utilitarian',
    definition: 'designed to be useful or practical rather than attractive',
    synonyms: ['practical', 'functional', 'pragmatic', 'useful', 'efficient'],
    lemmas: ['utilitarian', 'utilitarianism', 'utility'],
  },
  {
    word: 'unscrupulous',
    definition: 'having or showing no moral principles; not honest or fair',
    synonyms: ['dishonest', 'unethical', 'immoral', 'corrupt', 'unprincipled'],
    lemmas: ['unscrupulous', 'unscrupulously', 'unscrupulousness'],
  },
  {
    word: 'unprecedented',
    definition: 'never done or known before',
    synonyms: ['unparalleled', 'unequaled', 'extraordinary', 'remarkable', 'novel'],
    lemmas: ['unprecedented', 'unprecedentedly'],
  },

  // V words (8 words - ~4% of total)
  {
    word: 'vacillate',
    definition: 'waver between different opinions or actions; be indecisive',
    synonyms: ['waver', 'hesitate', 'fluctuate', 'oscillate', 'dither'],
    lemmas: ['vacillate', 'vacillation', 'vacillating'],
  },
  {
    word: 'venerable',
    definition: 'accorded a great deal of respect, especially because of age, wisdom, or character',
    synonyms: ['respected', 'revered', 'esteemed', 'honored', 'distinguished'],
    lemmas: ['venerable', 'veneration', 'venerably'],
  },
  {
    word: 'verbose',
    definition: 'using or expressed in more words than are needed',
    synonyms: ['wordy', 'long-winded', 'lengthy', 'prolix', 'rambling'],
    lemmas: ['verbose', 'verbosity', 'verbosely'],
  },
  {
    word: 'vexatious',
    definition: 'causing or tending to cause annoyance, frustration, or worry',
    synonyms: ['annoying', 'irritating', 'troublesome', 'bothersome', 'irksome'],
    lemmas: ['vexatious', 'vex', 'vexation'],
  },
  {
    word: 'vivacious',
    definition: 'attractively lively and animated',
    synonyms: ['lively', 'animated', 'spirited', 'energetic', 'bubbly'],
    lemmas: ['vivacious', 'vivacity', 'vivaciously'],
  },
  {
    word: 'volatile',
    definition: 'liable to change rapidly and unpredictably, especially for the worse',
    synonyms: ['unstable', 'changeable', 'unpredictable', 'erratic', 'fickle'],
    lemmas: ['volatile', 'volatility', 'volatilely'],
  },
  {
    word: 'voracious',
    definition: 'wanting or devouring great quantities of food; having a very eager approach',
    synonyms: ['ravenous', 'insatiable', 'greedy', 'hungry', 'avid'],
    lemmas: ['voracious', 'voraciously', 'voracity'],
  },
  {
    word: 'vindictive',
    definition: 'having or showing a strong or unreasoning desire for revenge',
    synonyms: ['vengeful', 'spiteful', 'malicious', 'resentful', 'retaliatory'],
    lemmas: ['vindictive', 'vindictively', 'vindictiveness'],
  },

  // W words (6 words - ~3% of total)
  {
    word: 'wary',
    definition: 'feeling or showing caution about possible dangers or problems',
    synonyms: ['cautious', 'careful', 'circumspect', 'vigilant', 'suspicious'],
    lemmas: ['wary', 'wariness', 'warily'],
  },
  {
    word: 'whimsical',
    definition: 'playfully quaint or fanciful, especially in an appealing way',
    synonyms: ['fanciful', 'playful', 'mischievous', 'capricious', 'quirky'],
    lemmas: ['whimsical', 'whimsy', 'whimsically'],
  },
  {
    word: 'wistful',
    definition: 'having or showing a feeling of vague or regretful longing',
    synonyms: ['yearning', 'longing', 'nostalgic', 'pensive', 'melancholy'],
    lemmas: ['wistful', 'wistfully', 'wistfulness'],
  },
  {
    word: 'winsome',
    definition: 'attractive or appealing in appearance or character',
    synonyms: ['charming', 'appealing', 'attractive', 'engaging', 'endearing'],
    lemmas: ['winsome', 'winsomely', 'winsomeness'],
  },
  {
    word: 'wanton',
    definition: 'deliberate and unprovoked; sexually immodest or promiscuous',
    synonyms: ['deliberate', 'malicious', 'unprovoked', 'gratuitous', 'reckless'],
    lemmas: ['wanton', 'wantonly', 'wantonness'],
  },
  {
    word: 'wizened',
    definition: 'shriveled or wrinkled with age',
    synonyms: ['wrinkled', 'shriveled', 'withered', 'aged', 'gnarled'],
    lemmas: ['wizened', 'wizen'],
  },

  // X words (2 words - ~1% of total)
  {
    word: 'xenophobic',
    definition: 'having or showing a dislike of or prejudice against people from other countries',
    synonyms: ['prejudiced', 'bigoted', 'intolerant', 'racist', 'nationalist'],
    lemmas: ['xenophobic', 'xenophobia', 'xenophobe'],
  },
  {
    word: 'xerophytic',
    definition:
      'adapted to a very dry climate or habitat, or to conditions where moisture is scarce',
    synonyms: [
      'drought-resistant',
      'arid-adapted',
      'desert-dwelling',
      'water-conserving',
      'dry-climate',
    ],
    lemmas: ['xerophytic', 'xerophyte'],
  },

  // Y words (3 words - ~1.5% of total)
  {
    word: 'yearning',
    definition: 'a feeling of intense longing for something',
    synonyms: ['longing', 'craving', 'desire', 'hankering', 'pining'],
    lemmas: ['yearning', 'yearn', 'yearningly'],
  },
  {
    word: 'yielding',
    definition: 'giving way under pressure; not hard or rigid',
    synonyms: ['flexible', 'pliable', 'soft', 'malleable', 'compliant'],
    lemmas: ['yielding', 'yield', 'yieldingly'],
  },
  {
    word: 'yoke',
    definition:
      'a wooden crosspiece that is fastened over the necks of two animals; something that connects or joins together',
    synonyms: ['harness', 'coupling', 'link', 'bond', 'connection'],
    lemmas: ['yoke', 'yoked', 'yoking'],
  },

  // Z words (3 words - ~1.5% of total)
  {
    word: 'zealous',
    definition: 'having or showing great energy or enthusiasm in pursuit of a cause or objective',
    synonyms: ['enthusiastic', 'passionate', 'fervent', 'ardent', 'devoted'],
    lemmas: ['zealous', 'zeal', 'zealously'],
  },
  {
    word: 'zenith',
    definition: 'the time at which something is most powerful or successful',
    synonyms: ['peak', 'pinnacle', 'apex', 'summit', 'climax'],
    lemmas: ['zenith'],
  },
  {
    word: 'zephyr',
    definition: 'a gentle mild breeze',
    synonyms: ['breeze', 'wind', 'draft', 'current', 'breath'],
    lemmas: ['zephyr', 'zephyrs'],
  },
];

// Function to get a random SAT word with better randomization
export function getRandomSATWord(): SATWord {
  // Use crypto.getRandomValues for better randomness if available
  let randomIndex;
  if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    randomIndex = (array[0] ?? 0) % SAT_WORDS.length;
  } else {
    // Fallback to Math.random with better distribution
    randomIndex = Math.floor(Math.random() * SAT_WORDS.length);
  }
  return SAT_WORDS[randomIndex]!;
}

// Function to get all search terms for a word (including synonyms and lemmas)
export function getAllSearchTerms(word: SATWord): string[] {
  return [word.word, ...word.synonyms, ...word.lemmas];
}
