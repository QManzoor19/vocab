// ==================== DATA ====================

// Words loaded from words-data.js


// ==================== STATE ====================

let words = [];
let currentFlashcardIndex = 0;
let flashcardDeck = [];
let exerciseState = { type: null, score: 0, total: 0, currentWord: null };
let matchingState = { selectedWord: null, pairs: [], matched: 0 };

// ==================== INIT ====================

function init() {
    loadWords();
    loadLists();
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
        // Update existing words with new fields (category, origin, spaced repetition) from defaults
        const defaultMap = {};
        DEFAULT_WORDS.forEach(dw => { defaultMap[dw.word.toLowerCase()] = dw; });
        words.forEach(w => {
            const dw = defaultMap[w.word.toLowerCase()];
            if (dw) {
                if (!w.category && dw.category) w.category = dw.category;
                if (!w.origin && dw.origin) w.origin = dw.origin;
                added++;
            }
            // Ensure spaced repetition fields exist
            if (w.lastReviewed === undefined) w.lastReviewed = null;
            if (w.nextReview === undefined) w.nextReview = null;
            if (w.interval === undefined) w.interval = 1;
        });
        if (added > 0) saveWords();
    } else {
        words = DEFAULT_WORDS.map((w, i) => ({ ...w, id: i + 1, lastReviewed: null, nextReview: null, interval: 1 }));
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
    if (page === 'lists') renderLists();
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

    updateDailyGoal();
    renderDueWords();

    if (typeof renderDashCards === 'function') renderDashCards();
}

// ==================== WORD LIST ====================

