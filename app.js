// ══════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════
var questions = [];
var current = 0;
var answers = {};
var mode = 'practice';
var selectedUnits = [];
var timerInterval = null;
var timerSeconds = 0;
var reviewMode = false;
var savedMode = 'practice';   // default mode
var currentQuestionBank = ALL_QUESTIONS;   // Paper 1 by default
var TIMERS = {
  practice: 0,
  unit: 0        // dynamic – will be set in startExam
};

var LABELS = ['अ', 'ब', 'क', 'ड'];
var MODE_NAMES = {
  unit: 'युनिट सराव',
  practice: 'सराव मोड'
};
var TIMERS = {
  unit: 0,      // will be overridden dynamically
  practice: 0
};

// ══════════════════════════════════════════════════════
//  FLOATING BUTTON HELPERS
// ══════════════════════════════════════════════════════
function showFloatingStart() {
  var el = document.getElementById('floating-start');
  el.style.display = 'block';
  // Trigger reflow before adding class so transition plays
  void el.offsetWidth;
  el.classList.add('visible');
}

function hideFloatingStart() {
  var el = document.getElementById('floating-start');
  el.classList.remove('visible');
  setTimeout(function() { el.style.display = 'none'; }, 300);
}

// ══════════════════════════════════════════════════════
//  SCREEN MANAGEMENT
// ══════════════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  var target = document.getElementById(id);
  target.classList.add('active');
  target.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// ══════════════════════════════════════════════════════
//  HOME / MODE SETUP
// ══════════════════════════════════════════════════════
var UNIT_INFO = {};
ALL_QUESTIONS.forEach(function(q) {
  if (!UNIT_INFO[q.unit]) {
    UNIT_INFO[q.unit] = {
      name: q.syllabus_ref.replace(/^युनिट \S+: /, ''),
      num: q.unit
    };
  }
});

function selectMode(m, cardEl) {
  mode = m;
  var unitBox = document.getElementById('unit-selector');

  // Highlight the selected card, unhighlight others
  document.querySelectorAll('.mode-card').forEach(function(c) {
    c.classList.remove('selected');
  });
  if (cardEl) cardEl.classList.add('selected');

  if (m === 'unit') {
    // Unit mode: show inline selector, hide floating button
    hideFloatingStart();
    unitBox.style.display = 'block';
    buildUnitGrid();
  } else {
    // Non-unit modes: hide inline selector, show floating start button
    unitBox.style.display = 'none';
    showFloatingStart();
  }
}

function buildUnitGrid() {
  var grid = document.getElementById('unit-grid-btns');
  grid.innerHTML = '';
  var sorted = Object.values(UNIT_INFO).sort(function(a,b) { return a.num - b.num; });
  sorted.forEach(function(u) {
    var btn = document.createElement('div');
    btn.className = 'unit-btn';
    btn.innerHTML = '<span class="unit-num">' + u.num + '</span>' + u.name;
    (function(num, el) {
      el.onclick = function() { toggleUnit(num, el); };
    })(u.num, btn);
    grid.appendChild(btn);
  });
}

function toggleUnit(num, btn) {
  var idx = selectedUnits.indexOf(num);
  if (idx === -1) { selectedUnits.push(num); btn.classList.add('selected'); }
  else { selectedUnits.splice(idx, 1); btn.classList.remove('selected'); }
}

// ══════════════════════════════════════════════════════
//  START EXAM
// ══════════════════════════════════════════════════════
function startExam() {
  if (mode === 'unit' && selectedUnits.length === 0) {
    showModal('कृपया किमान एक युनिट निवडा!', function() {});
    return;
  }

  hideFloatingStart();
  savedMode = mode;

  var pool = currentQuestionBank.slice();

  // If unit mode, filter by selected units
  if (mode === 'unit') {
    pool = pool.filter(function(q) {
      return selectedUnits.indexOf(q.unit) !== -1;
    });
  }

  // Shuffle the pool (good for both modes)
  pool = shuffle(pool);

  // Set timer seconds based on mode
  if (mode === 'practice') {
    timerSeconds = 0;
  } else if (mode === 'unit') {
    timerSeconds = pool.length * 60;   // 1 minute per question
  }

  // Clean up any previous shuffled data
  pool.forEach(function(q) {
    delete q._shuffledOptions;
    delete q._correctIndex;
  });

  questions = pool;
  current = 0;
  answers = {};
  reviewMode = false;

  document.getElementById('mode-badge').textContent = MODE_NAMES[mode];
  document.getElementById('total-q-num').textContent = questions.length;

  buildQuestionMap();
  renderQuestion();
  startTimer();
  showScreen('exam-screen');
}

