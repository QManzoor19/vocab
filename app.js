// ==================== DATA ====================

const DEFAULT_WORDS = [
    // Beginner
    { word: "Abandon", definition: "To leave behind or give up completely", example: "She had to _ her old habits to start fresh.", synonyms: ["forsake", "desert", "relinquish"], level: "beginner", partOfSpeech: "verb", status: "new", score: 0 },
    { word: "Benevolent", definition: "Well-meaning and kindly", example: "The _ old man donated to every charity in town.", synonyms: ["kind", "generous", "charitable"], level: "beginner", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Candid", definition: "Truthful and straightforward; frank", example: "She gave a _ assessment of the situation.", synonyms: ["honest", "frank", "open"], level: "beginner", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Diligent", definition: "Having or showing care and effort in one's work", example: "The _ student always completed her assignments early.", synonyms: ["hardworking", "industrious", "meticulous"], level: "beginner", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing", example: "The speaker gave an _ speech that moved the audience.", synonyms: ["articulate", "expressive", "persuasive"], level: "beginner", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Frugal", definition: "Sparing or economical with money or resources", example: "Living a _ lifestyle helped them save for retirement.", synonyms: ["thrifty", "economical", "prudent"], level: "beginner", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Gratitude", definition: "The quality of being thankful", example: "She expressed her _ with a heartfelt letter.", synonyms: ["thankfulness", "appreciation", "gratefulness"], level: "beginner", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Hinder", definition: "To create difficulties, resulting in delay", example: "Bad weather could _ our travel plans.", synonyms: ["obstruct", "impede", "hamper"], level: "beginner", partOfSpeech: "verb", status: "new", score: 0 },

    // Intermediate
    { word: "Ambiguous", definition: "Open to more than one interpretation; unclear", example: "The contract language was deliberately _.", synonyms: ["vague", "unclear", "equivocal"], level: "intermediate", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Brevity", definition: "Concise and exact use of words in speech or writing", example: "The _ of his report was appreciated by the busy executives.", synonyms: ["conciseness", "succinctness", "terseness"], level: "intermediate", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Coalesce", definition: "Come together to form one mass or whole", example: "The small groups began to _ into a unified movement.", synonyms: ["merge", "unite", "fuse"], level: "intermediate", partOfSpeech: "verb", status: "new", score: 0 },
    { word: "Dichotomy", definition: "A division into two contrasting things", example: "There is a clear _ between theory and practice.", synonyms: ["division", "split", "contrast"], level: "intermediate", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Enumerate", definition: "To mention things one by one", example: "She began to _ the reasons for her decision.", synonyms: ["list", "catalog", "itemize"], level: "intermediate", partOfSpeech: "verb", status: "new", score: 0 },
    { word: "Futile", definition: "Incapable of producing any useful result; pointless", example: "It was _ to argue with someone so stubborn.", synonyms: ["useless", "pointless", "fruitless"], level: "intermediate", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Gregarious", definition: "Fond of company; sociable", example: "Her _ nature made her the life of every party.", synonyms: ["sociable", "outgoing", "convivial"], level: "intermediate", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Hypothesis", definition: "A proposed explanation based on limited evidence", example: "The scientist tested her _ through a series of experiments.", synonyms: ["theory", "proposition", "assumption"], level: "intermediate", partOfSpeech: "noun", status: "new", score: 0 },

    // Advanced
    { word: "Ameliorate", definition: "To make something bad or unsatisfactory better", example: "The new policies were designed to _ living conditions.", synonyms: ["improve", "enhance", "better"], level: "advanced", partOfSpeech: "verb", status: "new", score: 0 },
    { word: "Bellicose", definition: "Demonstrating aggression and willingness to fight", example: "The _ rhetoric from both sides escalated the conflict.", synonyms: ["aggressive", "combative", "pugnacious"], level: "advanced", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Cacophony", definition: "A harsh, discordant mixture of sounds", example: "The _ of car horns filled the crowded street.", synonyms: ["discord", "dissonance", "racket"], level: "advanced", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Deleterious", definition: "Causing harm or damage", example: "Smoking has _ effects on your health.", synonyms: ["harmful", "damaging", "detrimental"], level: "advanced", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Ephemeral", definition: "Lasting for a very short time", example: "The beauty of cherry blossoms is _.", synonyms: ["fleeting", "transient", "momentary"], level: "advanced", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Fastidious", definition: "Very attentive to accuracy and detail", example: "She was _ about keeping her workspace organized.", synonyms: ["meticulous", "particular", "scrupulous"], level: "advanced", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Garrulous", definition: "Excessively talkative, especially on trivial matters", example: "The _ neighbor kept them at the door for an hour.", synonyms: ["talkative", "loquacious", "verbose"], level: "advanced", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Hegemony", definition: "Leadership or dominance of one group over others", example: "The country's economic _ influenced global markets.", synonyms: ["dominance", "supremacy", "authority"], level: "advanced", partOfSpeech: "noun", status: "new", score: 0 },

    // Expert
    { word: "Abnegation", definition: "The act of renouncing or rejecting something", example: "His _ of worldly pleasures led to a monastic life.", synonyms: ["renunciation", "self-denial", "abstinence"], level: "expert", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Blandishment", definition: "A flattering or pleasing statement used to persuade", example: "No amount of _ could change her mind.", synonyms: ["flattery", "cajolery", "coaxing"], level: "expert", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Casuistry", definition: "The use of clever but unsound reasoning", example: "The lawyer's _ failed to convince the jury.", synonyms: ["sophistry", "speciousness", "fallacy"], level: "expert", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Defenestration", definition: "The act of throwing someone out of a window", example: "The _ of Prague was a pivotal event in European history.", synonyms: ["ejection", "expulsion"], level: "expert", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Effulgent", definition: "Shining brightly; radiant", example: "The _ sunset painted the sky in gold and crimson.", synonyms: ["radiant", "luminous", "resplendent"], level: "expert", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Floccinaucinihilipilification", definition: "The estimation of something as valueless", example: "His _ of modern art was well known among critics.", synonyms: ["depreciation", "belittlement"], level: "expert", partOfSpeech: "noun", status: "new", score: 0 },
    { word: "Grandiloquent", definition: "Pompous or extravagant in language or style", example: "The politician's _ speeches impressed few voters.", synonyms: ["pompous", "bombastic", "pretentious"], level: "expert", partOfSpeech: "adjective", status: "new", score: 0 },
    { word: "Hermeneutic", definition: "Relating to interpretation, especially of texts", example: "The professor took a _ approach to analyzing the ancient manuscript.", synonyms: ["interpretive", "explanatory", "exegetical"], level: "expert", partOfSpeech: "adjective", status: "new", score: 0 },
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
}

// ==================== DASHBOARD ====================

function updateDashboard() {
    const total = words.length;
    const mastered = words.filter(w => w.status === 'mastered').length;
    const learning = words.filter(w => w.status === 'learning').length;

    document.getElementById('totalWords').textContent = total;
    document.getElementById('masteredWords').textContent = mastered;
    document.getElementById('learningWords').textContent = learning;

    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const maxCount = Math.max(...levels.map(l => words.filter(w => w.level === l).length), 1);

    levels.forEach(level => {
        const count = words.filter(w => w.level === level).length;
        document.getElementById(`count-${level}`).textContent = count;
        document.getElementById(`bar-${level}`).style.width = `${(count / maxCount) * 100}%`;
    });
}

// ==================== WORD LIST ====================

function setupFilters() {
    document.getElementById('searchWords').addEventListener('input', renderWordList);
    document.getElementById('wordlistLevel').addEventListener('change', renderWordList);
    document.getElementById('wordlistStatus').addEventListener('change', renderWordList);
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

    return filtered;
}

function renderWordList() {
    const search = document.getElementById('searchWords').value.toLowerCase();
    const level = document.getElementById('wordlistLevel').value;
    const status = document.getElementById('wordlistStatus').value;
    const globalLevel = document.getElementById('globalLevelFilter').value;

    let filtered = words.filter(w => {
        if (search && !w.word.toLowerCase().includes(search) && !w.definition.toLowerCase().includes(search)) return false;
        if (level !== 'all' && w.level !== level) return false;
        if (status !== 'all' && w.status !== status) return false;
        if (globalLevel !== 'all' && w.level !== globalLevel) return false;
        return true;
    });

    const container = document.getElementById('wordlistContainer');

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-dim)">No words found. Add some!</div>';
        return;
    }

    container.innerHTML = filtered.map(w => `
        <div class="word-card" onclick="showWordDetail(${w.id})">
            <div class="word-name">${w.word}</div>
            <div class="word-def">${w.definition}</div>
            <span class="word-level-badge badge-${w.level}">${w.level}</span>
            <span class="word-status-badge badge-${w.status}">${w.status}</span>
            <div class="word-actions">
                <button onclick="event.stopPropagation(); editWord(${w.id})" title="Edit">&#9998;</button>
                <button class="delete-btn" onclick="event.stopPropagation(); deleteWord(${w.id})" title="Delete">&#10006;</button>
            </div>
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

    flashcardDeck = words.filter(w => {
        if (level !== 'all' && w.level !== level) return false;
        if (globalLevel !== 'all' && w.level !== globalLevel) return false;
        return true;
    });

    currentFlashcardIndex = 0;
    showFlashcard();

    document.getElementById('flashcardLevel').onchange = setupFlashcards;
    document.getElementById('shuffleCards').onclick = () => {
        shuffleArray(flashcardDeck);
        currentFlashcardIndex = 0;
        showFlashcard();
    };
}

function showFlashcard() {
    const card = document.getElementById('flashcard');
    card.classList.remove('flipped');

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

    const titles = {
        'multiple-choice': 'Multiple Choice',
        'fill-blank': 'Fill in the Blank',
        'matching': 'Matching',
        'spelling': 'Spelling'
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
    const word = filtered[Math.floor(Math.random() * filtered.length)];
    exerciseState.currentWord = word;

    if (exerciseState.type === 'multiple-choice') {
        generateMultipleChoice(word, filtered);
    } else if (exerciseState.type === 'fill-blank') {
        generateFillBlank(word);
    } else if (exerciseState.type === 'spelling') {
        generateSpelling(word);
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
        showFeedback('This word already exists!', 'error');
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
}

function showFeedback(msg, type) {
    const el = document.getElementById('addWordFeedback');
    el.textContent = msg;
    el.className = `feedback-msg ${type}`;
    setTimeout(() => { el.textContent = ''; el.className = 'feedback-msg'; }, 3000);
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