function setupFilters() {
    document.getElementById('searchWords').addEventListener('input', renderWordList);
    document.getElementById('wordlistLevel').addEventListener('change', renderWordList);
    document.getElementById('wordlistStatus').addEventListener('change', renderWordList);
    document.getElementById('wordlistSort').addEventListener('change', renderWordList);
    document.getElementById('wordlistLetter').addEventListener('change', renderWordList);
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

    // Exercise list filter
    const exListEl = document.getElementById('exerciseList');
    if (exListEl && exListEl.value !== 'all') {
        const list = customLists.find(l => l.id === parseInt(exListEl.value));
        if (list) {
            const ids = new Set(list.wordIds);
            filtered = filtered.filter(w => ids.has(w.id));
        }
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
        populateBulkListDropdown();
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

function populateBulkListDropdown() {
    const sel = document.getElementById('bulkList');
    if (!sel) return;
    sel.innerHTML = '<option value="">Add to List...</option>';
    customLists.forEach(l => {
        sel.innerHTML += `<option value="${l.id}">${l.name}</option>`;
    });
}

function bulkAddToList() {
    const listId = parseInt(document.getElementById('bulkList').value);
    if (!listId) return;
    const list = customLists.find(l => l.id === listId);
    if (!list) return;
    let added = 0;
    selectedIds.forEach(id => {
        if (!list.wordIds.includes(id)) {
            list.wordIds.push(id);
            added++;
        }
    });
    saveLists();
    selectedIds.clear();
    document.getElementById('bulkList').value = '';
    updateSelectBar();
    renderWordList();
    alert(`Added ${added} word(s) to "${list.name}"`);
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
    const letter = document.getElementById('wordlistLetter').value;

    let filtered = words.filter(w => {
        if (search && !w.word.toLowerCase().includes(search) && !w.definition.toLowerCase().includes(search)) return false;
        if (level !== 'all' && w.level !== level) return false;
        if (status !== 'all' && w.status !== status) return false;
        if (globalLevel !== 'all' && w.level !== globalLevel) return false;
        if (letter !== 'all' && w.word.charAt(0).toUpperCase() !== letter) return false;
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

function getWordDetails(word) {
    if (typeof WORD_DETAILS !== 'undefined' && WORD_DETAILS[word]) {
        const d = WORD_DETAILS[word];
        return { etymology: d.e || '', usage: d.u || '', related: d.r || [] };
    }
    return { etymology: '', usage: '', related: [] };
}

function showWordDetail(id) {
    const w = words.find(w => w.id === id);
    if (!w) return;

    // Load detail data lazily
    const det = getWordDetails(w.word);

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    const listOptions = customLists.length > 0
        ? customLists.map(l => {
            const alreadyIn = l.wordIds.includes(w.id);
            return `<option value="${l.id}" ${alreadyIn ? 'disabled' : ''}>${l.name}${alreadyIn ? ' (added)' : ''}</option>`;
        }).join('')
        : '<option value="" disabled>No lists yet</option>';

    overlay.innerHTML = `
        <div class="modal">
            <h2>${w.word}
                <button style="background:none;border:none;cursor:pointer;color:var(--text-light);vertical-align:middle;margin-left:8px" onclick="event.stopPropagation(); pronounceWord('${w.word.replace(/'/g, "\\'")}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
            </h2>
            <p style="color:var(--text-dim);margin-bottom:4px;font-size:13px">${w.partOfSpeech || ''} &bull; <span class="badge-${w.level}" style="padding:2px 8px;border-radius:10px;font-size:11px">${w.level}</span></p>
            <p style="font-size:16px;margin:16px 0">${w.definition}</p>
            ${w.example ? `<p style="color:var(--text-dim);font-style:italic;margin-bottom:12px">"${w.example.replace('_', '<strong style="color:var(--accent)">' + w.word + '</strong>')}"</p>` : ''}
            ${w.synonyms && w.synonyms.length ? `<p style="font-size:13px;color:var(--accent)">Synonyms: ${w.synonyms.join(', ')}</p>` : ''}
            ${det.etymology ? `<div style="margin-top:14px;padding:10px 14px;background:rgba(121,174,111,0.08);border-radius:8px;border-left:3px solid #79AE6F"><p style="font-size:11px;font-weight:700;color:#79AE6F;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Etymology</p><p style="font-size:13px;color:var(--text-secondary);line-height:1.5">${det.etymology}</p></div>` : ''}
            ${det.usage ? `<div style="margin-top:10px;padding:10px 14px;background:rgba(242,237,194,0.08);border-radius:8px;border-left:3px solid #F2EDC2"><p style="font-size:11px;font-weight:700;color:#F2EDC2;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Usage</p><p style="font-size:13px;color:var(--text-secondary);line-height:1.5">${det.usage}</p></div>` : ''}
            ${det.related.length ? `<p style="font-size:13px;color:var(--text-light);margin-top:10px">Related: ${det.related.join(', ')}</p>` : ''}
            ${w.origin ? `<p style="font-size:12px;color:var(--text-light);margin-top:6px;text-transform:capitalize">Origin: ${w.origin}</p>` : ''}
            <p style="margin-top:12px;font-size:13px;color:var(--text-dim)">Status: ${w.status} &bull; Score: ${w.score}</p>
            <div class="add-to-list-dropdown">
                <select id="addToListSelect">
                    <option value="">Add to list...</option>
                    ${listOptions}
                </select>
                <button class="btn-outline" onclick="const sel = document.getElementById('addToListSelect'); if(sel.value) { addToList(parseInt(sel.value), ${w.id}); this.closest('.modal-overlay').remove(); showWordDetail(${w.id}); }" style="padding:6px 12px;font-size:13px">Add</button>
            </div>
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

function populateFlashcardListFilter() {
    const sel = document.getElementById('flashcardList');
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="all">All Words</option>';
    customLists.forEach(l => {
        sel.innerHTML += `<option value="${l.id}">${l.name} (${l.wordIds.length})</option>`;
    });
    sel.value = current || 'all';
}

let defFirstMode = false;

function toggleDefFirst() {
    defFirstMode = !defFirstMode;
    const btn = document.getElementById('defFirstBtn');
    if (btn) btn.classList.toggle('active', defFirstMode);
    showFlashcard();
}

function setupFlashcards() {
    populateFlashcardListFilter();
    const level = document.getElementById('flashcardLevel').value;
    const globalLevel = document.getElementById('globalLevelFilter').value;
    const status = document.getElementById('flashcardStatus').value;
    const letter = document.getElementById('flashcardLetter').value;
    const listId = document.getElementById('flashcardList').value;

    let listWordIds = null;
    if (listId !== 'all') {
        const list = customLists.find(l => l.id === parseInt(listId));
        if (list) listWordIds = new Set(list.wordIds);
    }

    flashcardDeck = words.filter(w => {
        if (listWordIds && !listWordIds.has(w.id)) return false;
        if (level !== 'all' && w.level !== level) return false;
        if (globalLevel !== 'all' && w.level !== globalLevel) return false;
        if (status !== 'all' && (w.status || '') !== status) return false;
        if (letter !== 'all' && w.word.charAt(0).toUpperCase() !== letter) return false;
        return true;
    });

    currentFlashcardIndex = 0;
    showFlashcard();

    document.getElementById('flashcardLevel').onchange = setupFlashcards;
    document.getElementById('flashcardStatus').onchange = setupFlashcards;
    document.getElementById('flashcardLetter').onchange = setupFlashcards;
    document.getElementById('flashcardList').onchange = setupFlashcards;
    document.getElementById('shuffleCards').onclick = () => {
        shuffleArray(flashcardDeck);
        currentFlashcardIndex = 0;
        showFlashcard();
    };
}

function toggleFullscreen() {
    const page = document.getElementById('page-flashcards');
    const topbar = document.getElementById('topbar');
    page.classList.toggle('flashcard-fullscreen');
    if (page.classList.contains('flashcard-fullscreen')) {
        topbar.style.display = 'none';
        document.body.style.overflow = 'hidden';
    } else {
        topbar.style.display = '';
        document.body.style.overflow = '';
    }
}

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
    if (defFirstMode) {
        // Front shows definition, back shows word
        document.getElementById('cardWord').textContent = w.definition;
        document.getElementById('cardLevel').textContent = w.level;
        document.getElementById('cardLevel').className = `card-level-badge badge-${w.level}`;
        document.getElementById('cardDefinition').textContent = w.word;
        document.getElementById('cardExample').textContent = w.example ? `"${w.example.replace('_', '___')}"` : '';
        document.getElementById('cardSynonym').textContent = w.synonyms && w.synonyms.length ? `Synonyms: ${w.synonyms.join(', ')}` : '';
    } else {
        document.getElementById('cardWord').textContent = w.word;
        document.getElementById('cardLevel').textContent = w.level;
        document.getElementById('cardLevel').className = `card-level-badge badge-${w.level}`;
        document.getElementById('cardDefinition').textContent = w.definition;
        document.getElementById('cardExample').textContent = w.example ? `"${w.example.replace('_', '___')}"` : '';
        document.getElementById('cardSynonym').textContent = w.synonyms && w.synonyms.length ? `Synonyms: ${w.synonyms.join(', ')}` : '';
    }
    document.getElementById('cardCounter').textContent = `${currentFlashcardIndex + 1} / ${flashcardDeck.length}`;
    renderDeckList();
}

function renderDeckList() {
    const container = document.getElementById('deckWordList');
    const countEl = document.getElementById('deckListCount');
    if (!container) return;

    countEl.textContent = `${flashcardDeck.length} words`;

    if (flashcardDeck.length === 0) {
        container.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-light)">No words match filters</div>';
        return;
    }

    const sorted = [...flashcardDeck].sort((a, b) => a.word.localeCompare(b.word));
    container.innerHTML = sorted.map(w => {
        const isCurrent = flashcardDeck[currentFlashcardIndex] && w.id === flashcardDeck[currentFlashcardIndex].id;
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:var(--radius-xs);cursor:pointer;font-size:13px;${isCurrent ? 'background:var(--accent-bg);border-left:3px solid var(--accent)' : 'border-left:3px solid transparent'}" onclick="jumpToFlashcard(${w.id})">
            <span style="font-weight:700;min-width:100px;color:${isCurrent ? 'var(--accent)' : 'var(--text)'}">${w.word}</span>
            <span style="color:var(--text-secondary);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${w.definition}</span>
            <span class="word-level-badge badge-${w.level}" style="font-size:10px;padding:2px 8px">${w.level}</span>
        </div>`;
    }).join('');
}

function jumpToFlashcard(id) {
    const idx = flashcardDeck.findIndex(w => w.id === id);
    if (idx !== -1) {
        currentFlashcardIndex = idx;
        showFlashcard();
    }
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

    const isCorrect = (rating === 'good' || rating === 'ok');

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

    // Spaced repetition
    applySpacedRepetition(original, isCorrect);

    // Daily activity
    recordDailyActivity(original.id);

    saveWords();
    nextFlashcard();
}

// ==================== EXERCISES ====================

function populateExerciseListFilter() {
    const sel = document.getElementById('exerciseList');
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="all">All Words</option>';
    customLists.forEach(l => {
        sel.innerHTML += `<option value="${l.id}">${l.name} (${l.wordIds.length})</option>`;
    });
    sel.value = current || 'all';
}

function resetExerciseView() {
    populateExerciseListFilter();
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
        'meaning-match': 'Meaning Match',
        'true-false': 'True or False',
        'example-fill': 'Context Clues',
        'antonym-pick': 'Odd One Out',
        'word-scramble': 'Word Scramble',
        'speed-round': 'Speed Round',
        'first-letter': 'First Letter',
        'category-sort': 'Category Sort',
        'definition-write': 'Write the Definition',
        'origin-guess': 'Guess the Origin',
        'word-chain': 'Word Chain'
    };
    document.getElementById('exerciseTitle').textContent = titles[type];
    updateExerciseScore();

    if (type === 'matching') {
        generateMatching();
    } else if (type === 'speed-round') {
        startSpeedRound();
    } else {
        generateQuestion();
    }
}

function endExercise() {
    if (speedTimer) { clearInterval(speedTimer); speedTimer = null; }
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
    } else if (exerciseState.type === 'true-false') {
        generateTrueFalse(word, filtered);
    } else if (exerciseState.type === 'example-fill') {
        generateExampleFill(word, filtered);
    } else if (exerciseState.type === 'antonym-pick') {
        generateOddOneOut(filtered);
    } else if (exerciseState.type === 'word-scramble') {
        generateWordScramble(word);
    } else if (exerciseState.type === 'first-letter') {
        generateFirstLetter(word);
    } else if (exerciseState.type === 'category-sort') {
        generateCategorySort(filtered);
    } else if (exerciseState.type === 'definition-write') {
        generateDefinitionWrite(word);
    } else if (exerciseState.type === 'origin-guess') {
        generateOriginGuess(word);
    } else if (exerciseState.type === 'word-chain') {
        generateWordChain(filtered);
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

    // Spaced repetition
    applySpacedRepetition(w, correct);

    // Daily activity
    recordDailyActivity(w.id);

    saveWords();
}

// ==================== NEW EXERCISES ====================

function generateTrueFalse(word, allWords) {
    const isTrue = Math.random() > 0.5;
    let shownDef = word.definition;
    if (!isTrue) {
        const others = allWords.filter(w => w.id !== word.id);
        shownDef = others[Math.floor(Math.random() * others.length)].definition;
    }

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:12px">Does this definition match the word?</div>
            <strong style="font-size:24px">${word.word}</strong>
            <div style="margin-top:16px;font-size:17px;color:var(--text-secondary)">"${shownDef}"</div>
        </div>
        <div class="mc-options">
            <div class="mc-option" onclick="checkTrueFalse(this, true, ${isTrue})">True</div>
            <div class="mc-option" onclick="checkTrueFalse(this, false, ${isTrue})">False</div>
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkTrueFalse(el, picked, actual) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;
    exerciseState.total++;
    document.querySelectorAll('.mc-option').forEach(o => o.style.pointerEvents = 'none');
    const correct = (picked === actual);
    if (correct) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `The statement was ${actual ? 'True' : 'False'}`);
    }
    updateExerciseScore();
}

function generateExampleFill(word, allWords) {
    const sentence = word.example || `The word _ means ${word.definition.toLowerCase()}.`;
    const others = allWords.filter(w => w.id !== word.id);
    shuffleArray(others);
    const options = [word.word, ...others.slice(0, 3).map(w => w.word)];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">Which word fits?</div>
            <div style="font-size:18px;line-height:1.6">${sentence.replace('_', '________')}</div>
        </div>
        <div class="mc-options">
            ${options.map(opt => `<div class="mc-option" onclick="checkExampleFill(this, '${opt.replace(/'/g, "\\'")}')">${opt}</div>`).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkExampleFill(el, picked) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;
    exerciseState.total++;
    document.querySelectorAll('.mc-option').forEach(o => {
        o.style.pointerEvents = 'none';
        if (o.textContent === exerciseState.currentWord.word) o.classList.add('correct');
    });
    if (picked === exerciseState.currentWord.word) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `The answer was: ${exerciseState.currentWord.word}`);
    }
    updateExerciseScore();
}

function generateOddOneOut(allWords) {
    // Pick 3 words with similar level, 1 from different level
    const word = allWords[Math.floor(Math.random() * allWords.length)];
    exerciseState.currentWord = word;
    const sameLvl = allWords.filter(w => w.level === word.level && w.id !== word.id);
    shuffleArray(sameLvl);
    const group = sameLvl.slice(0, 2);
    const diffLvl = allWords.filter(w => w.level !== word.level);
    const odd = diffLvl[Math.floor(Math.random() * diffLvl.length)];
    const options = [...group.map(w => ({ word: w.word, odd: false })), { word: word.word, odd: false }, { word: odd.word, odd: true }];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">These words are all <strong>${word.level}</strong> level except one.</div>
            Which word doesn't belong?
        </div>
        <div class="mc-options">
            ${options.map(o => `<div class="mc-option" onclick="checkOddOneOut(this, ${o.odd})">${o.word}</div>`).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkOddOneOut(el, isOdd) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;
    exerciseState.total++;
    document.querySelectorAll('.mc-option').forEach(o => o.style.pointerEvents = 'none');
    if (isOdd) {
        el.classList.add('correct');
        exerciseState.score++;
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        document.querySelectorAll('.mc-option').forEach(o => {
            if (o.onclick && o.onclick.toString().includes('true')) o.classList.add('correct');
        });
        showQuestionFeedback(false);
    }
    updateExerciseScore();
}

function generateWordScramble(word) {
    const letters = word.word.split('');
    let scrambled;
    do {
        scrambled = [...letters];
        shuffleArray(scrambled);
    } while (scrambled.join('') === word.word && word.word.length > 1);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">Unscramble this word:</div>
            <div style="font-size:32px;font-weight:800;letter-spacing:6px;font-family:monospace;color:var(--accent)">${scrambled.join('').toUpperCase()}</div>
            <div style="font-size:14px;color:var(--text-light);margin-top:12px">Hint: ${word.definition}</div>
        </div>
        <div class="fill-blank-input">
            <input type="text" id="scrambleAnswer" placeholder="Type the word..." onkeypress="if(event.key==='Enter')checkWordScramble()">
            <button class="btn-primary" onclick="checkWordScramble()">Check</button>
        </div>
        <div id="questionFeedback"></div>
    `;
    document.getElementById('scrambleAnswer').focus();
}

function checkWordScramble() {
    const answer = document.getElementById('scrambleAnswer').value.trim().toLowerCase();
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
    document.getElementById('scrambleAnswer').disabled = true;
    document.querySelector('.fill-blank-input .btn-primary').disabled = true;
}

let speedTimer = null;

function startSpeedRound() {
    exerciseState.score = 0;
    exerciseState.total = 0;
    let timeLeft = 60;
    const content = document.getElementById('exerciseContent');

    function renderSpeedQuestion() {
        const filtered = getFilteredWords();
        const word = filtered[Math.floor(Math.random() * filtered.length)];
        exerciseState.currentWord = word;
        const others = filtered.filter(w => w.id !== word.id);
        shuffleArray(others);
        const options = [word.definition, ...others.slice(0, 3).map(w => w.definition)];
        shuffleArray(options);

        content.innerHTML = `
            <div style="text-align:center;margin-bottom:16px">
                <span style="font-size:28px;font-weight:900;color:var(--accent)">${timeLeft}s</span>
            </div>
            <div class="mc-question" style="padding:14px">
                <strong style="font-size:22px">${word.word}</strong>
            </div>
            <div class="mc-options">
                ${options.map(opt => `<div class="mc-option" onclick="checkSpeedAnswer(this, ${opt === word.definition})">${opt}</div>`).join('')}
            </div>
        `;
    }

    renderSpeedQuestion();

    clearInterval(speedTimer);
    speedTimer = setInterval(() => {
        timeLeft--;
        const timerEl = content.querySelector('span');
        if (timerEl) timerEl.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(speedTimer);
            endExercise();
        }
    }, 1000);

    window._speedNext = renderSpeedQuestion;
}

function checkSpeedAnswer(el, correct) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;
    exerciseState.total++;
    if (correct) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
    } else {
        el.classList.add('wrong');
        updateWordScore(exerciseState.currentWord.id, false);
    }
    updateExerciseScore();
    setTimeout(() => {
        if (window._speedNext) window._speedNext();
    }, 400);
}

// --- First Letter: definition shown, type word knowing first letter ---
function generateFirstLetter(word) {
    const first = word.word[0].toUpperCase();
    const blanks = first + ' _ '.repeat(word.word.length - 1).trim();
    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">The word starts with <strong style="font-size:22px;color:var(--accent)">${first}</strong> and has <strong>${word.word.length}</strong> letters</div>
            <div style="font-size:18px;margin-top:12px">${word.definition}</div>
        </div>
        <div class="fill-blank-input">
            <input type="text" id="firstLetterAnswer" placeholder="${blanks}" onkeypress="if(event.key==='Enter')checkFirstLetter()">
            <button class="btn-primary" onclick="checkFirstLetter()">Check</button>
        </div>
        <div id="questionFeedback"></div>
    `;
    document.getElementById('firstLetterAnswer').focus();
}

function checkFirstLetter() {
    const answer = document.getElementById('firstLetterAnswer').value.trim().toLowerCase();
    exerciseState.total++;
    if (answer === exerciseState.currentWord.word.toLowerCase()) {
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `The answer was: ${exerciseState.currentWord.word}`);
    }
    updateExerciseScore();
    document.getElementById('firstLetterAnswer').disabled = true;
}

// --- Category Sort: given 4 words, pick which category they share ---
function generateCategorySort(allWords) {
    const cats = [...new Set(allWords.filter(w => w.category).map(w => w.category))];
    if (cats.length < 3) { generateQuestion(); return; }
    const correctCat = cats[Math.floor(Math.random() * cats.length)];
    const catWords = allWords.filter(w => w.category === correctCat);
    if (catWords.length < 3) { generateQuestion(); return; }
    shuffleArray(catWords);
    const shown = catWords.slice(0, 3);
    exerciseState.currentWord = shown[0];

    const wrongCats = cats.filter(c => c !== correctCat);
    shuffleArray(wrongCats);
    const options = [correctCat, ...wrongCats.slice(0, 3)];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:12px">What category do these words share?</div>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:8px">
                ${shown.map(w => `<span style="padding:8px 16px;background:var(--accent-bg);border-radius:99px;font-weight:700;font-size:16px">${w.word}</span>`).join('')}
            </div>
        </div>
        <div class="mc-options">
            ${options.map(o => `<div class="mc-option" onclick="checkCategorySort(this, '${o}', '${correctCat}')" style="text-transform:capitalize">${o}</div>`).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkCategorySort(el, picked, correct) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;
    exerciseState.total++;
    document.querySelectorAll('.mc-option').forEach(o => {
        o.style.pointerEvents = 'none';
        if (o.textContent.toLowerCase() === correct) o.classList.add('correct');
    });
    if (picked === correct) {
        el.classList.add('correct');
        exerciseState.score++;
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        showQuestionFeedback(false, `The category was: ${correct}`);
    }
    updateExerciseScore();
}

// --- Definition Write: see the word, type what it means ---
function generateDefinitionWrite(word) {
    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">Write the definition of:</div>
            <div style="font-size:32px;font-weight:900;letter-spacing:-1px">${word.word}</div>
        </div>
        <div style="max-width:500px;margin:0 auto">
            <textarea id="defWriteAnswer" rows="3" placeholder="Type the definition..." style="width:100%;padding:12px;background:var(--input-bg);border:2px solid var(--input-border);border-radius:var(--radius-xs);color:var(--text);font-size:16px;font-family:inherit;resize:vertical;outline:none"></textarea>
            <div style="display:flex;gap:10px;margin-top:10px;justify-content:center">
                <button class="btn-primary" onclick="checkDefinitionWrite()">Check</button>
                <button class="btn-outline" onclick="revealDefinition()">Reveal</button>
            </div>
        </div>
        <div id="questionFeedback"></div>
    `;
    document.getElementById('defWriteAnswer').focus();
}

function checkDefinitionWrite() {
    const answer = document.getElementById('defWriteAnswer').value.trim().toLowerCase();
    const correct = exerciseState.currentWord.definition.toLowerCase();
    exerciseState.total++;
    // Check if answer contains key words from definition
    const keywords = correct.split(/\s+/).filter(w => w.length > 3);
    const matched = keywords.filter(kw => answer.includes(kw));
    const ratio = keywords.length > 0 ? matched.length / keywords.length : 0;

    if (ratio >= 0.5) {
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true, `Actual: "${exerciseState.currentWord.definition}"`);
    } else {
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `Actual: "${exerciseState.currentWord.definition}"`);
    }
    updateExerciseScore();
    document.getElementById('defWriteAnswer').disabled = true;
}

function revealDefinition() {
    exerciseState.total++;
    updateWordScore(exerciseState.currentWord.id, false);
    showQuestionFeedback(false, `Definition: "${exerciseState.currentWord.definition}"`);
    updateExerciseScore();
    document.getElementById('defWriteAnswer').disabled = true;
}

// --- Origin Guess: see a word, guess its language origin ---
function generateOriginGuess(word) {
    if (!word.origin) { generateQuestion(); return; }
    const allOrigins = ['latin', 'greek', 'french', 'germanic', 'old english', 'italian', 'spanish', 'arabic', 'other'];
    const wrong = allOrigins.filter(o => o !== word.origin);
    shuffleArray(wrong);
    const options = [word.origin, ...wrong.slice(0, 3)];
    shuffleArray(options);

    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">What is the origin of this word?</div>
            <div style="font-size:28px;font-weight:900">${word.word}</div>
            <div style="font-size:14px;color:var(--text-light);margin-top:8px">${word.definition}</div>
        </div>
        <div class="mc-options">
            ${options.map(o => `<div class="mc-option" onclick="checkOriginGuess(this, '${o}', '${word.origin}')" style="text-transform:capitalize">${o}</div>`).join('')}
        </div>
        <div id="questionFeedback"></div>
    `;
}

function checkOriginGuess(el, picked, correct) {
    if (el.parentElement.querySelector('.correct, .wrong')) return;
    exerciseState.total++;
    document.querySelectorAll('.mc-option').forEach(o => {
        o.style.pointerEvents = 'none';
        if (o.textContent.toLowerCase() === correct) o.classList.add('correct');
    });
    if (picked === correct) {
        el.classList.add('correct');
        exerciseState.score++;
        updateWordScore(exerciseState.currentWord.id, true);
        showQuestionFeedback(true);
    } else {
        el.classList.add('wrong');
        updateWordScore(exerciseState.currentWord.id, false);
        showQuestionFeedback(false, `Origin: ${correct}`);
    }
    updateExerciseScore();
}

// --- Word Chain: see a definition chain, type each word in sequence ---
let chainWords = [];
let chainIndex = 0;

function generateWordChain(allWords) {
    shuffleArray(allWords);
    chainWords = allWords.slice(0, 5);
    chainIndex = 0;
    exerciseState.currentWord = chainWords[0];
    showChainWord();
}

function showChainWord() {
    if (chainIndex >= chainWords.length) {
        showQuestionFeedback(true, `Chain complete! ${exerciseState.score} of ${chainWords.length} correct`);
        return;
    }
    const w = chainWords[chainIndex];
    exerciseState.currentWord = w;
    const content = document.getElementById('exerciseContent');
    content.innerHTML = `
        <div style="text-align:center;margin-bottom:12px;font-size:13px;color:var(--text-secondary)">Word ${chainIndex + 1} of ${chainWords.length}</div>
        <div class="mc-question">
            <div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px">Type the word that means:</div>
            <div style="font-size:18px">${w.definition}</div>
            <div style="font-size:13px;color:var(--text-light);margin-top:8px">Starts with: <strong style="color:var(--accent)">${w.word[0].toUpperCase()}</strong> &bull; ${w.word.length} letters</div>
        </div>
        <div class="fill-blank-input">
            <input type="text" id="chainAnswer" placeholder="Type the word..." onkeypress="if(event.key==='Enter')checkChainWord()">
            <button class="btn-primary" onclick="checkChainWord()">Next</button>
        </div>
        <div id="questionFeedback"></div>
    `;
    document.getElementById('chainAnswer').focus();
}

function checkChainWord() {
    const answer = document.getElementById('chainAnswer').value.trim().toLowerCase();
    const correct = chainWords[chainIndex].word.toLowerCase();
    exerciseState.total++;
    if (answer === correct) {
        exerciseState.score++;
        updateWordScore(chainWords[chainIndex].id, true);
    } else {
        updateWordScore(chainWords[chainIndex].id, false);
    }
    updateExerciseScore();
    chainIndex++;
    if (chainIndex < chainWords.length) {
        showChainWord();
    } else {
        const pct = Math.round((exerciseState.score / exerciseState.total) * 100);
        showQuestionFeedback(pct >= 60, `Chain done! ${exerciseState.score}/${exerciseState.total} (${pct}%)`);
    }
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
        score: 0,
        lastReviewed: null,
        nextReview: null,
        interval: 1
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

function importFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        let added = 0;
        let maxId = words.reduce((max, w) => Math.max(max, w.id || 0), 0);
        const existingNames = new Set(words.map(w => w.word.toLowerCase()));

        if (file.name.endsWith('.json')) {
            try {
                const data = JSON.parse(text);
                const arr = Array.isArray(data) ? data : [];
                arr.forEach(w => {
                    if (!w.word || existingNames.has(w.word.toLowerCase())) return;
                    maxId++;
                    existingNames.add(w.word.toLowerCase());
                    words.push({
                        id: maxId, word: w.word, definition: w.definition || '',
                        example: w.example || '', synonyms: w.synonyms || [],
                        level: w.level || 'beginner', partOfSpeech: w.partOfSpeech || '',
                        category: w.category || '', origin: w.origin || '',
                        status: 'new', score: 0
                    });
                    added++;
                });
            } catch (err) { alert('Invalid JSON file'); return; }
        } else {
            // Pipe format or CSV
            const lines = text.split('\n').filter(Boolean);
            lines.forEach(line => {
                const parts = line.split('|').map(s => s.trim());
                if (parts.length < 2) return;
                const [word, definition, example, synonyms, level] = parts;
                if (!word || existingNames.has(word.toLowerCase())) return;
                maxId++;
                existingNames.add(word.toLowerCase());
                words.push({
                    id: maxId, word, definition: definition || '',
                    example: example || '',
                    synonyms: synonyms ? synonyms.split(',').map(s => s.trim()) : [],
                    level: ['beginner','intermediate','advanced','expert'].includes(level) ? level : 'beginner',
                    partOfSpeech: '', category: '', origin: '',
                    status: 'new', score: 0
                });
                added++;
            });
        }

        saveWords();
        alert(`Imported ${added} new word(s). ${added === 0 ? 'All words already exist.' : ''}`);
        renderWordList();
        updateDashboard();
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ==================== SPACED REPETITION ====================

function getSpacedRepetitionWords() {
    const now = Date.now();
    return [...words].sort((a, b) => {
        const aOverdue = a.nextReview && a.nextReview <= now;
        const bOverdue = b.nextReview && b.nextReview <= now;
        const aNeverReviewed = !a.lastReviewed;
        const bNeverReviewed = !b.lastReviewed;

        // Overdue words first (sorted by most overdue)
        if (aOverdue && !bOverdue) return -1;
        if (!aOverdue && bOverdue) return 1;
        if (aOverdue && bOverdue) return (a.nextReview || 0) - (b.nextReview || 0);

        // Then never-reviewed words
        if (aNeverReviewed && !bNeverReviewed) return -1;
        if (!aNeverReviewed && bNeverReviewed) return 1;

        // Then by shortest interval (weakest first)
        return (a.interval || 1) - (b.interval || 1);
    });
}

function applySpacedRepetition(word, correct) {
    const now = Date.now();
    word.lastReviewed = now;
    if (correct) {
        word.interval = Math.min((word.interval || 1) * 2, 720);
    } else {
        word.interval = Math.max(1, (word.interval || 1) / 2);
    }
    word.nextReview = now + (word.interval * 60 * 60 * 1000);
}

// ==================== DAILY GOAL ====================

function getTodayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `vocabmaster_daily_${yyyy}-${mm}-${dd}`;
}

function getDailyData() {
    const key = getTodayKey();
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : { reviewed: {}, newLearned: [] };
}

function saveDailyData(data) {
    localStorage.setItem(getTodayKey(), JSON.stringify(data));
}

function recordDailyActivity(wordId) {
    const data = getDailyData();
    if (!data.reviewed) data.reviewed = {};
    data.reviewed[wordId] = Date.now();

    // Check if this word just transitioned from 'new' to 'learning'
    const w = words.find(w => w.id === wordId);
    if (w && w.status === 'learning') {
        if (!data.newLearned) data.newLearned = [];
        if (!data.newLearned.includes(wordId)) {
            data.newLearned.push(wordId);
        }
    }

    saveDailyData(data);
}

function getDailyProgress() {
    const data = getDailyData();
    return {
        reviewed: data.reviewed ? Object.keys(data.reviewed).length : 0,
        newLearned: data.newLearned ? data.newLearned.length : 0,
        goal: 10
    };
}

function updateDailyGoal() {
    const progress = getDailyProgress();
    const countEl = document.getElementById('dailyGoalCount');
    const fillEl = document.getElementById('dailyGoalFill');
    if (!countEl || !fillEl) return;
    countEl.textContent = `${progress.reviewed} / ${progress.goal} words`;
    const pct = Math.min(100, Math.round((progress.reviewed / progress.goal) * 100));
    fillEl.style.width = pct + '%';
}

function renderDueWords() {
    const dueSection = document.getElementById('dueReviewSection');
    const dueList = document.getElementById('dueWordsList');
    const dueCount = document.getElementById('dueCount');
    if (!dueSection || !dueList || !dueCount) return;

    const now = Date.now();
    const srWords = getSpacedRepetitionWords();
    const dueWords = srWords.filter(w => (w.nextReview && w.nextReview <= now) || !w.lastReviewed);
    const showWords = dueWords.slice(0, 20);

    dueCount.textContent = `${dueWords.length} due`;

    if (showWords.length === 0) {
        dueList.innerHTML = '<span style="font-size:12px;color:var(--text-light);padding:4px">All caught up!</span>';
        return;
    }

    dueList.innerHTML = showWords.map(w => {
        const colors = { beginner: '#9FCB98', intermediate: '#e0d07a', advanced: '#e0886a', expert: '#c09ae0' };
        const c = colors[w.level] || '#9FCB98';
        return `<button onclick="jumpToFlashcardFromDue(${w.id})" style="flex-shrink:0;padding:4px 10px;border-radius:99px;border:1px solid ${c}40;background:${c}15;color:${c};font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap">${w.word}</button>`;
    }).join('');
}

function jumpToFlashcardFromDue(id) {
    // Navigate to flashcards page and jump to that word
    navigateTo('flashcards');
    // After flashcards setup, find the word in deck or set filters to show it
    const idx = flashcardDeck.findIndex(w => w.id === id);
    if (idx !== -1) {
        currentFlashcardIndex = idx;
        showFlashcard();
    } else {
        // Reset filters to 'all' and re-setup
        document.getElementById('flashcardLevel').value = 'all';
        document.getElementById('flashcardCategory').value = 'all';
        document.getElementById('flashcardOrigin').value = 'all';
        document.getElementById('flashcardPos').value = 'all';
        document.getElementById('flashcardStatus').value = 'all';
        setupFlashcards();
        const newIdx = flashcardDeck.findIndex(w => w.id === id);
        if (newIdx !== -1) {
            currentFlashcardIndex = newIdx;
            showFlashcard();
        }
    }
}

// ==================== PRONUNCIATION ====================

async function pronounceWord(word) {
    if (!word || word === 'No words' || word === 'Start') return;
    try {
        const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`);
        if (resp.ok) {
            const data = await resp.json();
            if (data && data[0] && data[0].phonetics) {
                const phonetic = data[0].phonetics.find(p => p.audio && p.audio.length > 0);
                if (phonetic && phonetic.audio) {
                    const audio = new Audio(phonetic.audio);
                    audio.play();
                    return;
                }
            }
        }
    } catch (e) {
        // fall through to speech synthesis
    }
    // Fallback to SpeechSynthesis
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.85;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

// ==================== GLOBAL SEARCH ====================

function handleGlobalSearch() {
    const input = document.getElementById('globalSearch');
    const resultsEl = document.getElementById('globalSearchResults');
    if (!input || !resultsEl) return;

    const query = input.value.trim().toLowerCase();
    if (!query) {
        resultsEl.classList.remove('open');
        resultsEl.innerHTML = '';
        return;
    }

    const matches = words.filter(w => {
        if (w.word.toLowerCase().includes(query)) return true;
        if (w.definition.toLowerCase().includes(query)) return true;
        if (w.synonyms && w.synonyms.some(s => s.toLowerCase().includes(query))) return true;
        if (w.category && w.category.toLowerCase().includes(query)) return true;
        if (w.origin && w.origin.toLowerCase().includes(query)) return true;
        return false;
    }).slice(0, 8);

    if (matches.length === 0) {
        resultsEl.innerHTML = '<div style="padding:12px 14px;color:var(--text-light);font-size:13px">No results found</div>';
        resultsEl.classList.add('open');
        return;
    }

    const badgeColors = { beginner: '#9FCB98', intermediate: '#e0d07a', advanced: '#e0886a', expert: '#c09ae0' };

    resultsEl.innerHTML = matches.map(w => {
        const c = badgeColors[w.level] || '#9FCB98';
        const shortDef = w.definition.length > 50 ? w.definition.substring(0, 50) + '...' : w.definition;
        return `<div class="global-search-result" onclick="document.getElementById('globalSearch').value=''; document.getElementById('globalSearchResults').classList.remove('open'); showWordDetail(${w.id})">
            <div class="global-search-result-word">${w.word}<span class="global-search-result-badge" style="background:${c}25;color:${c}">${w.level}</span></div>
            <div class="global-search-result-def">${shortDef}</div>
        </div>`;
    }).join('');
    resultsEl.classList.add('open');
}

// Close global search on outside click
document.addEventListener('click', function(e) {
    if (!e.target.closest('.global-search-wrap')) {
        const resultsEl = document.getElementById('globalSearchResults');
        if (resultsEl) resultsEl.classList.remove('open');
    }
});

// ==================== CUSTOM LISTS ====================

let customLists = [];

function loadLists() {
    const saved = localStorage.getItem('vocabmaster_lists');
    if (saved) {
        customLists = JSON.parse(saved);
    } else {
        customLists = [];
    }
}

function saveLists() {
    localStorage.setItem('vocabmaster_lists', JSON.stringify(customLists));
}

function createList() {
    const input = document.getElementById('newListName');
    if (!input) return;
    const name = input.value.trim();
    if (!name) return;

    const id = Date.now();
    customLists.push({ id, name, wordIds: [], created: id });
    saveLists();
    input.value = '';
    renderLists();
}

function renderLists() {
    const container = document.getElementById('listsContainer');
    if (!container) return;

    if (customLists.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light)">No custom lists yet. Create one above!</div>';
        return;
    }

    container.innerHTML = customLists.map(list => {
        const count = list.wordIds.length;
        return `<div class="list-card" onclick="viewList(${list.id})">
            <div>
                <div class="list-card-name">${list.name}</div>
                <div class="list-card-count">${count} word${count !== 1 ? 's' : ''}</div>
            </div>
            <div class="list-card-actions">
                <button onclick="event.stopPropagation(); renameList(${list.id})" title="Rename">Rename</button>
                <button class="delete-list-btn" onclick="event.stopPropagation(); deleteList(${list.id})" title="Delete">Delete</button>
            </div>
        </div>`;
    }).join('');
}

function viewList(id) {
    const list = customLists.find(l => l.id === id);
    if (!list) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    const listWords = list.wordIds.map(wid => words.find(w => w.id === wid)).filter(Boolean);

    let wordsHtml;
    if (listWords.length === 0) {
        wordsHtml = '<div style="padding:20px;text-align:center;color:var(--text-light)">No words in this list yet. Add words from the word detail view.</div>';
    } else {
        wordsHtml = listWords.map(w => `
            <div class="list-detail-word">
                <div style="flex:1;min-width:0">
                    <span style="font-weight:700;cursor:pointer" onclick="this.closest('.modal-overlay').remove(); showWordDetail(${w.id})">${w.word}</span>
                    <span style="font-size:12px;color:var(--text-secondary);margin-left:8px">${w.definition.substring(0, 40)}${w.definition.length > 40 ? '...' : ''}</span>
                </div>
                <div style="display:flex;gap:4px;flex-shrink:0">
                    <button onclick="this.closest('.modal-overlay').remove(); editWord(${w.id})" style="background:none;border:none;color:var(--text-light);cursor:pointer;font-size:14px" title="Edit">&#9998;</button>
                    <button onclick="removeFromList(${list.id}, ${w.id}); this.closest('.modal-overlay').remove(); viewList(${list.id})" style="background:none;border:none;color:var(--text-light);cursor:pointer;font-size:16px" title="Remove">&times;</button>
                </div>
            </div>
        `).join('');
    }

    overlay.innerHTML = `
        <div class="modal" style="max-width:500px">
            <h2>${list.name}</h2>
            <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">${listWords.length} word${listWords.length !== 1 ? 's' : ''}</p>
            <div style="max-height:300px;overflow-y:auto;border:1px solid var(--card-border);border-radius:var(--radius-xs)">${wordsHtml}</div>
            <div class="modal-buttons" style="margin-top:16px">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function practiceList(listId) {
    const list = customLists.find(l => l.id === listId);
    if (!list || list.wordIds.length < 4) return;
    // Store active list for exercises
    window._practiceListIds = new Set(list.wordIds);
    navigateTo('exercises');
    // Auto-start multiple choice with this list
    startExercise('multiple-choice');
}

function flashcardList(listId) {
    const list = customLists.find(l => l.id === listId);
    if (!list) return;
    navigateTo('flashcards');
    // Override deck with just this list's words
    flashcardDeck = list.wordIds.map(id => words.find(w => w.id === id)).filter(Boolean);
    currentFlashcardIndex = 0;
    showFlashcard();
}

function addToList(listId, wordId) {
    const list = customLists.find(l => l.id === listId);
    if (!list) return;
    if (!list.wordIds.includes(wordId)) {
        list.wordIds.push(wordId);
        saveLists();
    }
}

function removeFromList(listId, wordId) {
    const list = customLists.find(l => l.id === listId);
    if (!list) return;
    list.wordIds = list.wordIds.filter(id => id !== wordId);
    saveLists();
    renderLists();
}

function renameList(id) {
    const list = customLists.find(l => l.id === id);
    if (!list) return;
    const newName = prompt('Rename list:', list.name);
    if (newName && newName.trim()) {
        list.name = newName.trim();
        saveLists();
        renderLists();
    }
}

function deleteList(id) {
    if (!confirm('Delete this list?')) return;
    customLists = customLists.filter(l => l.id !== id);
    saveLists();
    renderLists();
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