// ══════════════════════════════════════════════════════
//  TIMER
// ══════════════════════════════════════════════════════
function startTimer() {
  clearInterval(timerInterval);
  var timerBox = document.getElementById('timer-box');
  if (mode === 'practice') { timerBox.style.display = 'none'; return; }
  timerBox.style.display = 'block';
  updateTimerDisplay();
  timerInterval = setInterval(function() {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) { clearInterval(timerInterval); submitExam(); }
  }, 1000);
}

function updateTimerDisplay() {
  var m = Math.floor(timerSeconds / 60);
  var s = timerSeconds % 60;
  document.getElementById('timer-display').textContent =
    String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  var box = document.getElementById('timer-box');
  box.className = 'timer-box';
  if (timerSeconds < 300) box.classList.add('danger');
  else if (timerSeconds < 600) box.classList.add('warning');
}

// ══════════════════════════════════════════════════════
//  RENDER QUESTION
// ══════════════════════════════════════════════════════
function renderQuestion() {
  var q = questions[current];

  if (!q._shuffledOptions) {
    var pairs = q.options.map(function(opt, i) { return { text: opt, originalIndex: i }; });
    q._shuffledOptions = shuffle(pairs);
    q._correctIndex = -1;
    for (var fi = 0; fi < q._shuffledOptions.length; fi++) {
      if (q._shuffledOptions[fi].originalIndex === q.answer) { q._correctIndex = fi; break; }
    }
  }

  var answered = answers[current] !== undefined;

  document.getElementById('q-syllabus').textContent = q.syllabus_ref;
  document.getElementById('q-num-badge').textContent = 'Q' + (current + 1);
  document.getElementById('q-text').textContent = q.question;
  document.getElementById('curr-q-num').textContent = current + 1;

  var pct = Math.round(((current + 1) / questions.length) * 100);
  document.getElementById('prog-bar').style.width = pct + '%';
  document.getElementById('prog-pct').textContent = pct + '%';
  document.getElementById('btn-prev').disabled = current === 0;

  var nextBtn = document.getElementById('btn-next');
if (current === questions.length - 1) {
  nextBtn.textContent = '🏁 शेवट';
  nextBtn.onclick = function() { confirmSubmit(); };
} else {
  nextBtn.textContent = 'पुढे ▶';
  nextBtn.onclick = function() { navigate(1); };
}

  var list = document.getElementById('options-list');
  list.innerHTML = '';
  q._shuffledOptions.forEach(function(optObj, i) {
    var btn = document.createElement('button');
    btn.className = 'option-btn';
    if (answered || reviewMode) {
      btn.classList.add('locked');
      if (i === q._correctIndex) btn.classList.add('correct');
      else if (i === answers[current]) btn.classList.add('wrong');
      else btn.classList.add('dimmed');
    }
    var labelSpan = document.createElement('span');
    labelSpan.className = 'opt-label';
    labelSpan.textContent = LABELS[i];
    var textSpan = document.createElement('span');
    textSpan.textContent = optObj.text;
    btn.appendChild(labelSpan);
    btn.appendChild(textSpan);
    if (!answered && !reviewMode) {
      (function(idx) {
        btn.addEventListener('click', function() { selectAnswer(idx); });
      })(i);
    }
    list.appendChild(btn);
  });

  var expBox = document.getElementById('explanation-box');
  if ((answered || reviewMode) && q.explanation) {
    var isCorrect = answers[current] === q._correctIndex;
    expBox.style.display = 'block';
    expBox.className = 'explanation-box ' + (isCorrect ? 'correct-exp' : 'wrong-exp');
    var hdr = document.getElementById('exp-header');
    hdr.className = 'exp-header ' + (isCorrect ? 'correct-h' : 'wrong-h');
    if (isCorrect) {
      hdr.innerHTML = '🎉 बरोबर! छान!';
    } else {
      hdr.innerHTML = '❌ चुकीचे — योग्य उत्तर: <strong style="color:var(--correct)">' + LABELS[q._correctIndex] + ' — ' + q._shuffledOptions[q._correctIndex].text + '</strong>';
    }
    document.getElementById('exp-body').textContent = q.explanation;
  } else {
    expBox.style.display = 'none';
  }

  updateMapHighlight();
  updateMapCount();
}

