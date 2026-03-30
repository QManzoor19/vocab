// ==================== DATA ====================

const DEFAULT_WORDS = [
    // Beginner
    { word: "Abandon", definition: "To leave behind or give up completely", example: "She had to _ her old habits to start fresh.", synonyms: ["forsake", "desert", "relinquish"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "french", status: "new", score: 0 },
    { word: "Benevolent", definition: "Well-meaning and kindly", example: "The _ old man donated to every charity in town.", synonyms: ["kind", "generous", "charitable"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Candid", definition: "Truthful and straightforward; frank", example: "She gave a _ assessment of the situation.", synonyms: ["honest", "frank", "open"], level: "beginner", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Diligent", definition: "Having or showing care and effort in one's work", example: "The _ student always completed her assignments early.", synonyms: ["hardworking", "industrious", "meticulous"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing", example: "The speaker gave an _ speech that moved the audience.", synonyms: ["articulate", "expressive", "persuasive"], level: "beginner", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Frugal", definition: "Sparing or economical with money or resources", example: "Living a _ lifestyle helped them save for retirement.", synonyms: ["thrifty", "economical", "prudent"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Gratitude", definition: "The quality of being thankful", example: "She expressed her _ with a heartfelt letter.", synonyms: ["thankfulness", "appreciation", "gratefulness"], level: "beginner", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Hinder", definition: "To create difficulties, resulting in delay", example: "Bad weather could _ our travel plans.", synonyms: ["obstruct", "impede", "hamper"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "old english", status: "new", score: 0 },
    { word: "Inevitable", definition: "Certain to happen; unavoidable", example: "Change is _ in any growing organization.", synonyms: ["unavoidable", "inescapable", "certain"], level: "beginner", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Justify", definition: "To show or prove to be right or reasonable", example: "How can you _ spending so much on a single meal?", synonyms: ["defend", "vindicate", "warrant"], level: "beginner", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Keen", definition: "Eager or enthusiastic; sharp", example: "She has a _ eye for detail in her artwork.", synonyms: ["eager", "enthusiastic", "sharp"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "old english", status: "new", score: 0 },
    { word: "Lament", definition: "To express sorrow or regret", example: "He would often _ the loss of his childhood home.", synonyms: ["mourn", "grieve", "bewail"], level: "beginner", partOfSpeech: "verb", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Mundane", definition: "Lacking interest or excitement; dull", example: "She longed to escape her _ daily routine.", synonyms: ["ordinary", "dull", "routine"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Neglect", definition: "To fail to care for properly", example: "Parents should never _ their children's education.", synonyms: ["disregard", "ignore", "overlook"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Obscure", definition: "Not clearly understood or easily seen", example: "The meaning of the poem was _ to most readers.", synonyms: ["unclear", "vague", "hidden"], level: "beginner", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Persevere", definition: "To continue in a course of action despite difficulty", example: "You must _ even when the path seems impossible.", synonyms: ["persist", "endure", "continue"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Quarrel", definition: "An angry argument or disagreement", example: "The siblings had a _ over who would sit in the front seat.", synonyms: ["argument", "dispute", "conflict"], level: "beginner", partOfSpeech: "noun", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Resilient", definition: "Able to recover quickly from difficult conditions", example: "Children are remarkably _ and adapt to change well.", synonyms: ["tough", "adaptable", "flexible"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Skeptical", definition: "Not easily convinced; having doubts", example: "She was _ about the product's bold claims.", synonyms: ["doubtful", "dubious", "questioning"], level: "beginner", partOfSpeech: "adjective", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Trivial", definition: "Of little value or importance", example: "Don't waste time on _ matters when big decisions await.", synonyms: ["insignificant", "minor", "petty"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Undermine", definition: "To weaken or damage gradually", example: "Constant criticism can _ a person's confidence.", synonyms: ["weaken", "sabotage", "erode"], level: "beginner", partOfSpeech: "verb", category: "society", origin: "old english", status: "new", score: 0 },
    { word: "Vivid", definition: "Producing strong, clear images in the mind", example: "She gave a _ description of her travels through Asia.", synonyms: ["bright", "intense", "graphic"], level: "beginner", partOfSpeech: "adjective", category: "arts", origin: "latin", status: "new", score: 0 },
    { word: "Wary", definition: "Feeling or showing caution about possible dangers", example: "Be _ of strangers who offer unsolicited advice.", synonyms: ["cautious", "careful", "vigilant"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "old english", status: "new", score: 0 },
    { word: "Yearn", definition: "To have an intense feeling of longing", example: "He would _ for the quiet countryside while stuck in the city.", synonyms: ["long", "crave", "desire"], level: "beginner", partOfSpeech: "verb", category: "emotions", origin: "old english", status: "new", score: 0 },
    { word: "Zealous", definition: "Having great energy or enthusiasm for a cause", example: "The _ volunteers worked through the night.", synonyms: ["passionate", "fervent", "enthusiastic"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "greek", status: "new", score: 0 },
    { word: "Ample", definition: "Enough or more than enough; plentiful", example: "There is _ evidence to support the theory.", synonyms: ["plentiful", "abundant", "sufficient"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Bias", definition: "An inclination or prejudice for or against something", example: "Every journalist must fight against _ in their reporting.", synonyms: ["prejudice", "partiality", "favoritism"], level: "beginner", partOfSpeech: "noun", category: "society", origin: "french", status: "new", score: 0 },
    { word: "Comply", definition: "To act in accordance with a wish or command", example: "All employees must _ with the new safety regulations.", synonyms: ["obey", "conform", "follow"], level: "beginner", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Denounce", definition: "To publicly declare to be wrong or evil", example: "Leaders around the world moved to _ the attack.", synonyms: ["condemn", "criticize", "censure"], level: "beginner", partOfSpeech: "verb", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Endorse", definition: "To declare one's public approval or support of", example: "Several celebrities agreed to _ the new product.", synonyms: ["support", "approve", "champion"], level: "beginner", partOfSpeech: "verb", category: "business", origin: "latin", status: "new", score: 0 },
    { word: "Feasible", definition: "Possible and practical to do easily", example: "We need to determine if the project is _ within our budget.", synonyms: ["possible", "practical", "viable"], level: "beginner", partOfSpeech: "adjective", category: "business", origin: "french", status: "new", score: 0 },
    { word: "Genuine", definition: "Truly what something is said to be; authentic", example: "She showed _ concern for the wellbeing of others.", synonyms: ["authentic", "real", "sincere"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Hostile", definition: "Unfriendly; showing opposition or aggression", example: "The crowd grew _ when the announcement was made.", synonyms: ["unfriendly", "antagonistic", "aggressive"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Impartial", definition: "Treating all rivals or sides equally; fair", example: "A judge must remain _ throughout the trial.", synonyms: ["unbiased", "neutral", "fair"], level: "beginner", partOfSpeech: "adjective", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Jovial", definition: "Cheerful and friendly in manner", example: "The _ host made everyone feel welcome at the party.", synonyms: ["cheerful", "jolly", "merry"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Kindle", definition: "To light or set on fire; to arouse or inspire", example: "The teacher's passion helped _ a love of reading in her students.", synonyms: ["ignite", "inspire", "arouse"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "old english", status: "new", score: 0 },
    { word: "Lavish", definition: "Sumptuously rich or elaborate; giving generously", example: "They threw a _ party to celebrate the anniversary.", synonyms: ["extravagant", "luxurious", "opulent"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "french", status: "new", score: 0 },
    { word: "Meager", definition: "Lacking in quantity or quality; inadequate", example: "The refugees survived on _ rations during the crisis.", synonyms: ["scanty", "sparse", "insufficient"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "french", status: "new", score: 0 },
    { word: "Novice", definition: "A person new to or inexperienced in a field", example: "As a _ in chess, she had much to learn.", synonyms: ["beginner", "newcomer", "amateur"], level: "beginner", partOfSpeech: "noun", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Ominous", definition: "Giving the impression that something bad will happen", example: "Dark clouds gathered in an _ sky.", synonyms: ["threatening", "menacing", "foreboding"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Plausible", definition: "Seeming reasonable or probable", example: "She offered a _ explanation for her absence.", synonyms: ["credible", "believable", "likely"], level: "beginner", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Reluctant", definition: "Unwilling and hesitant", example: "He was _ to admit his mistake in front of everyone.", synonyms: ["unwilling", "hesitant", "disinclined"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Subtle", definition: "So delicate or precise as to be difficult to detect", example: "There was a _ difference between the two shades of blue.", synonyms: ["slight", "faint", "delicate"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Tenacious", definition: "Holding firmly to something; persistent", example: "Her _ grip on her goals led to great success.", synonyms: ["persistent", "determined", "resolute"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Uphold", definition: "To confirm or support something that has been questioned", example: "The court decided to _ the original verdict.", synonyms: ["support", "maintain", "defend"], level: "beginner", partOfSpeech: "verb", category: "law", origin: "old english", status: "new", score: 0 },
    { word: "Versatile", definition: "Able to adapt to many different functions or activities", example: "She is a _ musician who plays five instruments.", synonyms: ["adaptable", "flexible", "multitalented"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Wholesome", definition: "Conducive to good health or moral wellbeing", example: "The children enjoyed a _ meal of fresh vegetables and grains.", synonyms: ["healthy", "beneficial", "nourishing"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "old english", status: "new", score: 0 },
    { word: "Abate", definition: "To become less intense or widespread", example: "The storm began to _ after several hours of heavy rain.", synonyms: ["subside", "diminish", "lessen"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "french", status: "new", score: 0 },
    { word: "Concise", definition: "Giving a lot of information clearly in few words", example: "Please keep your report _ and to the point.", synonyms: ["brief", "succinct", "terse"], level: "beginner", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Deplete", definition: "To use up the supply or resources of", example: "Overfishing could _ the ocean's fish populations.", synonyms: ["exhaust", "drain", "consume"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Elaborate", definition: "Involving many carefully arranged parts; detailed", example: "She devised an _ plan to surprise her friend.", synonyms: ["detailed", "intricate", "complex"], level: "beginner", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Fluctuate", definition: "To rise and fall irregularly in amount", example: "Gas prices _ throughout the year.", synonyms: ["vary", "oscillate", "shift"], level: "beginner", partOfSpeech: "verb", category: "science", origin: "latin", status: "new", score: 0 },
    { word: "Gullible", definition: "Easily persuaded to believe something", example: "The _ tourist fell for every street scam.", synonyms: ["naive", "credulous", "trusting"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "old english", status: "new", score: 0 },
    { word: "Humility", definition: "A modest view of one's own importance", example: "Despite his fame, he showed great _ in every interview.", synonyms: ["modesty", "humbleness", "meekness"], level: "beginner", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Inhibit", definition: "To hinder or restrain an action or process", example: "Fear can _ a person from reaching their full potential.", synonyms: ["hinder", "restrain", "prevent"], level: "beginner", partOfSpeech: "verb", category: "science", origin: "latin", status: "new", score: 0 },
    { word: "Jeopardize", definition: "To put something or someone in danger of loss or harm", example: "Careless spending could _ the company's future.", synonyms: ["endanger", "threaten", "risk"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "french", status: "new", score: 0 },
    { word: "Lucrative", definition: "Producing a great deal of profit", example: "Real estate can be a very _ investment.", synonyms: ["profitable", "rewarding", "gainful"], level: "beginner", partOfSpeech: "adjective", category: "business", origin: "latin", status: "new", score: 0 },
    { word: "Mitigate", definition: "To make less severe, serious, or painful", example: "Planting trees can help _ the effects of climate change.", synonyms: ["alleviate", "reduce", "lessen"], level: "beginner", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Notable", definition: "Worthy of attention or notice; remarkable", example: "Her most _ achievement was graduating at the top of her class.", synonyms: ["remarkable", "significant", "distinguished"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Obsolete", definition: "No longer produced or used; out of date", example: "New technology quickly makes older devices _.", synonyms: ["outdated", "antiquated", "archaic"], level: "beginner", partOfSpeech: "adjective", category: "technology", origin: "latin", status: "new", score: 0 },
    { word: "Pragmatic", definition: "Dealing with things sensibly and realistically", example: "We need a _ approach to solve this budget crisis.", synonyms: ["practical", "realistic", "sensible"], level: "beginner", partOfSpeech: "adjective", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Refute", definition: "To prove a statement or theory to be wrong", example: "The scientist was able to _ the old theory with new evidence.", synonyms: ["disprove", "rebut", "counter"], level: "beginner", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Scrutinize", definition: "To examine or inspect closely and thoroughly", example: "The editor will _ every sentence before publication.", synonyms: ["examine", "inspect", "analyze"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Thrive", definition: "To grow or develop well; to prosper", example: "Plants _ when given adequate sunlight and water.", synonyms: ["flourish", "prosper", "bloom"], level: "beginner", partOfSpeech: "verb", category: "nature", origin: "old english", status: "new", score: 0 },
    { word: "Uniform", definition: "Not changing in form or character; consistent", example: "The company enforces _ standards across all locations.", synonyms: ["consistent", "even", "regular"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Validate", definition: "To check or prove the accuracy of something", example: "We need to _ these results before publishing them.", synonyms: ["confirm", "verify", "substantiate"], level: "beginner", partOfSpeech: "verb", category: "science", origin: "latin", status: "new", score: 0 },
    { word: "Withdraw", definition: "To remove or take away from a particular place", example: "She decided to _ her application after receiving another offer.", synonyms: ["remove", "retract", "pull out"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "old english", status: "new", score: 0 },
    { word: "Ambition", definition: "A strong desire to achieve something", example: "Her _ to become a doctor drove her to study tirelessly.", synonyms: ["aspiration", "drive", "determination"], level: "beginner", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Barren", definition: "Too poor to produce much vegetation; empty", example: "The _ landscape stretched for miles without a single tree.", synonyms: ["desolate", "bleak", "infertile"], level: "beginner", partOfSpeech: "adjective", category: "nature", origin: "french", status: "new", score: 0 },
    { word: "Contempt", definition: "The feeling that a person or thing is beneath consideration", example: "She looked at the mess with _ and refused to clean it.", synonyms: ["disdain", "scorn", "disrespect"], level: "beginner", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Deter", definition: "To discourage someone from doing something", example: "High prices did not _ customers from buying the product.", synonyms: ["discourage", "prevent", "dissuade"], level: "beginner", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Erratic", definition: "Not even or regular in pattern or movement", example: "His _ behavior worried his family and friends.", synonyms: ["unpredictable", "inconsistent", "irregular"], level: "beginner", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Famine", definition: "Extreme scarcity of food", example: "The prolonged drought led to a devastating _.", synonyms: ["starvation", "hunger", "scarcity"], level: "beginner", partOfSpeech: "noun", category: "nature", origin: "french", status: "new", score: 0 },
    { word: "Grim", definition: "Very serious or gloomy; depressing", example: "The doctors gave a _ prognosis for the patient.", synonyms: ["bleak", "somber", "dire"], level: "beginner", partOfSpeech: "adjective", category: "emotions", origin: "old english", status: "new", score: 0 },

    // Intermediate
    { word: "Ambiguous", definition: "Open to more than one interpretation; unclear", example: "The contract language was deliberately _.", synonyms: ["vague", "unclear", "equivocal"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Brevity", definition: "Concise and exact use of words in speech or writing", example: "The _ of his report was appreciated by the busy executives.", synonyms: ["conciseness", "succinctness", "terseness"], level: "intermediate", partOfSpeech: "noun", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Coalesce", definition: "Come together to form one mass or whole", example: "The small groups began to _ into a unified movement.", synonyms: ["merge", "unite", "fuse"], level: "intermediate", partOfSpeech: "verb", category: "science", origin: "latin", status: "new", score: 0 },
    { word: "Dichotomy", definition: "A division into two contrasting things", example: "There is a clear _ between theory and practice.", synonyms: ["division", "split", "contrast"], level: "intermediate", partOfSpeech: "noun", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Enumerate", definition: "To mention things one by one", example: "She began to _ the reasons for her decision.", synonyms: ["list", "catalog", "itemize"], level: "intermediate", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Futile", definition: "Incapable of producing any useful result; pointless", example: "It was _ to argue with someone so stubborn.", synonyms: ["useless", "pointless", "fruitless"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Gregarious", definition: "Fond of company; sociable", example: "Her _ nature made her the life of every party.", synonyms: ["sociable", "outgoing", "convivial"], level: "intermediate", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Hypothesis", definition: "A proposed explanation based on limited evidence", example: "The scientist tested her _ through a series of experiments.", synonyms: ["theory", "proposition", "assumption"], level: "intermediate", partOfSpeech: "noun", category: "science", origin: "greek", status: "new", score: 0 },
    { word: "Idiosyncrasy", definition: "A distinctive or peculiar feature or habit of an individual", example: "One of her _ was collecting unusual salt shakers.", synonyms: ["quirk", "eccentricity", "peculiarity"], level: "intermediate", partOfSpeech: "noun", category: "daily life", origin: "greek", status: "new", score: 0 },
    { word: "Juxtapose", definition: "To place close together for contrasting effect", example: "The exhibit _ modern art with classical paintings.", synonyms: ["compare", "contrast", "pair"], level: "intermediate", partOfSpeech: "verb", category: "arts", origin: "latin", status: "new", score: 0 },
    { word: "Kowtow", definition: "To act in an excessively subservient manner", example: "She refused to _ to unreasonable demands from management.", synonyms: ["grovel", "submit", "defer"], level: "intermediate", partOfSpeech: "verb", category: "society", origin: "other", status: "new", score: 0 },
    { word: "Lethargic", definition: "Affected by a lack of energy or enthusiasm", example: "The heat made everyone feel _ and unmotivated.", synonyms: ["sluggish", "listless", "languid"], level: "intermediate", partOfSpeech: "adjective", category: "medicine", origin: "greek", status: "new", score: 0 },
    { word: "Meticulous", definition: "Showing great attention to detail; very careful", example: "The architect was _ in her planning of every structural element.", synonyms: ["thorough", "precise", "scrupulous"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Nonchalant", definition: "Feeling or appearing casually calm and relaxed", example: "He tried to seem _ despite his nervousness.", synonyms: ["casual", "indifferent", "unconcerned"], level: "intermediate", partOfSpeech: "adjective", category: "emotions", origin: "french", status: "new", score: 0 },
    { word: "Ostensible", definition: "Stated or appearing to be true, but not necessarily so", example: "The _ reason for the meeting was to discuss budgets.", synonyms: ["apparent", "seeming", "supposed"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Penchant", definition: "A strong or habitual liking for something", example: "She has a _ for expensive handbags.", synonyms: ["fondness", "preference", "inclination"], level: "intermediate", partOfSpeech: "noun", category: "emotions", origin: "french", status: "new", score: 0 },
    { word: "Quintessential", definition: "Representing the most perfect example of a quality", example: "He is the _ gentleman, always polite and well-dressed.", synonyms: ["typical", "classic", "ideal"], level: "intermediate", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Repudiate", definition: "To refuse to accept or be associated with", example: "The senator moved quickly to _ the controversial remarks.", synonyms: ["reject", "deny", "disown"], level: "intermediate", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Sycophant", definition: "A person who acts obsequiously to gain advantage", example: "The boss was surrounded by _ who agreed with everything he said.", synonyms: ["flatterer", "toady", "yes-man"], level: "intermediate", partOfSpeech: "noun", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Tangential", definition: "Relating to or along a tangent; barely relevant", example: "His comments were _ and did not address the main issue.", synonyms: ["peripheral", "irrelevant", "divergent"], level: "intermediate", partOfSpeech: "adjective", category: "science", origin: "latin", status: "new", score: 0 },
    { word: "Ubiquitous", definition: "Present, appearing, or found everywhere", example: "Smartphones have become _ in modern society.", synonyms: ["omnipresent", "pervasive", "universal"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Vindicate", definition: "To clear someone of blame or suspicion", example: "The new evidence served to _ the wrongly accused man.", synonyms: ["exonerate", "absolve", "acquit"], level: "intermediate", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Whimsical", definition: "Playfully quaint or fanciful, especially in an appealing way", example: "The garden had a _ design with winding paths and hidden benches.", synonyms: ["fanciful", "playful", "capricious"], level: "intermediate", partOfSpeech: "adjective", category: "emotions", origin: "old english", status: "new", score: 0 },
    { word: "Acrimony", definition: "Bitterness or ill feeling", example: "The divorce was filled with _ on both sides.", synonyms: ["bitterness", "hostility", "rancor"], level: "intermediate", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Benign", definition: "Gentle and kindly; not harmful", example: "Fortunately, the tumor turned out to be _.", synonyms: ["harmless", "mild", "gentle"], level: "intermediate", partOfSpeech: "adjective", category: "medicine", origin: "latin", status: "new", score: 0 },
    { word: "Capricious", definition: "Given to sudden and unaccountable changes of mood", example: "The _ weather made it hard to plan outdoor events.", synonyms: ["fickle", "unpredictable", "changeable"], level: "intermediate", partOfSpeech: "adjective", category: "emotions", origin: "italian", status: "new", score: 0 },
    { word: "Debilitate", definition: "To make someone weak and infirm", example: "The chronic illness continued to _ him over the years.", synonyms: ["weaken", "enfeeble", "incapacitate"], level: "intermediate", partOfSpeech: "verb", category: "medicine", origin: "latin", status: "new", score: 0 },
    { word: "Equivocal", definition: "Open to more than one interpretation; ambiguous", example: "The politician gave an _ answer that satisfied no one.", synonyms: ["ambiguous", "vague", "unclear"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Frivolous", definition: "Not having any serious purpose or value", example: "The judge dismissed the lawsuit as _.", synonyms: ["trivial", "petty", "superficial"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Galvanize", definition: "To shock or excite someone into taking action", example: "The crisis helped _ the community into organizing relief efforts.", synonyms: ["stimulate", "motivate", "energize"], level: "intermediate", partOfSpeech: "verb", category: "science", origin: "italian", status: "new", score: 0 },
    { word: "Harbinger", definition: "A person or thing that announces the approach of another", example: "The robin is often seen as a _ of spring.", synonyms: ["herald", "forerunner", "precursor"], level: "intermediate", partOfSpeech: "noun", category: "daily life", origin: "germanic", status: "new", score: 0 },
    { word: "Impervious", definition: "Not allowing fluid to pass through; unable to be affected", example: "She seemed _ to the criticism from her peers.", synonyms: ["resistant", "immune", "impenetrable"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Judicious", definition: "Having or showing good judgment; wise", example: "A _ use of resources is essential in times of scarcity.", synonyms: ["wise", "prudent", "sensible"], level: "intermediate", partOfSpeech: "adjective", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Languish", definition: "To lose or lack vitality; to grow weak", example: "The prisoners were left to _ in overcrowded cells.", synonyms: ["weaken", "wilt", "deteriorate"], level: "intermediate", partOfSpeech: "verb", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Magnanimous", definition: "Very generous or forgiving, especially toward a rival", example: "The _ victor offered aid to the defeated side.", synonyms: ["generous", "charitable", "noble"], level: "intermediate", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Nascent", definition: "Just beginning to develop; emerging", example: "The _ technology shows great promise for the future.", synonyms: ["emerging", "budding", "developing"], level: "intermediate", partOfSpeech: "adjective", category: "science", origin: "latin", status: "new", score: 0 },
    { word: "Obfuscate", definition: "To render unclear or unintelligible", example: "The company tried to _ the true cost of the product.", synonyms: ["confuse", "obscure", "muddle"], level: "intermediate", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Perfunctory", definition: "Carried out with minimum effort or reflection", example: "He gave a _ nod and returned to his work.", synonyms: ["cursory", "superficial", "halfhearted"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Quagmire", definition: "A soft boggy area; a complex or difficult situation", example: "The project became a _ of conflicting demands and tight deadlines.", synonyms: ["predicament", "muddle", "morass"], level: "intermediate", partOfSpeech: "noun", category: "nature", origin: "old english", status: "new", score: 0 },
    { word: "Recalcitrant", definition: "Having an obstinately uncooperative attitude", example: "The _ student refused to follow any classroom rules.", synonyms: ["defiant", "stubborn", "unruly"], level: "intermediate", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Spurious", definition: "Not being what it purports to be; false or fake", example: "The detective uncovered several _ claims in the testimony.", synonyms: ["false", "bogus", "fraudulent"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Trepidation", definition: "A feeling of fear or agitation about something", example: "She entered the haunted house with great _.", synonyms: ["fear", "anxiety", "apprehension"], level: "intermediate", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Unprecedented", definition: "Never done or known before", example: "The pandemic caused _ disruptions to global supply chains.", synonyms: ["unparalleled", "unmatched", "novel"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Vacillate", definition: "To alternate or waver between different opinions or actions", example: "She continued to _ between accepting the job and staying.", synonyms: ["waver", "hesitate", "fluctuate"], level: "intermediate", partOfSpeech: "verb", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Wanton", definition: "Deliberate and unprovoked; sexually immoral", example: "The _ destruction of the village shocked the world.", synonyms: ["deliberate", "gratuitous", "reckless"], level: "intermediate", partOfSpeech: "adjective", category: "society", origin: "old english", status: "new", score: 0 },
    { word: "Anomaly", definition: "Something that deviates from what is standard or expected", example: "The warm winter day was an _ in the typically cold season.", synonyms: ["irregularity", "aberration", "oddity"], level: "intermediate", partOfSpeech: "noun", category: "science", origin: "greek", status: "new", score: 0 },
    { word: "Bolster", definition: "To support or strengthen", example: "New evidence helped _ the prosecution's case.", synonyms: ["support", "reinforce", "strengthen"], level: "intermediate", partOfSpeech: "verb", category: "daily life", origin: "old english", status: "new", score: 0 },
    { word: "Cogent", definition: "Clear, logical, and convincing", example: "She presented a _ argument that swayed the jury.", synonyms: ["compelling", "persuasive", "convincing"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Disparage", definition: "To regard or represent as being of little worth", example: "It is unprofessional to _ the work of your colleagues.", synonyms: ["belittle", "denigrate", "deprecate"], level: "intermediate", partOfSpeech: "verb", category: "society", origin: "french", status: "new", score: 0 },
    { word: "Elucidate", definition: "To make something clear; to explain", example: "The professor tried to _ the complex theory for the students.", synonyms: ["clarify", "explain", "illuminate"], level: "intermediate", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Fervid", definition: "Intensely enthusiastic or passionate", example: "The candidate's _ supporters rallied in the streets.", synonyms: ["passionate", "ardent", "zealous"], level: "intermediate", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Gratuitous", definition: "Uncalled for; lacking good reason", example: "The movie was criticized for its _ violence.", synonyms: ["unnecessary", "unwarranted", "needless"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Hedonist", definition: "A person who believes pleasure is the most important thing", example: "The _ spent lavishly on food, wine, and entertainment.", synonyms: ["pleasure-seeker", "sensualist", "epicure"], level: "intermediate", partOfSpeech: "noun", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Innocuous", definition: "Not harmful or offensive", example: "The comment seemed _ but actually hurt her feelings.", synonyms: ["harmless", "inoffensive", "benign"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Juxtaposition", definition: "The fact of placing things close together for comparison", example: "The _ of wealth and poverty in the city was stark.", synonyms: ["comparison", "contrast", "proximity"], level: "intermediate", partOfSpeech: "noun", category: "arts", origin: "latin", status: "new", score: 0 },
    { word: "Laconic", definition: "Using very few words to express something", example: "His _ reply of 'fine' ended the conversation.", synonyms: ["terse", "brief", "concise"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "greek", status: "new", score: 0 },
    { word: "Mollify", definition: "To appease the anger or anxiety of someone", example: "He tried to _ his upset wife with flowers and an apology.", synonyms: ["appease", "placate", "soothe"], level: "intermediate", partOfSpeech: "verb", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Nefarious", definition: "Wicked or criminal in nature", example: "The villain hatched a _ plot to take over the city.", synonyms: ["wicked", "evil", "villainous"], level: "intermediate", partOfSpeech: "adjective", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Ostentatious", definition: "Characterized by vulgar or pretentious display", example: "The _ mansion was decorated with gold fixtures everywhere.", synonyms: ["showy", "flashy", "pretentious"], level: "intermediate", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Pernicious", definition: "Having a harmful effect, especially in a gradual way", example: "The _ influence of misinformation eroded public trust.", synonyms: ["harmful", "destructive", "damaging"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Rectify", definition: "To put right; to correct", example: "The company moved quickly to _ the billing error.", synonyms: ["correct", "remedy", "fix"], level: "intermediate", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Superfluous", definition: "Unnecessary, especially through being more than enough", example: "The extra details were _ and cluttered the report.", synonyms: ["excess", "redundant", "surplus"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Transient", definition: "Lasting only for a short time; impermanent", example: "The _ nature of fame can be difficult for celebrities.", synonyms: ["temporary", "brief", "fleeting"], level: "intermediate", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Utilitarian", definition: "Designed to be useful rather than attractive", example: "The building had a _ design with no decorative elements.", synonyms: ["practical", "functional", "pragmatic"], level: "intermediate", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Verbose", definition: "Using more words than needed; wordy", example: "The _ speaker tested the patience of everyone in the room.", synonyms: ["wordy", "long-winded", "prolix"], level: "intermediate", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Zealot", definition: "A person who is fanatical and uncompromising in pursuit of ideals", example: "The political _ refused to consider any opposing viewpoints.", synonyms: ["fanatic", "extremist", "radical"], level: "intermediate", partOfSpeech: "noun", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Auspicious", definition: "Conducive to success; favorable", example: "The sunny weather was an _ start to the outdoor wedding.", synonyms: ["favorable", "promising", "propitious"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Belligerent", definition: "Hostile and aggressive", example: "The _ customer shouted at the cashier over a minor issue.", synonyms: ["hostile", "combative", "aggressive"], level: "intermediate", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Conundrum", definition: "A confusing and difficult problem or question", example: "The budget deficit presented a _ for the new administration.", synonyms: ["puzzle", "dilemma", "riddle"], level: "intermediate", partOfSpeech: "noun", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Didactic", definition: "Intended to teach, especially in a moralistic way", example: "The novel's _ tone made it feel more like a lecture than a story.", synonyms: ["instructive", "educational", "pedagogic"], level: "intermediate", partOfSpeech: "adjective", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Empirical", definition: "Based on observation or experience rather than theory", example: "The study relied on _ data collected over five years.", synonyms: ["observational", "experiential", "practical"], level: "intermediate", partOfSpeech: "adjective", category: "science", origin: "greek", status: "new", score: 0 },
    { word: "Fortuitous", definition: "Happening by accident or chance rather than design", example: "Their _ meeting at the airport led to a lifelong friendship.", synonyms: ["accidental", "chance", "serendipitous"], level: "intermediate", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Guile", definition: "Sly or cunning intelligence", example: "The fox used _ to trick the crow into dropping the cheese.", synonyms: ["cunning", "craftiness", "deceit"], level: "intermediate", partOfSpeech: "noun", category: "society", origin: "germanic", status: "new", score: 0 },

    // Advanced
    { word: "Ameliorate", definition: "To make something bad or unsatisfactory better", example: "The new policies were designed to _ living conditions.", synonyms: ["improve", "enhance", "better"], level: "advanced", partOfSpeech: "verb", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Bellicose", definition: "Demonstrating aggression and willingness to fight", example: "The _ rhetoric from both sides escalated the conflict.", synonyms: ["aggressive", "combative", "pugnacious"], level: "advanced", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Cacophony", definition: "A harsh, discordant mixture of sounds", example: "The _ of car horns filled the crowded street.", synonyms: ["discord", "dissonance", "racket"], level: "advanced", partOfSpeech: "noun", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Deleterious", definition: "Causing harm or damage", example: "Smoking has _ effects on your health.", synonyms: ["harmful", "damaging", "detrimental"], level: "advanced", partOfSpeech: "adjective", category: "science", origin: "greek", status: "new", score: 0 },
    { word: "Ephemeral", definition: "Lasting for a very short time", example: "The beauty of cherry blossoms is _.", synonyms: ["fleeting", "transient", "momentary"], level: "advanced", partOfSpeech: "adjective", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Fastidious", definition: "Very attentive to accuracy and detail", example: "She was _ about keeping her workspace organized.", synonyms: ["meticulous", "particular", "scrupulous"], level: "advanced", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Garrulous", definition: "Excessively talkative, especially on trivial matters", example: "The _ neighbor kept them at the door for an hour.", synonyms: ["talkative", "loquacious", "verbose"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Hegemony", definition: "Leadership or dominance of one group over others", example: "The country's economic _ influenced global markets.", synonyms: ["dominance", "supremacy", "authority"], level: "advanced", partOfSpeech: "noun", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Iconoclast", definition: "A person who attacks cherished beliefs or institutions", example: "The _ challenged every tradition the community held dear.", synonyms: ["rebel", "dissenter", "nonconformist"], level: "advanced", partOfSpeech: "noun", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Jejune", definition: "Naive, simplistic, or superficial", example: "His _ understanding of politics embarrassed his colleagues.", synonyms: ["naive", "simplistic", "shallow"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Kismet", definition: "Destiny or fate", example: "Meeting her at that exact moment felt like _.", synonyms: ["fate", "destiny", "providence"], level: "advanced", partOfSpeech: "noun", category: "philosophy", origin: "arabic", status: "new", score: 0 },
    { word: "Lugubrious", definition: "Looking or sounding sad and dismal", example: "The _ tone of the cello filled the empty hall.", synonyms: ["mournful", "gloomy", "doleful"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Malfeasance", definition: "Wrongdoing, especially by a public official", example: "The mayor was investigated for _ in office.", synonyms: ["misconduct", "wrongdoing", "corruption"], level: "advanced", partOfSpeech: "noun", category: "law", origin: "french", status: "new", score: 0 },
    { word: "Nadir", definition: "The lowest point in the fortunes of a person or organization", example: "The company reached its _ during the financial crisis of 2008.", synonyms: ["low point", "bottom", "rock bottom"], level: "advanced", partOfSpeech: "noun", category: "science", origin: "arabic", status: "new", score: 0 },
    { word: "Obsequious", definition: "Obedient or attentive to an excessive degree", example: "The _ waiter hovered over the table all evening.", synonyms: ["servile", "fawning", "sycophantic"], level: "advanced", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Palimpsest", definition: "Something reused or altered but still bearing traces of its original form", example: "The city is a _ of architectural styles spanning centuries.", synonyms: ["manuscript", "layered text", "overwritten document"], level: "advanced", partOfSpeech: "noun", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Quixotic", definition: "Exceedingly idealistic; unrealistic and impractical", example: "His _ quest to reform the entire system amused his pragmatic colleagues.", synonyms: ["idealistic", "impractical", "romantic"], level: "advanced", partOfSpeech: "adjective", category: "philosophy", origin: "spanish", status: "new", score: 0 },
    { word: "Recondite", definition: "Little known; abstruse; dealing with obscure subject matter", example: "The professor's _ lectures attracted only the most dedicated students.", synonyms: ["obscure", "abstruse", "arcane"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Sanguine", definition: "Optimistic or positive, especially in a difficult situation", example: "Despite the setback, she remained _ about the project's success.", synonyms: ["optimistic", "hopeful", "positive"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Truculent", definition: "Eager or quick to argue or fight; aggressively defiant", example: "The _ teenager argued with every authority figure.", synonyms: ["aggressive", "belligerent", "combative"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Unctuous", definition: "Excessively or ingratiatingly flattering; oily", example: "The _ salesman made promises he clearly could not keep.", synonyms: ["sycophantic", "oily", "ingratiating"], level: "advanced", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Verisimilitude", definition: "The appearance of being true or real", example: "The novel's _ made readers believe the events actually happened.", synonyms: ["realism", "authenticity", "plausibility"], level: "advanced", partOfSpeech: "noun", category: "arts", origin: "latin", status: "new", score: 0 },
    { word: "Weltanschauung", definition: "A particular philosophy or view of life; a worldview", example: "Her travels profoundly shaped her _.", synonyms: ["worldview", "philosophy", "ideology"], level: "advanced", partOfSpeech: "noun", category: "philosophy", origin: "germanic", status: "new", score: 0 },
    { word: "Acrimonious", definition: "Angry and bitter in tone or manner", example: "The _ debate left both candidates visibly upset.", synonyms: ["bitter", "hostile", "rancorous"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Beguile", definition: "To charm or enchant, sometimes in a deceptive way", example: "The storyteller could _ audiences for hours on end.", synonyms: ["charm", "enchant", "captivate"], level: "advanced", partOfSpeech: "verb", category: "emotions", origin: "old english", status: "new", score: 0 },
    { word: "Chicanery", definition: "The use of trickery to achieve a political or legal purpose", example: "The election was marred by _ and voter fraud.", synonyms: ["trickery", "deception", "subterfuge"], level: "advanced", partOfSpeech: "noun", category: "law", origin: "french", status: "new", score: 0 },
    { word: "Desultory", definition: "Lacking a plan, purpose, or enthusiasm", example: "Their _ conversation drifted from topic to topic.", synonyms: ["aimless", "random", "unfocused"], level: "advanced", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Enervate", definition: "To cause someone to feel drained of energy", example: "The oppressive heat seemed to _ everyone in the room.", synonyms: ["exhaust", "weaken", "fatigue"], level: "advanced", partOfSpeech: "verb", category: "medicine", origin: "latin", status: "new", score: 0 },
    { word: "Fatuous", definition: "Silly and pointless", example: "His _ remarks revealed a complete lack of understanding.", synonyms: ["foolish", "silly", "inane"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Grandeur", definition: "Splendor and impressiveness of appearance or style", example: "The _ of the palace left all visitors speechless.", synonyms: ["magnificence", "splendor", "majesty"], level: "advanced", partOfSpeech: "noun", category: "arts", origin: "french", status: "new", score: 0 },
    { word: "Harangue", definition: "A lengthy and aggressive speech or lecture", example: "The coach delivered a _ about the team's lack of effort.", synonyms: ["tirade", "diatribe", "rant"], level: "advanced", partOfSpeech: "noun", category: "language", origin: "french", status: "new", score: 0 },
    { word: "Inchoate", definition: "Just begun and so not fully formed or developed", example: "Her _ ideas slowly took shape over several months.", synonyms: ["undeveloped", "rudimentary", "embryonic"], level: "advanced", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Juggernaut", definition: "A huge, powerful, and overwhelming force", example: "The tech company became a _ that dominated the industry.", synonyms: ["powerhouse", "force", "colossus"], level: "advanced", partOfSpeech: "noun", category: "society", origin: "other", status: "new", score: 0 },
    { word: "Kafkaesque", definition: "Marked by surreal distortion and a sense of impending danger", example: "Navigating the bureaucracy felt like a _ nightmare.", synonyms: ["surreal", "nightmarish", "absurd"], level: "advanced", partOfSpeech: "adjective", category: "arts", origin: "germanic", status: "new", score: 0 },
    { word: "Loquacious", definition: "Tending to talk a great deal; talkative", example: "The _ guide barely paused to breathe between anecdotes.", synonyms: ["talkative", "chatty", "voluble"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Mendacious", definition: "Not telling the truth; lying", example: "The _ witness was charged with perjury.", synonyms: ["dishonest", "deceitful", "untruthful"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Nihilism", definition: "The rejection of all religious and moral principles", example: "The philosopher's _ led him to question the meaning of existence itself.", synonyms: ["skepticism", "pessimism", "cynicism"], level: "advanced", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Obstreperous", definition: "Noisy and difficult to control", example: "The _ crowd made it impossible for the speaker to be heard.", synonyms: ["unruly", "rowdy", "boisterous"], level: "advanced", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Parsimonious", definition: "Unwilling to spend money or use resources; stingy", example: "The _ landlord refused to make even basic repairs.", synonyms: ["miserly", "stingy", "tightfisted"], level: "advanced", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Querulous", definition: "Complaining in a petulant or whining manner", example: "The _ patient complained about every aspect of hospital care.", synonyms: ["whiny", "petulant", "peevish"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Redolent", definition: "Strongly reminiscent or suggestive of something", example: "The old house was _ of lavender and aged wood.", synonyms: ["evocative", "suggestive", "reminiscent"], level: "advanced", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Solipsism", definition: "The view that the self is all that can be known to exist", example: "His extreme _ made it impossible for him to empathize with others.", synonyms: ["egocentrism", "self-absorption", "narcissism"], level: "advanced", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Temerity", definition: "Excessive confidence or boldness; audacity", example: "She had the _ to challenge the CEO in front of the entire board.", synonyms: ["audacity", "boldness", "nerve"], level: "advanced", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Umbrage", definition: "Offense or annoyance", example: "She took _ at his suggestion that she was unqualified.", synonyms: ["offense", "resentment", "indignation"], level: "advanced", partOfSpeech: "noun", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Vituperate", definition: "To blame or insult someone in strong or violent language", example: "The critic would _ any artist who dared experiment with form.", synonyms: ["berate", "censure", "revile"], level: "advanced", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Winnow", definition: "To reduce the number of something to remove the weakest", example: "The committee had to _ the applicants down to five finalists.", synonyms: ["sift", "separate", "filter"], level: "advanced", partOfSpeech: "verb", category: "nature", origin: "old english", status: "new", score: 0 },
    { word: "Apotheosis", definition: "The highest point in the development of something; a culmination", example: "The symphony was the _ of his musical career.", synonyms: ["pinnacle", "culmination", "zenith"], level: "advanced", partOfSpeech: "noun", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Byzantine", definition: "Excessively complicated and detailed; devious", example: "The _ tax code confused even seasoned accountants.", synonyms: ["complex", "intricate", "convoluted"], level: "advanced", partOfSpeech: "adjective", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Circumlocution", definition: "The use of many words where fewer would do", example: "His _ frustrated listeners who just wanted a straight answer.", synonyms: ["verbosity", "wordiness", "periphrasis"], level: "advanced", partOfSpeech: "noun", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Diatribe", definition: "A forceful and bitter verbal attack against someone or something", example: "The senator launched into a _ against the proposed legislation.", synonyms: ["tirade", "harangue", "rant"], level: "advanced", partOfSpeech: "noun", category: "language", origin: "greek", status: "new", score: 0 },
    { word: "Evanescent", definition: "Soon passing out of sight, memory, or existence", example: "The _ beauty of the sunset lasted only moments.", synonyms: ["fleeting", "vanishing", "transient"], level: "advanced", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Fecund", definition: "Producing or capable of producing an abundance of offspring or new growth", example: "The _ soil produced record harvests year after year.", synonyms: ["fertile", "productive", "prolific"], level: "advanced", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Germane", definition: "Relevant to a subject under consideration", example: "Please keep your comments _ to the topic at hand.", synonyms: ["relevant", "pertinent", "applicable"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Hubris", definition: "Excessive pride or self-confidence leading to downfall", example: "The CEO's _ led him to ignore warnings from his advisors.", synonyms: ["arrogance", "conceit", "overconfidence"], level: "advanced", partOfSpeech: "noun", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Impecunious", definition: "Having little or no money", example: "The _ artist survived on the generosity of friends.", synonyms: ["penniless", "poor", "destitute"], level: "advanced", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Jocund", definition: "Cheerful and lighthearted", example: "The _ atmosphere at the festival lifted everyone's spirits.", synonyms: ["cheerful", "merry", "jovial"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Lachrymose", definition: "Tearful or given to weeping", example: "The _ film left the entire audience in tears.", synonyms: ["tearful", "weepy", "sorrowful"], level: "advanced", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Machination", definition: "A scheme or crafty action intended to accomplish some usually evil end", example: "The villain's _ were eventually exposed by the detective.", synonyms: ["scheme", "plot", "conspiracy"], level: "advanced", partOfSpeech: "noun", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Numinous", definition: "Having a strong religious or spiritual quality", example: "The ancient temple had a _ atmosphere that awed all visitors.", synonyms: ["spiritual", "divine", "transcendent"], level: "advanced", partOfSpeech: "adjective", category: "religion", origin: "latin", status: "new", score: 0 },
    { word: "Opprobrium", definition: "Harsh criticism or censure; public disgrace", example: "The scandal brought _ upon the once-respected institution.", synonyms: ["disgrace", "shame", "infamy"], level: "advanced", partOfSpeech: "noun", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Perspicacious", definition: "Having a ready insight into and understanding of things", example: "The _ detective noticed clues that everyone else overlooked.", synonyms: ["perceptive", "astute", "shrewd"], level: "advanced", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Rapacious", definition: "Aggressively greedy or grasping", example: "The _ corporation exploited every resource without regard for consequences.", synonyms: ["greedy", "voracious", "predatory"], level: "advanced", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Sagacious", definition: "Having or showing keen mental discernment and good judgment", example: "The _ leader anticipated the crisis months before it occurred.", synonyms: ["wise", "shrewd", "astute"], level: "advanced", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Tendentious", definition: "Expressing or intending to promote a particular cause or point of view", example: "The _ documentary presented only one side of the story.", synonyms: ["biased", "partisan", "one-sided"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Usurp", definition: "To take a position of power illegally or by force", example: "The general attempted to _ the throne through a military coup.", synonyms: ["seize", "commandeer", "appropriate"], level: "advanced", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Vociferous", definition: "Expressing opinions or feelings in a loud and forceful way", example: "The _ protesters demanded immediate action from the government.", synonyms: ["loud", "clamorous", "strident"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Zeitgeist", definition: "The defining spirit or mood of a particular period of history", example: "The film perfectly captured the _ of the 1960s counterculture.", synonyms: ["spirit", "mood", "ethos"], level: "advanced", partOfSpeech: "noun", category: "philosophy", origin: "germanic", status: "new", score: 0 },
    { word: "Anathema", definition: "Something or someone that one vehemently dislikes", example: "Censorship is _ to those who value free speech.", synonyms: ["abomination", "bane", "curse"], level: "advanced", partOfSpeech: "noun", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Brobdingnagian", definition: "Gigantic; enormous in size", example: "The _ skyscraper dwarfed everything around it.", synonyms: ["enormous", "colossal", "immense"], level: "advanced", partOfSpeech: "adjective", category: "language", origin: "other", status: "new", score: 0 },
    { word: "Contumacious", definition: "Stubbornly or willfully disobedient to authority", example: "The _ defendant refused to comply with the court order.", synonyms: ["rebellious", "defiant", "insubordinate"], level: "advanced", partOfSpeech: "adjective", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Diaphanous", definition: "Light, delicate, and translucent", example: "She wore a _ gown that seemed to float as she walked.", synonyms: ["sheer", "translucent", "gossamer"], level: "advanced", partOfSpeech: "adjective", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Excoriate", definition: "To criticize someone or something severely", example: "The review served to _ the director's latest film.", synonyms: ["denounce", "condemn", "lambaste"], level: "advanced", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Filibuster", definition: "An action such as prolonged speaking to delay legislative action", example: "The senator launched a _ to block the vote on the bill.", synonyms: ["obstruction", "delay", "stonewalling"], level: "advanced", partOfSpeech: "noun", category: "law", origin: "spanish", status: "new", score: 0 },
    { word: "Genuflect", definition: "To lower one's body by bending a knee, as in worship or respect", example: "The congregation would _ before entering the pew.", synonyms: ["kneel", "bow", "curtsy"], level: "advanced", partOfSpeech: "verb", category: "religion", origin: "latin", status: "new", score: 0 },

    // Expert
    { word: "Abnegation", definition: "The act of renouncing or rejecting something", example: "His _ of worldly pleasures led to a monastic life.", synonyms: ["renunciation", "self-denial", "abstinence"], level: "expert", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Blandishment", definition: "A flattering or pleasing statement used to persuade", example: "No amount of _ could change her mind.", synonyms: ["flattery", "cajolery", "coaxing"], level: "expert", partOfSpeech: "noun", category: "society", origin: "french", status: "new", score: 0 },
    { word: "Casuistry", definition: "The use of clever but unsound reasoning", example: "The lawyer's _ failed to convince the jury.", synonyms: ["sophistry", "speciousness", "fallacy"], level: "expert", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Defenestration", definition: "The act of throwing someone out of a window", example: "The _ of Prague was a pivotal event in European history.", synonyms: ["ejection", "expulsion"], level: "expert", partOfSpeech: "noun", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Effulgent", definition: "Shining brightly; radiant", example: "The _ sunset painted the sky in gold and crimson.", synonyms: ["radiant", "luminous", "resplendent"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Floccinaucinihilipilification", definition: "The estimation of something as valueless", example: "His _ of modern art was well known among critics.", synonyms: ["depreciation", "belittlement"], level: "expert", partOfSpeech: "noun", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Grandiloquent", definition: "Pompous or extravagant in language or style", example: "The politician's _ speeches impressed few voters.", synonyms: ["pompous", "bombastic", "pretentious"], level: "expert", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Hermeneutic", definition: "Relating to interpretation, especially of texts", example: "The professor took a _ approach to analyzing the ancient manuscript.", synonyms: ["interpretive", "explanatory", "exegetical"], level: "expert", partOfSpeech: "adjective", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Ineluctable", definition: "Unable to be resisted or avoided; inescapable", example: "The _ march of time changes everything.", synonyms: ["inevitable", "unavoidable", "inescapable"], level: "expert", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Jejunity", definition: "The quality of being naive, dull, or lacking nourishment", example: "The _ of his arguments disappointed the academic audience.", synonyms: ["dullness", "blandness", "vapidity"], level: "expert", partOfSpeech: "noun", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Katabasis", definition: "A descent, especially a military retreat or a journey to the underworld", example: "The epic poem recounted the hero's _ into the realm of the dead.", synonyms: ["descent", "retreat", "decline"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Legerdemain", definition: "Skillful use of one's hands when performing tricks; deception", example: "The magician's _ left the audience utterly mystified.", synonyms: ["sleight of hand", "trickery", "deception"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "french", status: "new", score: 0 },
    { word: "Mellifluous", definition: "Sweet or musical; pleasant to hear", example: "Her _ voice made even mundane announcements sound beautiful.", synonyms: ["dulcet", "honeyed", "melodious"], level: "expert", partOfSpeech: "adjective", category: "arts", origin: "latin", status: "new", score: 0 },
    { word: "Nugatory", definition: "Having no purpose or value; useless", example: "The committee's recommendations proved _ as nobody implemented them.", synonyms: ["worthless", "futile", "useless"], level: "expert", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Oppugn", definition: "To call into question; to dispute the truth of", example: "The defense attorney tried to _ every piece of prosecution evidence.", synonyms: ["challenge", "contest", "dispute"], level: "expert", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Palaver", definition: "Prolonged and idle discussion; unnecessary fuss", example: "After much _ they finally agreed on a restaurant.", synonyms: ["chatter", "prattle", "babble"], level: "expert", partOfSpeech: "noun", category: "language", origin: "other", status: "new", score: 0 },
    { word: "Quiddity", definition: "The inherent nature or essence of someone or something", example: "The philosopher spent decades trying to define the _ of consciousness.", synonyms: ["essence", "nature", "quintessence"], level: "expert", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Redoubtable", definition: "Formidable, especially as an opponent", example: "The _ chess champion had not lost a match in five years.", synonyms: ["formidable", "fearsome", "mighty"], level: "expert", partOfSpeech: "adjective", category: "society", origin: "french", status: "new", score: 0 },
    { word: "Sesquipedalian", definition: "Characterized by long words or the use of long words", example: "The professor's _ vocabulary intimidated new students.", synonyms: ["polysyllabic", "long-winded", "verbose"], level: "expert", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Tergiversate", definition: "To make conflicting statements; to equivocate", example: "Politicians who _ on key issues lose the public's trust.", synonyms: ["equivocate", "prevaricate", "hedge"], level: "expert", partOfSpeech: "verb", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Ultracrepidarian", definition: "A person who expresses opinions on matters beyond their knowledge", example: "The _ pundit offered medical advice despite having no training.", synonyms: ["charlatan", "know-it-all", "pretender"], level: "expert", partOfSpeech: "noun", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Velleity", definition: "A wish or inclination not strong enough to lead to action", example: "His desire to learn piano remained a mere _ throughout his life.", synonyms: ["whim", "inclination", "fancy"], level: "expert", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Widdershins", definition: "In a direction contrary to the sun's course; counterclockwise", example: "The ritual required them to walk _ around the ancient stone circle.", synonyms: ["counterclockwise", "leftward", "anticlockwise"], level: "expert", partOfSpeech: "adverb", category: "daily life", origin: "germanic", status: "new", score: 0 },
    { word: "Xenophile", definition: "A person who is attracted to foreign peoples, cultures, or customs", example: "As a lifelong _, she collected art from every continent.", synonyms: ["cosmopolitan", "internationalist", "globalist"], level: "expert", partOfSpeech: "noun", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Yarborough", definition: "A hand of cards in which no card is above a nine", example: "He looked at his _ and knew the bridge game was already lost.", synonyms: ["poor hand", "weak hand"], level: "expert", partOfSpeech: "noun", category: "daily life", origin: "other", status: "new", score: 0 },
    { word: "Zugzwang", definition: "A situation in chess where any move will worsen one's position", example: "The grandmaster forced his opponent into _ with a brilliant sacrifice.", synonyms: ["dilemma", "deadlock", "impasse"], level: "expert", partOfSpeech: "noun", category: "daily life", origin: "germanic", status: "new", score: 0 },
    { word: "Anfractuous", definition: "Sinuous or circuitous; full of twists and turns", example: "The _ mountain road tested even the most experienced drivers.", synonyms: ["winding", "tortuous", "serpentine"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Borborygmus", definition: "A rumbling or gurgling noise made by the stomach", example: "The embarrassing _ during the silent exam drew unwanted attention.", synonyms: ["stomach rumble", "gurgling", "growling"], level: "expert", partOfSpeech: "noun", category: "medicine", origin: "greek", status: "new", score: 0 },
    { word: "Callipygian", definition: "Having well-shaped buttocks", example: "Ancient Greek sculptors often depicted _ figures in marble.", synonyms: ["shapely", "curvaceous", "well-proportioned"], level: "expert", partOfSpeech: "adjective", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Deipnosophist", definition: "A person skilled in the art of dining and dinner-table conversation", example: "The celebrated _ entertained guests with witty stories throughout the meal.", synonyms: ["conversationalist", "raconteur", "gastronome"], level: "expert", partOfSpeech: "noun", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Embrocation", definition: "A liquid used for rubbing on the body to relieve pain", example: "The trainer applied an _ to the athlete's sore muscles.", synonyms: ["liniment", "balm", "ointment"], level: "expert", partOfSpeech: "noun", category: "medicine", origin: "greek", status: "new", score: 0 },
    { word: "Fuliginous", definition: "Sooty; dusky; dark or gloomy", example: "The _ atmosphere of the old factory was oppressive.", synonyms: ["sooty", "murky", "dark"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Gasconade", definition: "Extravagant boasting or bragging", example: "His constant _ about his wealth annoyed everyone at the party.", synonyms: ["boasting", "bragging", "bluster"], level: "expert", partOfSpeech: "noun", category: "language", origin: "french", status: "new", score: 0 },
    { word: "Hypethral", definition: "Having no roof; open to the sky", example: "The ancient _ temple allowed worshippers to pray under the stars.", synonyms: ["roofless", "open-air", "unroofed"], level: "expert", partOfSpeech: "adjective", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Inanition", definition: "Exhaustion caused by lack of nourishment; spiritual emptiness", example: "After days without food, _ began to take hold of the survivors.", synonyms: ["starvation", "exhaustion", "emptiness"], level: "expert", partOfSpeech: "noun", category: "medicine", origin: "latin", status: "new", score: 0 },
    { word: "Jocoserious", definition: "Mixing humor with seriousness", example: "The author's _ tone made the heavy subject matter more accessible.", synonyms: ["tragicomic", "seriocomic", "wry"], level: "expert", partOfSpeech: "adjective", category: "language", origin: "latin", status: "new", score: 0 },
    { word: "Kenosis", definition: "The renunciation of divine nature by Christ in becoming human", example: "Theologians debated the implications of _ for centuries.", synonyms: ["self-emptying", "renunciation", "humiliation"], level: "expert", partOfSpeech: "noun", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Logomachy", definition: "A dispute about words or the meaning of words", example: "The philosophical debate devolved into mere _.", synonyms: ["word battle", "argument", "dispute"], level: "expert", partOfSpeech: "noun", category: "language", origin: "greek", status: "new", score: 0 },
    { word: "Meretricious", definition: "Apparently attractive but having no real value; insincere", example: "The _ advertising campaign hid the product's obvious flaws.", synonyms: ["gaudy", "flashy", "specious"], level: "expert", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Nescience", definition: "Lack of knowledge; ignorance", example: "His _ of the local customs led to several embarrassing encounters.", synonyms: ["ignorance", "unawareness", "obliviousness"], level: "expert", partOfSpeech: "noun", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Operose", definition: "Involving or displaying much industry or effort", example: "The _ task of cataloging every artifact took the team three years.", synonyms: ["laborious", "arduous", "painstaking"], level: "expert", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Persiflage", definition: "Light and slightly contemptuous mockery or banter", example: "The dinner party was full of witty _ among old friends.", synonyms: ["banter", "raillery", "badinage"], level: "expert", partOfSpeech: "noun", category: "language", origin: "french", status: "new", score: 0 },
    { word: "Quondam", definition: "That once was; former", example: "The _ champion watched from the stands as a new winner was crowned.", synonyms: ["former", "erstwhile", "previous"], level: "expert", partOfSpeech: "adjective", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Recrudescence", definition: "The recurrence of an undesirable condition", example: "Doctors warned of a possible _ of the disease in winter.", synonyms: ["resurgence", "relapse", "return"], level: "expert", partOfSpeech: "noun", category: "medicine", origin: "latin", status: "new", score: 0 },
    { word: "Shibboleth", definition: "A custom, principle, or belief distinguishing a group of people", example: "The pronunciation of certain words served as a _ to identify outsiders.", synonyms: ["catchword", "password", "motto"], level: "expert", partOfSpeech: "noun", category: "society", origin: "other", status: "new", score: 0 },
    { word: "Thaumaturgy", definition: "The working of wonders or miracles; magic", example: "The ancient texts described feats of _ performed by holy men.", synonyms: ["magic", "sorcery", "wizardry"], level: "expert", partOfSpeech: "noun", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Usufruct", definition: "The right to enjoy the use of another's property short of destruction", example: "The tenant was granted _ of the orchard during the lease period.", synonyms: ["use", "enjoyment", "tenure"], level: "expert", partOfSpeech: "noun", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Veridical", definition: "Truthful; corresponding to facts", example: "The witness gave a _ account that matched the security footage exactly.", synonyms: ["truthful", "accurate", "genuine"], level: "expert", partOfSpeech: "adjective", category: "philosophy", origin: "latin", status: "new", score: 0 },
    { word: "Wergild", definition: "A price set on a person's life in Anglo-Saxon law", example: "Under ancient law, the _ for a nobleman was far higher than for a peasant.", synonyms: ["blood money", "compensation", "restitution"], level: "expert", partOfSpeech: "noun", category: "law", origin: "old english", status: "new", score: 0 },
    { word: "Xeric", definition: "Of or adapted to a dry environment", example: "The _ landscape supported only the hardiest desert plants.", synonyms: ["arid", "dry", "desiccated"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "greek", status: "new", score: 0 },
    { word: "Apophasis", definition: "Mentioning a subject by saying you will not mention it", example: "His _ was obvious when he said he would not bring up his opponent's scandal.", synonyms: ["paralipsis", "preterition", "denial"], level: "expert", partOfSpeech: "noun", category: "language", origin: "greek", status: "new", score: 0 },
    { word: "Bathos", definition: "An effect of anticlimax created by an unintentional lapse in mood", example: "The speech descended into _ when the senator compared world hunger to a bad haircut.", synonyms: ["anticlimax", "letdown", "triteness"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Cathexis", definition: "The concentration of mental energy on one particular person or idea", example: "Her _ on the unattainable goal consumed her every waking moment.", synonyms: ["fixation", "obsession", "preoccupation"], level: "expert", partOfSpeech: "noun", category: "science", origin: "greek", status: "new", score: 0 },
    { word: "Demiurge", definition: "A being responsible for the creation of the universe", example: "Gnostic traditions describe a _ who fashioned the material world.", synonyms: ["creator", "maker", "architect"], level: "expert", partOfSpeech: "noun", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Eristic", definition: "Of or characterized by debate or argument", example: "The _ philosopher delighted in proving others wrong.", synonyms: ["argumentative", "disputatious", "contentious"], level: "expert", partOfSpeech: "adjective", category: "philosophy", origin: "greek", status: "new", score: 0 },
    { word: "Fugacious", definition: "Tending to disappear; fleeting", example: "The _ bloom of the night-flowering cactus lasts only hours.", synonyms: ["fleeting", "transient", "ephemeral"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Girandole", definition: "A branched support for candles or other lights", example: "An ornate crystal _ hung above the dining table in the palace.", synonyms: ["candelabra", "chandelier", "sconce"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "italian", status: "new", score: 0 },
    { word: "Heterodox", definition: "Not conforming with accepted or orthodox standards or beliefs", example: "Her _ views on economics challenged the established theories.", synonyms: ["unorthodox", "heretical", "nonconformist"], level: "expert", partOfSpeech: "adjective", category: "religion", origin: "greek", status: "new", score: 0 },
    { word: "Irredentism", definition: "The policy of claiming territory belonging to another state on ethnic grounds", example: "Rising _ in the region threatened to destabilize border agreements.", synonyms: ["expansionism", "nationalism", "territorial claim"], level: "expert", partOfSpeech: "noun", category: "society", origin: "italian", status: "new", score: 0 },
    { word: "Jactitation", definition: "The restless tossing of the body; a false boast of marriage", example: "The patient's _ during the fever alarmed the attending nurse.", synonyms: ["restlessness", "tossing", "agitation"], level: "expert", partOfSpeech: "noun", category: "medicine", origin: "latin", status: "new", score: 0 },
    { word: "Kakistocracy", definition: "Government by the least suitable or competent citizens", example: "Critics described the corrupt regime as a textbook example of _.", synonyms: ["misgovernment", "misrule", "incompetent rule"], level: "expert", partOfSpeech: "noun", category: "society", origin: "greek", status: "new", score: 0 },
    { word: "Lucubration", definition: "Study or meditation carried on late into the night", example: "His years of _ in the library resulted in a groundbreaking thesis.", synonyms: ["study", "meditation", "scholarship"], level: "expert", partOfSpeech: "noun", category: "daily life", origin: "latin", status: "new", score: 0 },
    { word: "Minatory", definition: "Expressing or conveying a threat", example: "The dictator's _ speech warned of severe consequences for dissent.", synonyms: ["threatening", "menacing", "intimidating"], level: "expert", partOfSpeech: "adjective", category: "emotions", origin: "latin", status: "new", score: 0 },
    { word: "Noctivagant", definition: "Wandering or traveling at night", example: "The _ poet found inspiration in the quiet streets after midnight.", synonyms: ["night-wandering", "nocturnal", "nighttime roaming"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Orgulous", definition: "Haughty; proud", example: "The _ nobleman refused to acknowledge anyone he deemed beneath him.", synonyms: ["proud", "arrogant", "haughty"], level: "expert", partOfSpeech: "adjective", category: "emotions", origin: "french", status: "new", score: 0 },
    { word: "Peripeteia", definition: "A sudden reversal of fortune, especially in a drama", example: "The _ in the third act transformed the hero's triumph into tragedy.", synonyms: ["reversal", "twist", "turning point"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Recusant", definition: "A person who refuses to submit to an authority or comply with a regulation", example: "The _ was imprisoned for refusing to attend the state-approved church.", synonyms: ["dissenter", "nonconformist", "objector"], level: "expert", partOfSpeech: "noun", category: "religion", origin: "latin", status: "new", score: 0 },
    { word: "Stochastic", definition: "Randomly determined; having a random probability distribution", example: "The researchers used a _ model to predict weather patterns.", synonyms: ["random", "probabilistic", "unpredictable"], level: "expert", partOfSpeech: "adjective", category: "science", origin: "greek", status: "new", score: 0 },
    { word: "Tmesis", definition: "The separation of parts of a compound word by intervening words", example: "Saying 'abso-blooming-lutely' is a humorous example of _.", synonyms: ["word-splitting", "insertion", "interpolation"], level: "expert", partOfSpeech: "noun", category: "language", origin: "greek", status: "new", score: 0 },
    { word: "Uxorious", definition: "Having or showing an excessive fondness for one's wife", example: "The _ husband agreed to every one of his wife's requests without question.", synonyms: ["doting", "devoted", "submissive"], level: "expert", partOfSpeech: "adjective", category: "society", origin: "latin", status: "new", score: 0 },
    { word: "Vitiate", definition: "To spoil or impair the quality or efficiency of", example: "The procedural error could _ the entire legal proceeding.", synonyms: ["spoil", "impair", "corrupt"], level: "expert", partOfSpeech: "verb", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Woolgathering", definition: "Indulgence in aimless thought or dreamy imagining", example: "The teacher scolded the student for _ during the important lecture.", synonyms: ["daydreaming", "reverie", "absentmindedness"], level: "expert", partOfSpeech: "noun", category: "daily life", origin: "old english", status: "new", score: 0 },
    { word: "Autoschediasm", definition: "Something improvised or extemporized", example: "The brilliant _ of the jazz musician captivated the audience.", synonyms: ["improvisation", "extemporization", "ad-lib"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "greek", status: "new", score: 0 },
    { word: "Boustrophedon", definition: "Writing in which alternate lines run in opposite directions", example: "Ancient Greek inscriptions were sometimes written in _ style.", synonyms: ["alternating script", "zigzag writing"], level: "expert", partOfSpeech: "noun", category: "language", origin: "greek", status: "new", score: 0 },
    { word: "Crepuscular", definition: "Of, resembling, or relating to twilight", example: "Deer are _ animals, most active at dawn and dusk.", synonyms: ["twilight", "dim", "dusky"], level: "expert", partOfSpeech: "adjective", category: "nature", origin: "latin", status: "new", score: 0 },
    { word: "Desuetude", definition: "A state of disuse", example: "The old law had fallen into _ and was no longer enforced.", synonyms: ["disuse", "obsolescence", "dormancy"], level: "expert", partOfSpeech: "noun", category: "law", origin: "latin", status: "new", score: 0 },
    { word: "Ensorcell", definition: "To enchant or fascinate someone", example: "The storyteller's voice seemed to _ the children into silent wonder.", synonyms: ["bewitch", "enchant", "captivate"], level: "expert", partOfSpeech: "verb", category: "arts", origin: "french", status: "new", score: 0 },
    { word: "Feuilleton", definition: "A part of a newspaper devoted to fiction, criticism, or light literature", example: "Her serialized novel first appeared in the _ of a Parisian daily.", synonyms: ["literary supplement", "serial", "column"], level: "expert", partOfSpeech: "noun", category: "arts", origin: "french", status: "new", score: 0 },
];

// ==================== STATE ====================

let words = [];
let currentFlashcardIndex = 0;
let flashcardDeck = [];
let exerciseState = { type: null, score: 0, total: 0, currentWord: null };
let matchingState = { selectedWord: null, pairs: [], matched: 0 };

// ==================== INIT ====================

function init() {
    loadWords();
    setupNavigation();
    setupAddWordForm();
    updateDashboard();
    setupFilters();
    renderWordList();
    setupFlashcards();
    updateStreak();
}

function loadWords() {
    const saved = localStorage.getItem('vocabmaster_words');
    if (saved) {
        words = JSON.parse(saved);
        // Merge in any new default words that don't exist yet
        const existingNames = new Set(words.map(w => w.word.toLowerCase()));
        let maxId = words.reduce((max, w) => Math.max(max, w.id || 0), 0);
        let added = 0;
        DEFAULT_WORDS.forEach(dw => {
            if (!existingNames.has(dw.word.toLowerCase())) {
                maxId++;
                words.push({ ...dw, id: maxId });
                added++;
            }
        });
        // Update existing words with new fields (category, origin) from defaults
        const defaultMap = {};
        DEFAULT_WORDS.forEach(dw => { defaultMap[dw.word.toLowerCase()] = dw; });
        words.forEach(w => {
            const dw = defaultMap[w.word.toLowerCase()];
            if (dw) {
                if (!w.category && dw.category) w.category = dw.category;
                if (!w.origin && dw.origin) w.origin = dw.origin;
                added++;
            }
        });
        if (added > 0) saveWords();
    } else {
        words = DEFAULT_WORDS.map((w, i) => ({ ...w, id: i + 1 }));
        saveWords();
    }
}

function saveWords() {
    localStorage.setItem('vocabmaster_words', JSON.stringify(words));
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('vocabmaster_lastVisit');
    let streak = parseInt(localStorage.getItem('vocabmaster_streak') || '0');

    if (lastVisit !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastVisit === yesterday.toDateString()) {
            streak++;
        } else if (lastVisit !== today) {
            streak = 1;
        }
        localStorage.setItem('vocabmaster_streak', streak);
        localStorage.setItem('vocabmaster_lastVisit', today);
    }

    document.getElementById('streakCount').textContent = streak;
}

// ==================== NAVIGATION ====================

function setupNavigation() {
    document.querySelectorAll('.nav-tab').forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.page);
        });
    });
}

function navigateTo(page) {
    document.querySelectorAll('.nav-tab').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-tab[data-page="${page}"]`).classList.add('active');

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');

    if (page === 'dashboard') updateDashboard();
    if (page === 'wordlist') renderWordList();
    if (page === 'flashcards') setupFlashcards();
    if (page === 'exercises') resetExerciseView();
    if (page === 'addword') updateImportPreview();
}

// ==================== DASHBOARD ====================

function updateDashboard() {
    const total = words.length;
    const mastered = words.filter(w => w.status === 'mastered').length;
    const learning = words.filter(w => w.status === 'learning').length;

    document.getElementById('totalWords').textContent = total;
    document.getElementById('masteredWords').textContent = mastered;
    document.getElementById('learningWords').textContent = learning;

    if (typeof renderDashCards === 'function') renderDashCards();
}

// ==================== WORD LIST ====================

function setupFilters() {
    document.getElementById('searchWords').addEventListener('input', renderWordList);
    document.getElementById('wordlistLevel').addEventListener('change', renderWordList);
    document.getElementById('wordlistStatus').addEventListener('change', renderWordList);
    document.getElementById('wordlistSort').addEventListener('change', renderWordList);
    document.getElementById('globalLevelFilter').addEventListener('change', () => {
        renderWordList();
        setupFlashcards();
    });
}

function getFilteredWords() {
    const globalLevel = document.getElementById('globalLevelFilter').value;
    let filtered = [...words];

    if (globalLevel !== 'all') {
        filtered = filtered.filter(w => w.level === globalLevel);
    }

    // Exercise page filters
    const catEl = document.getElementById('exerciseCategory');
    const posEl = document.getElementById('exercisePartOfSpeech');
    const letEl = document.getElementById('exerciseLetter');
    const origEl = document.getElementById('exerciseOrigin');

    if (catEl && catEl.value !== 'all') {
        filtered = filtered.filter(w => (w.category || '') === catEl.value);
    }
    if (posEl && posEl.value !== 'all') {
        filtered = filtered.filter(w => (w.partOfSpeech || '') === posEl.value);
    }
    if (letEl && letEl.value !== 'all') {
        filtered = filtered.filter(w => w.word.charAt(0).toUpperCase() === letEl.value);
    }
    if (origEl && origEl.value !== 'all') {
        filtered = filtered.filter(w => (w.origin || '') === origEl.value);
    }

    return filtered;
}

let selectMode = false;
let selectedIds = new Set();

function toggleSelectMode() {
    selectMode = !selectMode;
    selectedIds.clear();
    const btn = document.getElementById('selectModeBtn');
    if (btn) btn.classList.toggle('active', selectMode);
    updateSelectBar();
    renderWordList();
}

function toggleWordSelect(id, event) {
    event.stopPropagation();
    if (selectedIds.has(id)) {
        selectedIds.delete(id);
    } else {
        selectedIds.add(id);
    }
    updateSelectBar();
    // Update checkbox visually
    const cb = document.querySelector(`.word-card-checkbox[data-id="${id}"]`);
    if (cb) cb.checked = selectedIds.has(id);
}

function updateSelectBar() {
    const bar = document.getElementById('selectBar');
    if (!bar) return;
    if (selectMode && selectedIds.size > 0) {
        bar.classList.remove('hidden');
        document.getElementById('selectCount').textContent = `${selectedIds.size} selected`;
    } else {
        bar.classList.add('hidden');
    }
}

function bulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} word(s)?`)) return;
    words = words.filter(w => !selectedIds.has(w.id));
    selectedIds.clear();
    saveWords();
    updateSelectBar();
    renderWordList();
    updateDashboard();
}

function bulkChangeLevel() {
    const level = document.getElementById('bulkLevel').value;
    if (!level) return;
    words.forEach(w => {
        if (selectedIds.has(w.id)) w.level = level;
    });
    selectedIds.clear();
    document.getElementById('bulkLevel').value = '';
    saveWords();
    updateSelectBar();
    renderWordList();
}

function renderWordList() {
    const search = document.getElementById('searchWords').value.toLowerCase();
    const level = document.getElementById('wordlistLevel').value;
    const status = document.getElementById('wordlistStatus').value;
    const globalLevel = document.getElementById('globalLevelFilter').value;
    const sort = document.getElementById('wordlistSort').value;

    let filtered = words.filter(w => {
        if (search && !w.word.toLowerCase().includes(search) && !w.definition.toLowerCase().includes(search)) return false;
        if (level !== 'all' && w.level !== level) return false;
        if (status !== 'all' && w.status !== status) return false;
        if (globalLevel !== 'all' && w.level !== globalLevel) return false;
        return true;
    });

    if (sort === 'az') {
        filtered.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sort === 'za') {
        filtered.sort((a, b) => b.word.localeCompare(a.word));
    } else if (sort === 'level') {
        const order = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
        filtered.sort((a, b) => order[a.level] - order[b.level] || a.word.localeCompare(b.word));
    } else if (sort === 'score') {
        filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    const container = document.getElementById('wordlistContainer');

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-dim)">No words found. Add some!</div>';
        return;
    }

    container.innerHTML = filtered.map(w => `
        <div class="word-card ${selectMode ? 'word-card-select' : ''}" onclick="${selectMode ? `toggleWordSelect(${w.id}, event)` : `showWordDetail(${w.id})`}">
            ${selectMode ? `<input type="checkbox" class="word-card-checkbox" data-id="${w.id}" ${selectedIds.has(w.id) ? 'checked' : ''} onclick="toggleWordSelect(${w.id}, event)">` : ''}
            <div class="word-name">${w.word}</div>
            <div class="word-def">${w.definition}</div>
            <span class="word-level-badge badge-${w.level}">${w.level}</span>
            <span class="word-status-badge badge-${w.status}">${w.status}</span>
            ${!selectMode ? `<div class="word-actions">
                <button onclick="event.stopPropagation(); editWord(${w.id})" title="Edit">&#9998;</button>
                <button class="delete-btn" onclick="event.stopPropagation(); deleteWord(${w.id})" title="Delete">&#10006;</button>
            </div>` : ''}
        </div>
    `).join('');
}

function showWordDetail(id) {
    const w = words.find(w => w.id === id);
    if (!w) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML = `
        <div class="modal">
            <h2>${w.word}</h2>
            <p style="color:var(--text-dim);margin-bottom:4px;font-size:13px">${w.partOfSpeech || ''} &bull; <span class="badge-${w.level}" style="padding:2px 8px;border-radius:10px;font-size:11px">${w.level}</span></p>
            <p style="font-size:16px;margin:16px 0">${w.definition}</p>
            ${w.example ? `<p style="color:var(--text-dim);font-style:italic;margin-bottom:12px">"${w.example.replace('_', '<strong style="color:var(--accent)">' + w.word + '</strong>')}"</p>` : ''}
            ${w.synonyms && w.synonyms.length ? `<p style="font-size:13px;color:var(--accent)">Synonyms: ${w.synonyms.join(', ')}</p>` : ''}
            <p style="margin-top:12px;font-size:13px;color:var(--text-dim)">Status: ${w.status} &bull; Score: ${w.score}</p>
            <div class="modal-buttons">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function editWord(id) {
    const w = words.find(w => w.id === id);
    if (!w) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML = `
        <div class="modal">
            <h2>Edit Word</h2>
            <div class="form-group">
                <label>Word</label>
                <input type="text" id="editWord" value="${w.word}">
            </div>
            <div class="form-group">
                <label>Definition</label>
                <textarea id="editDefinition">${w.definition}</textarea>
            </div>
            <div class="form-group">
                <label>Example</label>
                <textarea id="editExample">${w.example || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Synonyms (comma separated)</label>
                <input type="text" id="editSynonyms" value="${(w.synonyms || []).join(', ')}">
            </div>
            <div class="form-group">
                <label>Level</label>
                <select id="editLevel">
                    <option value="beginner" ${w.level === 'beginner' ? 'selected' : ''}>Beginner</option>
                    <option value="intermediate" ${w.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
                    <option value="advanced" ${w.level === 'advanced' ? 'selected' : ''}>Advanced</option>
                    <option value="expert" ${w.level === 'expert' ? 'selected' : ''}>Expert</option>
                </select>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="editStatus">
                    <option value="new" ${w.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="learning" ${w.status === 'learning' ? 'selected' : ''}>Learning</option>
                    <option value="mastered" ${w.status === 'mastered' ? 'selected' : ''}>Mastered</option>
                </select>
            </div>
            <div class="modal-buttons">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn-primary" onclick="saveEdit(${id})">Save</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function saveEdit(id) {
    const w = words.find(w => w.id === id);
    if (!w) return;

    w.word = document.getElementById('editWord').value.trim();
    w.definition = document.getElementById('editDefinition').value.trim();
    w.example = document.getElementById('editExample').value.trim();
    w.synonyms = document.getElementById('editSynonyms').value.split(',').map(s => s.trim()).filter(Boolean);
    w.level = document.getElementById('editLevel').value;
    w.status = document.getElementById('editStatus').value;

    saveWords();
    renderWordList();
    document.querySelector('.modal-overlay').remove();
}

function deleteWord(id) {
    if (!confirm('Delete this word?')) return;
    words = words.filter(w => w.id !== id);
    saveWords();
    renderWordList();
    updateDashboard();
}

// ==================== FLASHCARDS ====================

function setupFlashcards() {
    const level = document.getElementById('flashcardLevel').value;
    const globalLevel = document.getElementById('globalLevelFilter').value;
    const category = document.getElementById('flashcardCategory').value;
    const origin = document.getElementById('flashcardOrigin').value;
    const pos = document.getElementById('flashcardPos').value;
    const status = document.getElementById('flashcardStatus').value;

    flashcardDeck = words.filter(w => {
        if (level !== 'all' && w.level !== level) return false;
        if (globalLevel !== 'all' && w.level !== globalLevel) return false;
        if (category !== 'all' && (w.category || '') !== category) return false;
        if (origin !== 'all' && (w.origin || '') !== origin) return false;
        if (pos !== 'all' && (w.partOfSpeech || '') !== pos) return false;
        if (status !== 'all' && (w.status || '') !== status) return false;
        return true;
    });

    currentFlashcardIndex = 0;
    showFlashcard();

    document.getElementById('flashcardLevel').onchange = setupFlashcards;
    document.getElementById('flashcardCategory').onchange = setupFlashcards;
    document.getElementById('flashcardOrigin').onchange = setupFlashcards;
    document.getElementById('flashcardPos').onchange = setupFlashcards;
    document.getElementById('flashcardStatus').onchange = setupFlashcards;
    document.getElementById('shuffleCards').onclick = () => {
        shuffleArray(flashcardDeck);
        currentFlashcardIndex = 0;
        showFlashcard();
    };
}

function toggleFullscreen() {
    const page = document.getElementById('page-flashcards');
    if (!document.fullscreenElement) {
        (page.requestFullscreen || page.webkitRequestFullscreen || page.msRequestFullscreen).call(page);
        page.classList.add('flashcard-fullscreen');
    } else {
        (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
        page.classList.remove('flashcard-fullscreen');
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('page-flashcards').classList.remove('flashcard-fullscreen');
    }
});

function showFlashcard() {
    const card = document.getElementById('flashcard');
    const inner = card.querySelector('.flashcard-inner');
    // Disable animation when switching cards, re-enable for manual flip
    inner.style.transition = 'none';
    card.classList.remove('flipped');
    // Force reflow then restore transition
    inner.offsetHeight;
    inner.style.transition = '';

    if (flashcardDeck.length === 0) {
        document.getElementById('cardWord').textContent = 'No words';
        document.getElementById('cardLevel').textContent = '';
        document.getElementById('cardDefinition').textContent = 'Add some words or change the filter';
        document.getElementById('cardExample').textContent = '';
        document.getElementById('cardSynonym').textContent = '';
        document.getElementById('cardCounter').textContent = '0 / 0';
        return;
    }

    const w = flashcardDeck[currentFlashcardIndex];
    document.getElementById('cardWord').textContent = w.word;
    document.getElementById('cardLevel').textContent = w.level;
    document.getElementById('cardLevel').className = `card-level-badge badge-${w.level}`;
    document.getElementById('cardDefinition').textContent = w.definition;
    document.getElementById('cardExample').textContent = w.example ? `"${w.example.replace('_', '___')}"` : '';
    document.getElementById('cardSynonym').textContent = w.synonyms && w.synonyms.length ? `Synonyms: ${w.synonyms.join(', ')}` : '';
    document.getElementById('cardCounter').textContent = `${currentFlashcardIndex + 1} / ${flashcardDeck.length}`;
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function nextFlashcard() {
    if (flashcardDeck.length === 0) return;
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcardDeck.length;
    showFlashcard();
}

function prevFlashcard() {
    if (flashcardDeck.length === 0) return;
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcardDeck.length) % flashcardDeck.length;
    showFlashcard();
}

function rateCard(rating) {
    if (flashcardDeck.length === 0) return;
    const w = flashcardDeck[currentFlashcardIndex];
    const original = words.find(wo => wo.id === w.id);
    if (!original) return;

    if (rating === 'good') {
        original.score = Math.min((original.score || 0) + 2, 10);
        if (original.score >= 8) original.status = 'mastered';
        else if (original.score >= 3) original.status = 'learning';
    } else if (rating === 'ok') {
        original.score = Math.min((original.score || 0) + 1, 10);
        if (original.score >= 3) original.status = 'learning';
    } else {
        original.score = Math.max((original.score || 0) - 1, 0);
        if (original.score < 3) original.status = original.score === 0 ? 'new' : 'learning';
    }

    saveWords();
    nextFlashcard();
}

// ==================== EXERCISES ====================

function resetExerciseView() {
    document.querySelector('.exercise-selector').style.display = 'grid';
    document.getElementById('exerciseArea').classList.add('hidden');
}

function startExercise(type) {
    const filtered = getFilteredWords();
    if (filtered.length < 4) {
        alert('Need at least 4 words for exercises. Add more words or change the level filter.');
        return;
    }

    exerciseState = { type, score: 0, total: 0, currentWord: null };
    document.querySelector('.exercise-selector').style.display = 'none';
    document.getElementById('exerciseArea').classList.remove('hidden');

    // Synonym match needs words with synonyms
    if (type === 'synonym-match') {
        const wordsWithSynonyms = filtered.filter(w => w.synonyms && w.synonyms.length > 0);
        if (wordsWithSynonyms.length < 4) {
            alert('Need at least 4 words with synonyms for this exercise. Add synonyms to your words.');
            return;
        }
    }

    const titles = {
        'multiple-choice': 'Multiple Choice',
        'fill-blank': 'Fill in the Blank',
        'matching': 'Matching',
        'spelling': 'Spelling',
        'synonym-match': 'Synonym Match',
        'meaning-match': 'Meaning Match'
    };
    document.getElementById('exerciseTitle').textContent = titles[type];
    updateExerciseScore();

    if (type === 'matching') {
        generateMatching();
    } else {
        generateQuestion();
    }
}

function endExercise() {
    const pct = exerciseState.total > 0 ? Math.round((exerciseState.score / exerciseState.total) * 100) : 0;
    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div style="text-align:center;padding:40px">
            <h2 style="font-size:48px;margin-bottom:16px">${pct >= 80 ? '&#127881;' : pct >= 50 ? '&#128170;' : '&#128218;'}</h2>
            <h2>Exercise Complete!</h2>
            <p style="font-size:20px;margin:12px 0;color:var(--accent)">${exerciseState.score} / ${exerciseState.total} correct (${pct}%)</p>
            <p style="color:var(--text-dim)">${pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good effort, keep practicing!' : 'Keep studying, you\'ll get there!'}</p>
            <button class="btn-primary" style="margin-top:20px" onclick="resetExerciseView()">Back to Exercises</button>
        </div>
    `;
}

function updateExerciseScore() {
    document.getElementById('exerciseScore').textContent = `Score: ${exerciseState.score}/${exerciseState.total}`;
}

function generateQuestion() {
    const filtered = getFilteredWords();
    let word;

    if (exerciseState.type === 'synonym-match') {
        const wordsWithSynonyms = filtered.filter(w => w.synonyms && w.synonyms.length > 0);
        word = wordsWithSynonyms[Math.floor(Math.random() * wordsWithSynonyms.length)];
    } else {
        word = filtered[Math.floor(Math.random() * filtered.length)];
    }

    exerciseState.currentWord = word;

    if (exerciseState.type === 'multiple-choice') {
        generateMultipleChoice(word, filtered);
    } else if (exerciseState.type === 'fill-blank') {
        generateFillBlank(word);
    } else if (exerciseState.type === 'spelling') {
        generateSpelling(word);
    } else if (exerciseState.type === 'synonym-match') {
        generateSynonymMatch(word, filtered);
    } else if (exerciseState.type === 'meaning-match') {
        generateMeaningMatch(word, filtered);
    }
}

function generateMultipleChoice(word, allWords) {
    const others = allWords.filter(w => w.id !== word.id);
    shuffleArray(others);
    const wrongOptions = others.slice(0, 3).map(w => w.definition);
    const options = [word.definition, ...wrongOptions];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">What does "<strong>${word.word}</strong>" mean?</div>
        <div class="mc-options">
            ${options.map((opt, i) => `
                <div class="mc-option" onclick="checkMultipleChoice(this, ${JSON.stringify(opt === word.definition)})">${opt}</div>
            `).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkMultipleChoice(el, correct) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;

    exerciseState.total++;

    document.querySelectorAll('.mc-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    if (correct) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        document.querySelectorAll('.mc-option').forEach(opt => {
            if (opt.textContent === exerciseState.currentWord.definition) {
                opt.classList.add('correct');
            }
        });
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `The answer was: ${exerciseState.currentWord.definition}`);
    }

    updateExerciseScore();
}

function generateFillBlank(word) {
    let sentence = word.example || `The word _ means ${word.definition.toLowerCase()}.`;

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="fill-blank-sentence">${sentence.replace('_', '________')}</div>
        <div class="fill-blank-input">
            <input type="text" id="fillBlankAnswer" placeholder="Type the word..." onkeypress="if(event.key==='Enter')checkFillBlank()">
            <button class="btn-primary" onclick="checkFillBlank()">Check</button>
        </div>
        <div id="questionFeedback"></div>
    `;

    document.getElementById('fillBlankAnswer').focus();
}

function checkFillBlank() {
    const answer = document.getElementById('fillBlankAnswer').value.trim().toLowerCase();
    const correct = exerciseState.currentWord.word.toLowerCase();

    exerciseState.total++;

    if (answer === correct) {
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `The answer was: ${exerciseState.currentWord.word}`);
    }

    updateExerciseScore();
    document.getElementById('fillBlankAnswer').disabled = true;
    document.querySelector('.fill-blank-input .btn-primary').disabled = true;
}

function generateSpelling(word) {
    const content = document.getElementById('exerciseContent');
    const hint = word.word[0] + '_'.repeat(word.word.length - 1);
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:16px;color:var(--text-dim);margin-bottom:8px">Spell the word that means:</div>
            ${word.definition}
            <div style="font-size:14px;color:var(--text-dim);margin-top:8px">Hint: ${hint} (${word.word.length} letters)</div>
        </div>
        <div class="fill-blank-input">
            <input type="text" id="spellingAnswer" placeholder="Spell the word..." onkeypress="if(event.key==='Enter')checkSpelling()">
            <button class="btn-primary" onclick="checkSpelling()">Check</button>
        </div>
        <div id="questionFeedback"></div>
    `;

    document.getElementById('spellingAnswer').focus();
}

function checkSpelling() {
    const answer = document.getElementById('spellingAnswer').value.trim().toLowerCase();
    const correct = exerciseState.currentWord.word.toLowerCase();

    exerciseState.total++;

    if (answer === correct) {
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `Correct spelling: ${exerciseState.currentWord.word}`);
    }

    updateExerciseScore();
    document.getElementById('spellingAnswer').disabled = true;
    document.querySelector('.fill-blank-input .btn-primary').disabled = true;
}

function generateSynonymMatch(word, allWords) {
    // Pick one correct synonym from the word's synonym list
    const correctSynonym = word.synonyms[Math.floor(Math.random() * word.synonyms.length)];

    // Build wrong options from other words' synonyms (avoid duplicates with the correct word's synonyms)
    const correctSynonymsLower = word.synonyms.map(s => s.toLowerCase());
    const otherSynonyms = [];
    const others = allWords.filter(w => w.id !== word.id && w.synonyms && w.synonyms.length > 0);
    shuffleArray(others);

    for (const other of others) {
        for (const syn of other.synonyms) {
            if (!correctSynonymsLower.includes(syn.toLowerCase()) && !otherSynonyms.includes(syn)) {
                otherSynonyms.push(syn);
            }
            if (otherSynonyms.length >= 3) break;
        }
        if (otherSynonyms.length >= 3) break;
    }

    // If we don't have enough wrong synonyms, pad with other words themselves
    while (otherSynonyms.length < 3) {
        const filler = others[otherSynonyms.length];
        if (filler) {
            otherSynonyms.push(filler.word.toLowerCase());
        } else {
            otherSynonyms.push('---');
        }
    }

    const options = [correctSynonym, ...otherSynonyms.slice(0, 3)];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">Which word is a synonym of "<strong>${word.word}</strong>"?</div>
        <div class="mc-options">
            ${options.map(opt => `
                <div class="mc-option" onclick="checkSynonymMatch(this, '${opt.replace(/'/g, "\\'")}')">${opt}</div>
            `).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkSynonymMatch(el, chosen) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;

    exerciseState.total++;

    const word = exerciseState.currentWord;
    const isCorrect = word.synonyms.some(s => s.toLowerCase() === chosen.toLowerCase());

    document.querySelectorAll('.mc-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
        // Highlight all correct synonyms
        if (word.synonyms.some(s => s.toLowerCase() === opt.textContent.trim().toLowerCase())) {
            opt.classList.add('correct');
        }
    });

    if (isCorrect) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(word.id, true);
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        updateWordScore(word.id, false);
        showQuestionFeedback(false, `Synonyms: ${word.synonyms.join(', ')}`);
    }

    updateExerciseScore();
}

function generateMeaningMatch(word, allWords) {
    const others = allWords.filter(w => w.id !== word.id);
    shuffleArray(others);
    const wrongOptions = others.slice(0, 3).map(w => w.word);
    const options = [word.word, ...wrongOptions];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:16px;color:var(--text-dim);margin-bottom:8px">Which word matches this definition?</div>
            "${word.definition}"
        </div>
        <div class="mc-options">
            ${options.map(opt => `
                <div class="mc-option" onclick="checkMeaningMatch(this, '${opt.replace(/'/g, "\\'")}')">${opt}</div>
            `).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkMeaningMatch(el, chosen) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;

    exerciseState.total++;

    const word = exerciseState.currentWord;
    const isCorrect = chosen.toLowerCase() === word.word.toLowerCase();

    document.querySelectorAll('.mc-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.textContent.trim().toLowerCase() === word.word.toLowerCase()) {
            opt.classList.add('correct');
        }
    });

    if (isCorrect) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(word.id, true);
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        updateWordScore(word.id, false);
        showQuestionFeedback(false, `The answer was: ${word.word}`);
    }

    updateExerciseScore();
}

function generateMatching() {
    const filtered = getFilteredWords();
    shuffleArray(filtered);
    const pairs = filtered.slice(0, Math.min(5, filtered.length));

    const shuffledDefs = [...pairs];
    shuffleArray(shuffledDefs);

    matchingState = { selectedWord: null, pairs, matched: 0, totalPairs: pairs.length };

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="matching-grid">
            <div class="matching-column">
                <h3>Words</h3>
                ${pairs.map(w => `
                    <div class="match-item match-word" data-id="${w.id}" onclick="selectMatchWord(this, ${w.id})">${w.word}</div>
                `).join('')}
            </div>
            <div class="matching-column">
                <h3>Definitions</h3>
                ${shuffledDefs.map(w => `
                    <div class="match-item match-def" data-id="${w.id}" onclick="selectMatchDef(this, ${w.id})">${w.definition}</div>
                `).join('')}
            </div>
        </div>
        <div id="questionFeedback"></div>
    `;
}

function selectMatchWord(el, id) {
    if (el.classList.contains('matched')) return;
    document.querySelectorAll('.match-word').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    matchingState.selectedWord = id;
}

function selectMatchDef(el, id) {
    if (el.classList.contains('matched') || matchingState.selectedWord === null) return;

    exerciseState.total++;

    if (matchingState.selectedWord === id) {
        exerciseState.score++;
        el.classList.add('matched');
        document.querySelector(`.match-word[data-id="${id}"]`).classList.add('matched');
        document.querySelectorAll('.match-word').forEach(e => e.classList.remove('selected'));
        matchingState.matched++;
        updateWordScore(id, true);

        if (matchingState.matched === matchingState.totalPairs) {
            updateExerciseScore();
            showQuestionFeedback(true, 'All matched! Great job!');
            setTimeout(() => {
                const fb = document.getElementById('questionFeedback');
                fb.innerHTML += `<button class="next-question-btn" onclick="generateMatching()">New Round</button>`;
            }, 500);
        }
    } else {
        el.classList.add('wrong-match');
        setTimeout(() => el.classList.remove('wrong-match'), 600);
        updateWordScore(matchingState.selectedWord, false);
        document.querySelectorAll('.match-word').forEach(e => e.classList.remove('selected'));
    }

    matchingState.selectedWord = null;
    updateExerciseScore();
}

function showQuestionFeedback(correct, message) {
    const fb = document.getElementById('questionFeedback');
    fb.innerHTML = `
        <div class="exercise-feedback ${correct ? 'correct' : 'wrong'}">
            ${correct ? 'Correct!' : 'Incorrect.'} ${message || ''}
        </div>
        ${exerciseState.type !== 'matching' ? '<button class="next-question-btn" onclick="generateQuestion()">Next Question</button>' : ''}
    `;
}

function updateWordScore(id, correct) {
    const w = words.find(w => w.id === id);
    if (!w) return;

    if (correct) {
        w.score = Math.min((w.score || 0) + 1, 10);
    } else {
        w.score = Math.max((w.score || 0) - 1, 0);
    }

    if (w.score >= 8) w.status = 'mastered';
    else if (w.score >= 3) w.status = 'learning';
    else w.status = w.score === 0 ? 'new' : 'learning';

    saveWords();
}

// ==================== ADD WORD ====================

function setupAddWordForm() {
    document.getElementById('addWordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addWord();
    });
}

function addWord() {
    const word = document.getElementById('newWord').value.trim();
    const definition = document.getElementById('newDefinition').value.trim();
    const example = document.getElementById('newExample').value.trim();
    const synonyms = document.getElementById('newSynonyms').value.split(',').map(s => s.trim()).filter(Boolean);
    const level = document.getElementById('newLevel').value;
    const partOfSpeech = document.getElementById('newPartOfSpeech').value;

    if (!word || !definition) return;

    if (words.some(w => w.word.toLowerCase() === word.toLowerCase())) {
        showFeedback('Word already exists!', 'error');
        return;
    }

    const maxId = words.reduce((max, w) => Math.max(max, w.id || 0), 0);

    words.push({
        id: maxId + 1,
        word,
        definition,
        example,
        synonyms,
        level,
        partOfSpeech,
        status: 'new',
        score: 0
    });

    saveWords();
    showFeedback(`"${word}" added successfully!`, 'success');
    document.getElementById('addWordForm').reset();
    updateImportPreview();
}

function bulkAddWords() {
    const text = document.getElementById('bulkImport').value.trim();
    if (!text) return;

    const lines = text.split('\n').filter(Boolean);
    let added = 0;
    let maxId = words.reduce((max, w) => Math.max(max, w.id || 0), 0);

    lines.forEach(line => {
        const parts = line.split('|').map(s => s.trim());
        if (parts.length < 2) return;

        const [word, definition, example, synonyms, level] = parts;
        if (words.some(w => w.word.toLowerCase() === word.toLowerCase())) return;

        maxId++;
        words.push({
            id: maxId,
            word,
            definition,
            example: example || '',
            synonyms: synonyms ? synonyms.split(',').map(s => s.trim()) : [],
            level: ['beginner', 'intermediate', 'advanced', 'expert'].includes(level) ? level : 'beginner',
            partOfSpeech: '',
            status: 'new',
            score: 0
        });
        added++;
    });

    saveWords();
    document.getElementById('bulkImport').value = '';
    showFeedback(`Imported ${added} word(s)!`, added > 0 ? 'success' : 'error');
    updateImportPreview();
}

function showFeedback(msg, type) {
    const el = document.getElementById('addWordFeedback');
    el.textContent = msg;
    el.className = `feedback-msg ${type}`;
    setTimeout(() => { el.textContent = ''; el.className = 'feedback-msg'; }, 3000);
}

// ==================== IMPORT PREVIEW ====================

function updateImportPreview() {
    const textarea = document.getElementById('importPreviewText');
    if (!textarea) return;

    const lines = words.map(w =>
        `${w.word} | ${w.definition} | ${w.example || ''} | ${(w.synonyms || []).join(', ')} | ${w.level}`
    );
    textarea.value = lines.join('\n');
}

function copyImportPreview() {
    const textarea = document.getElementById('importPreviewText');
    if (!textarea) return;

    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.getElementById('copyPreviewBtn');
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 2000);
    }).catch(() => {
        // Fallback
        document.execCommand('copy');
    });
}

// ==================== EXPORT ====================

function showExportMenu() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML = `
        <div class="modal">
            <h2>Export Words</h2>
            <p style="color:var(--text-secondary);margin-bottom:18px;font-size:14px">Choose a format to export your ${words.length} words.</p>
            <div class="action-buttons">
                <button class="action-btn" onclick="exportJSON(); this.closest('.modal-overlay').remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    JSON File
                </button>
                <button class="action-btn" onclick="exportCSV(); this.closest('.modal-overlay').remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
                    CSV Spreadsheet
                </button>
                <button class="action-btn" onclick="exportText(); this.closest('.modal-overlay').remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Plain Text
                </button>
                <button class="action-btn" onclick="exportPipe(); this.closest('.modal-overlay').remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    Pipe Format (re-importable)
                </button>
            </div>
            <div class="modal-buttons">
                <button class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function exportJSON() {
    const data = words.map(w => ({
        word: w.word,
        definition: w.definition,
        example: w.example || '',
        synonyms: w.synonyms || [],
        level: w.level,
        partOfSpeech: w.partOfSpeech || '',
        status: w.status,
        score: w.score
    }));
    downloadFile('vocabmaster-words.json', JSON.stringify(data, null, 2), 'application/json');
}

function exportCSV() {
    const header = 'Word,Definition,Example,Synonyms,Level,Part of Speech,Status,Score';
    const rows = words.map(w => {
        const escape = (s) => '"' + (s || '').replace(/"/g, '""') + '"';
        return [
            escape(w.word),
            escape(w.definition),
            escape(w.example),
            escape((w.synonyms || []).join('; ')),
            escape(w.level),
            escape(w.partOfSpeech),
            escape(w.status),
            w.score || 0
        ].join(',');
    });
    downloadFile('vocabmaster-words.csv', header + '\n' + rows.join('\n'), 'text/csv');
}

function exportText() {
    const lines = words.map(w => {
        let text = `${w.word} (${w.level})\n  ${w.definition}`;
        if (w.example) text += `\n  Example: "${w.example}"`;
        if (w.synonyms && w.synonyms.length) text += `\n  Synonyms: ${w.synonyms.join(', ')}`;
        return text;
    });
    downloadFile('vocabmaster-words.txt', lines.join('\n\n'), 'text/plain');
}

function exportPipe() {
    const lines = words.map(w =>
        `${w.word} | ${w.definition} | ${w.example || ''} | ${(w.synonyms || []).join(', ')} | ${w.level}`
    );
    downloadFile('vocabmaster-words-import.txt', lines.join('\n'), 'text/plain');
}

// ==================== UTILITIES ====================

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Keyboard shortcuts for flashcards
document.addEventListener('keydown', (e) => {
    const activePage = document.querySelector('.page.active');
    if (!activePage || activePage.id !== 'page-flashcards') return;

    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipCard();
    } else if (e.key === 'ArrowRight') {
        nextFlashcard();
    } else if (e.key === 'ArrowLeft') {
        prevFlashcard();
    } else if (e.key === '1') {
        rateCard('bad');
    } else if (e.key === '2') {
        rateCard('ok');
    } else if (e.key === '3') {
        rateCard('good');
    }
});

// ==================== PWA ICON ====================

// Generate PNG apple-touch-icon dynamically (iOS doesn't support SVG icons)
(function generateAppleTouchIcon() {
    const canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');
    const s = 180, r = 35;

    const grad = ctx.createLinearGradient(0, 0, s, s);
    grad.addColorStop(0, '#346739');
    grad.addColorStop(1, '#79AE6F');

    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(s - r, 0);
    ctx.quadraticCurveTo(s, 0, s, r);
    ctx.lineTo(s, s - r);
    ctx.quadraticCurveTo(s, s, s - r, s);
    ctx.lineTo(r, s);
    ctx.quadraticCurveTo(0, s, 0, s - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.fillStyle = '#F2EDC2';
    ctx.font = 'bold 78px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VM', s / 2, s / 2 + 3);

    const link = document.querySelector('link[rel="apple-touch-icon"]');
    if (link) link.href = canvas.toDataURL('image/png');
})();

// Init
init();