// ══════════════════════════════════════════════════════
//  ANSWER
// ══════════════════════════════════════════════════════
function selectAnswer(optIdx) {
  if (answers[current] !== undefined || reviewMode) return;
  answers[current] = optIdx;
  renderQuestion();
}
  renderQuestion();
}

// ══════════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════════
function navigate(dir) {
  current = Math.max(0, Math.min(questions.length - 1, current + dir));
  renderQuestion();
}

// ══════════════════════════════════════════════════════
//  QUESTION MAP
// ══════════════════════════════════════════════════════
function buildQuestionMap() {
  var grid = document.getElementById('q-map-grid');
  grid.innerHTML = '';
  questions.forEach(function(_, i) {
    var dot = document.createElement('div');
    dot.className = 'q-dot';
    dot.textContent = i + 1;
    dot.id = 'dot-' + i;
    (function(idx) {
      dot.addEventListener('click', function() { current = idx; renderQuestion(); toggleMap(false); });
    })(i);
    grid.appendChild(dot);
  });
}

function updateMapHighlight() {
  document.querySelectorAll('.q-dot').forEach(function(d, i) {
    d.className = 'q-dot';
    if (answers[i] !== undefined) d.classList.add('answered');
    if (i === current) d.classList.add('current');
  });
}

function updateMapCount() {
  document.getElementById('map-count').textContent =
    Object.keys(answers).length + '/' + questions.length;
}

var mapOpen = false;
function toggleMap(force) {
  mapOpen = force !== undefined ? force : !mapOpen;
  document.getElementById('q-map-panel').style.display = mapOpen ? 'block' : 'none';
}

// ══════════════════════════════════════════════════════
//  CUSTOM MODAL
// ══════════════════════════════════════════════════════
function showModal(message, onConfirm) {
  var overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-msg').textContent = message;
  overlay.style.display = 'flex';

  var okBtn = document.getElementById('modal-confirm');
  var cancelBtn = document.getElementById('modal-cancel');
  var newOk = okBtn.cloneNode(true);
  var newCancel = cancelBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newOk, okBtn);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

  newOk.addEventListener('click', function() {
    overlay.style.display = 'none';
    onConfirm();
  });
  newCancel.addEventListener('click', function() {
    overlay.style.display = 'none';
  });
}

// ══════════════════════════════════════════════════════
//  SUBMIT
// ══════════════════════════════════════════════════════
function confirmSubmit() {
  var remaining = questions.length - Object.keys(answers).length;
  var msg = remaining > 0
    ? 'अजून ' + remaining + ' प्रश्न बाकी आहेत. तरीही सबमिट करायचे का?'
    : 'सर्व प्रश्न पूर्ण झाले आहेत. सबमिट करायचे का?';
  showModal(msg, function() { submitExam(); });
}

function submitExam() {
  clearInterval(timerInterval);
  showResults();
}

// ══════════════════════════════════════════════════════
//  EXIT
// ══════════════════════════════════════════════════════
function exitExam() {
  showModal('टेस्ट सोडून बाहेर पडायचे का? प्रगती जतन होणार नाही.', function() {
    clearInterval(timerInterval);
    resetHomeState();
    showScreen('home-screen');
  });
}

// ══════════════════════════════════════════════════════
//  RESULTS
// ══════════════════════════════════════════════════════
function showResults() {
  var correct = 0, wrong = 0, skip = 0;
  var unitStats = {};

  questions.forEach(function(q, i) {
    if (!unitStats[q.unit]) {
      unitStats[q.unit] = {
        total: 0, correct: 0,
        name: q.syllabus_ref.replace(/^युनिट \S+: /, '')
      };
    }
    unitStats[q.unit].total++;
    if (answers[i] === undefined) {
      skip++;
    } else if (answers[i] === q._correctIndex) {
      correct++;
      unitStats[q.unit].correct++;
    } else {
      wrong++;
    }
  });

  var total = questions.length;
  var pct = Math.round((correct / total) * 100);

  document.getElementById('res-correct').textContent = correct;
  document.getElementById('res-wrong').textContent = wrong;
  document.getElementById('res-skip').textContent = skip;
  document.getElementById('res-pct').textContent = pct + '%';

  var title, sub;
  if (pct >= 80)      { title = '🏆 उत्कृष्ट!';       sub = 'Luna, तू खूप छान केलेस! PET ला नक्की यश मिळेल 💜'; }
  else if (pct >= 60) { title = '👍 चांगले!';           sub = 'चांगला प्रयत्न! अजून थोडा सराव करा 💪'; }
  else if (pct >= 40) { title = '📖 आणखी सराव हवा';    sub = 'हार मानू नका! पुन्हा सराव करा 🌟'; }
  else                { title = '💡 सुरुवात चांगली';    sub = 'प्रत्येक सराव तुम्हाला मजबूत बनवतो ✨'; }

  document.getElementById('res-title').textContent = title;
  document.getElementById('res-sub').textContent = sub;

  var offset = 427 * (1 - pct / 100);
  var arc = document.getElementById('score-arc');
  arc.setAttribute('stroke-dashoffset', '427');
  arc.style.transition = 'none';
  setTimeout(function() {
    arc.style.transition = 'stroke-dashoffset 1s ease';
    arc.setAttribute('stroke-dashoffset', String(offset));
  }, 150);

  var barsDiv = document.getElementById('unit-bars');
  barsDiv.innerHTML = '';
  Object.keys(unitStats).sort(function(a,b) { return Number(a) - Number(b); }).forEach(function(unit) {
    var s = unitStats[unit];
    var p = Math.round((s.correct / s.total) * 100);
    var color = p >= 70 ? '#10b981' : p >= 40 ? '#f59e0b' : '#ef4444';
    var row = document.createElement('div');
    row.className = 'unit-row';
    row.innerHTML = '<span class="u-name">युनिट ' + unit + ': ' + s.name + '</span>' +
      '<div class="u-bar-bg"><div class="u-bar" style="width:' + p + '%;background:' + color + '"></div></div>' +
      '<span class="u-score">' + s.correct + '/' + s.total + '</span>';
    barsDiv.appendChild(row);
  });

  showScreen('result-screen');
}

function reviewAnswers() {
  reviewMode = true;
  current = 0;
  document.getElementById('timer-box').style.display = 'none';
  document.getElementById('mode-badge').textContent = '🔍 उत्तर तपासणी';
  renderQuestion();
  showScreen('exam-screen');
}

// ══════════════════════════════════════════════════════
//  RESET & HOME
// ══════════════════════════════════════════════════════
function resetHomeState() {
  clearInterval(timerInterval);
  questions = [];
  answers = {};
  current = 0;
  reviewMode = false;
  selectedUnits = [];
  mode = 'practice';

  // Hide floating button (no animation, instant)
  var fl = document.getElementById('floating-start');
  fl.classList.remove('visible');
  fl.style.display = 'none';

  // Hide unit selector
  document.getElementById('unit-selector').style.display = 'none';

  // Clear card selection highlights
  document.querySelectorAll('.mode-card').forEach(function(c) {
    c.classList.remove('selected');
  });

  toggleMap(false);
}

function goHome() {
  resetHomeState();
  showScreen('home-screen');
}

function retryExam() {
  mode = savedMode;
  startExam();
}

// ══════════════════════════════════════════════════════
//  UTILS
// ══════════════════════════════════════════════════════
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

// ══════════════════════════════════════════════════════
//  EVENT BINDING
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    if (mapOpen &&
        !e.target.closest('#q-map-panel') &&
        !e.target.closest('#map-toggle')) {
      toggleMap(false);
    }
  });
});

function selectPaper(paper) {
  if (paper === 1) {
    currentQuestionBank = ALL_QUESTIONS;
    document.getElementById('home-screen-title').innerText = 'पेपर १ – संशोधन पद्धती';
    document.getElementById('home-paper-subtitle').innerHTML = '';
    showScreen('home-screen');
  } else if (paper === 2) {
    currentQuestionBank = PAPER2_QUESTIONS;
    document.getElementById('home-screen-title').innerText = 'पेपर २ – शिक्षण';
    document.getElementById('home-paper-subtitle').innerHTML = 'PET-10 सोलापूर विद्यापीठ';
    showScreen('home-screen');
  }
}

function goToPaperSelect() {
  // Reset any exam state and go back to paper selection
  resetHomeState();
  showScreen('paper-select-screen');
}
