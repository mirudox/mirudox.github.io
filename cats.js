// ══════════════════════════════════════════════════════
//  BITTU 🐱 — For Luna, with love from Potter
//  A tribute to Bittu, the white & ginger cat
// ══════════════════════════════════════════════════════

(function () {

  // ── INJECT STYLES ──────────────────────────────────
  var style = document.createElement('style');
  style.textContent = `

    /* ── BITTU WALKING CAT ── */
    #bittu-wrap {
      position: fixed;
      bottom: 90px;
      left: -120px;
      z-index: 5000;
      display: none;
      pointer-events: none;
    }

    #bittu-wrap.walk-in {
      left: calc(50% - 40px);
      transition: left 3.5s cubic-bezier(0.4, 0, 0.6, 1);
    }

    #bittu-wrap.walk-out {
      left: calc(100% + 120px);
      transition: left 2.5s cubic-bezier(0.4, 0, 0.6, 1);
    }

    .bittu-cat {
      width: 80px;
      height: 80px;
      position: relative;
      filter: drop-shadow(0 4px 12px rgba(167,139,250,0.4));
    }

    #bittu-wrap.walking .bittu-cat {
      animation: bittu-walk 0.4s steps(1) infinite;
    }

    @keyframes bittu-walk {
      0%   { transform: translateY(0px) rotate(-1deg); }
      50%  { transform: translateY(-4px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(-1deg); }
    }

    #bittu-wrap.sitting .bittu-cat {
      animation: bittu-sit 3s ease-in-out infinite;
    }

    @keyframes bittu-sit {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-3px); }
    }

    #bittu-tail { transform-origin: top center; }

    #bittu-wrap.sitting #bittu-tail {
      animation: tail-wag 1.2s ease-in-out infinite;
    }

    @keyframes tail-wag {
      0%, 100% { transform: rotate(-20deg); }
      50%       { transform: rotate(20deg); }
    }

    #bittu-wrap.sitting #bittu-eye-l,
    #bittu-wrap.sitting #bittu-eye-r {
      animation: eye-blink 4s ease-in-out infinite;
    }

    @keyframes eye-blink {
      0%, 90%, 100% { transform: scaleY(1); }
      95%            { transform: scaleY(0.1); }
    }

    /* ── MESSAGE BUBBLE (paper select) ── */
    #bittu-bubble {
      position: absolute;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #1a1530ee, #221d3aee);
      border: 1.5px solid rgba(167,139,250,0.5);
      border-radius: 18px;
      padding: 14px 18px;
      width: 240px;
      text-align: center;
      font-family: 'Noto Sans Devanagari', sans-serif;
      color: #e2e8f0;
      font-size: 13px;
      line-height: 1.7;
      box-shadow: 0 8px 32px rgba(124,58,237,0.4), 0 0 0 1px rgba(167,139,250,0.15);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
      opacity: 0;
      pointer-events: none;
      white-space: normal;
      z-index: 5001;
    }

    #bittu-bubble.show {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }

    #bittu-bubble::after {
      content: '';
      position: absolute;
      bottom: -9px;
      left: 50%;
      transform: translateX(-50%);
      width: 0; height: 0;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top: 9px solid rgba(167,139,250,0.5);
    }

    #bittu-bubble .bubble-name {
      font-size: 11px;
      color: #f472b6;
      font-weight: 600;
      margin-bottom: 6px;
    }

    #bittu-bubble .bubble-heart {
      font-size: 16px;
      margin-top: 6px;
      animation: heart-beat 1.2s ease-in-out infinite;
    }

    @keyframes heart-beat {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.25); }
    }

    /* ── EXAM PEEK: TOP-RIGHT CORNER ── */
    #bittu-exam-peek {
      position: fixed;
      top: -90px;
      right: 16px;
      z-index: 4000;
      display: none;
      pointer-events: none;
      transition: top 0.7s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    #bittu-exam-peek.peek-down { top: 60px; }

    #bittu-exam-peek .bittu-cat {
      width: 60px;
      height: 60px;
      animation: peek-bob 2s ease-in-out infinite;
    }

    @keyframes peek-bob {
      0%, 100% { transform: translateY(0) rotate(-3deg); }
      50%       { transform: translateY(-5px) rotate(3deg); }
    }

    #bittu-exam-bubble {
      position: absolute;
      top: 8px;
      right: 68px;
      background: linear-gradient(135deg, #1a1530f0, #221d3af0);
      border: 1.5px solid rgba(167,139,250,0.5);
      border-radius: 14px;
      padding: 10px 14px;
      width: 185px;
      text-align: center;
      font-family: 'Noto Sans Devanagari', sans-serif;
      color: #e2e8f0;
      font-size: 12px;
      line-height: 1.6;
      box-shadow: 0 6px 24px rgba(124,58,237,0.4);
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
      white-space: normal;
    }

    #bittu-exam-bubble.show { opacity: 1; transform: scale(1); }

    #bittu-exam-bubble::after {
      content: '';
      position: absolute;
      top: 16px;
      right: -8px;
      width: 0; height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 8px solid rgba(167,139,250,0.5);
    }

    #bittu-exam-bubble .exam-bubble-name {
      font-size: 10px;
      color: #f472b6;
      font-weight: 600;
      margin-bottom: 4px;
    }

    /* ── BLINK EYES (home screen) ── */
    #blink-eyes {
      position: fixed;
      bottom: 140px;
      right: 18px;
      z-index: 100;
      opacity: 0;
      transition: opacity 1s ease;
      pointer-events: none;
      display: none;
    }

    #blink-eyes.visible { opacity: 0.5; }

    .blink-eye {
      width: 10px; height: 10px;
      background: #a78bfa;
      border-radius: 50%;
      display: inline-block;
      margin: 0 5px;
      box-shadow: 0 0 8px #a78bfa;
      animation: slow-blink 5s ease-in-out infinite;
    }

    .blink-eye:nth-child(2) { animation-delay: 0.1s; }

    @keyframes slow-blink {
      0%, 85%, 100% { transform: scaleY(1); opacity: 1; }
      90%            { transform: scaleY(0.08); opacity: 0.6; }
    }

    /* ── CONFETTI PAWS ── */
    .paw-confetti {
      position: fixed;
      font-size: 22px;
      z-index: 9000;
      pointer-events: none;
      animation: paw-fall linear forwards;
      opacity: 0;
    }

    @keyframes paw-fall {
      0%   { transform: translateY(-40px) rotate(0deg) scale(0.5); opacity: 1; }
      80%  { opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg) scale(1); opacity: 0; }
    }

    /* ── RESULT CHEER ── */
    #bittu-result {
      display: none;
      text-align: center;
      margin: 8px 0 16px;
      animation: cheer-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes cheer-bounce {
      from { transform: scale(0) rotate(-10deg); opacity: 0; }
      to   { transform: scale(1) rotate(0deg);   opacity: 1; }
    }

    #bittu-result .cheer-text {
      font-size: 13px;
      color: #f472b6;
      font-family: 'Noto Sans Devanagari', sans-serif;
      margin-top: 4px;
    }

  `;
  document.head.appendChild(style);

  // ── SVG ─────────────────────────────────────────────
  function buildBittuSVG() {
    return `<svg class="bittu-cat" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <g id="bittu-tail">
        <path d="M62 58 Q78 45 72 32 Q68 26 64 32 Q70 42 58 52Z" fill="#e8956d" stroke="#c97a52" stroke-width="0.8"/>
      </g>
      <ellipse cx="38" cy="55" rx="24" ry="20" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <ellipse cx="46" cy="58" rx="12" ry="10" fill="#e8956d" opacity="0.7"/>
      <ellipse cx="38" cy="32" rx="19" ry="17" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <ellipse cx="44" cy="28" rx="10" ry="8" fill="#e8956d" opacity="0.65"/>
      <polygon points="22,20 17,6 30,16" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <polygon points="23,19 19,9 29,17" fill="#f4a0a0" opacity="0.6"/>
      <polygon points="48,18 52,5 57,19" fill="#e8956d" stroke="#c97a52" stroke-width="0.8"/>
      <polygon points="49,18 53,9 55,18" fill="#f4a0a0" opacity="0.6"/>
      <g id="bittu-eye-l" style="transform-origin:30px 30px">
        <ellipse cx="30" cy="30" rx="4.5" ry="4" fill="#2d1b4e"/>
        <ellipse cx="31.5" cy="28.5" rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
        <path d="M25.5 30 Q30 26.5 34.5 30" fill="none" stroke="#c8a882" stroke-width="1"/>
      </g>
      <g id="bittu-eye-r" style="transform-origin:46px 30px">
        <ellipse cx="46" cy="30" rx="4.5" ry="4" fill="#2d1b4e"/>
        <ellipse cx="47.5" cy="28.5" rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
        <path d="M41.5 30 Q46 26.5 50.5 30" fill="none" stroke="#c8a882" stroke-width="1"/>
      </g>
      <polygon points="38,36 36,38.5 40,38.5" fill="#f4a0a0"/>
      <path d="M36,38.5 Q34,41 32,40" fill="none" stroke="#c8a882" stroke-width="1" stroke-linecap="round"/>
      <path d="M40,38.5 Q42,41 44,40" fill="none" stroke="#c8a882" stroke-width="1" stroke-linecap="round"/>
      <line x1="18" y1="36" x2="33" y2="38" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="17" y1="39" x2="32" y2="39" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="18" y1="42" x2="33" y2="40" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="58" y1="36" x2="43" y2="38" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="59" y1="39" x2="44" y2="39" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="58" y1="42" x2="43" y2="40" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <ellipse cx="28" cy="73" rx="7" ry="5" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <ellipse cx="44" cy="73" rx="7" ry="5" fill="#e8956d" stroke="#c97a52" stroke-width="0.8"/>
      <ellipse cx="25" cy="75" rx="2" ry="1.5" fill="#e0d8cc"/>
      <ellipse cx="28" cy="76" rx="2" ry="1.5" fill="#e0d8cc"/>
      <ellipse cx="31" cy="75" rx="2" ry="1.5" fill="#e0d8cc"/>
      <ellipse cx="41" cy="75" rx="2" ry="1.5" fill="#c97a52"/>
      <ellipse cx="44" cy="76" rx="2" ry="1.5" fill="#c97a52"/>
      <ellipse cx="47" cy="75" rx="2" ry="1.5" fill="#c97a52"/>
    </svg>`;
  }

  // ── BUILD DOM ───────────────────────────────────────
  var wrap = document.createElement('div');
  wrap.id = 'bittu-wrap';
  wrap.innerHTML = buildBittuSVG() +
    `<div id="bittu-bubble">
       <div class="bubble-name">🐱 बिट्टू</div>
       मी नसले तरी पॉटर नेहमी तुझ्यासाठी आहे.<br>
       खूप अभ्यास कर, Luna.<br>
       नेहमी आनंदी राहा. 💜
       <div class="bubble-heart">🧡</div>
     </div>`;
  document.body.appendChild(wrap);

  var examPeek = document.createElement('div');
  examPeek.id = 'bittu-exam-peek';
  examPeek.innerHTML = buildBittuSVG() +
    `<div id="bittu-exam-bubble">
       <div class="exam-bubble-name">🐱 बिट्टू</div>
       वा Luna! खूप छान!<br>आता थांबू नकोस,<br>शेवटपर्यंत जा!<br>तू करू शकतेस! 💜
     </div>`;
  document.body.appendChild(examPeek);

  var eyes = document.createElement('div');
  eyes.id = 'blink-eyes';
  eyes.innerHTML = '<span class="blink-eye"></span><span class="blink-eye"></span>';
  document.body.appendChild(eyes);

  var cheer = document.createElement('div');
  cheer.id = 'bittu-result';
  cheer.innerHTML = buildBittuSVG() +
    `<div class="cheer-text">बिट्टू खूश आहे! 🎉 Luna, तू सर्वोत्तम आहेस!</div>`;
  document.body.appendChild(cheer);

  // ── BITTU WALK ──────────────────────────────────────
  var bittuShown = false;
  var bittuTimers = [];

  function clearBittuTimers() {
    bittuTimers.forEach(clearTimeout);
    bittuTimers = [];
  }

  function hardResetBittu() {
    clearBittuTimers();
    // Force position reset without animation
    wrap.style.cssText = 'position:fixed;bottom:90px;left:-120px;z-index:5000;display:none;pointer-events:none;';
    wrap.classList.remove('walking', 'sitting', 'walk-in', 'walk-out');
    var b = document.getElementById('bittu-bubble');
    if (b) b.classList.remove('show');
    bittuShown = false;
  }

  function showBittu() {
    if (bittuShown) return;
    bittuShown = true;

    // Reset inline style so CSS transitions work again
    wrap.style.cssText = 'position:fixed;bottom:90px;left:-120px;z-index:5000;display:block;pointer-events:none;';
    wrap.classList.add('walking');

    bittuTimers.push(setTimeout(function () {
      wrap.classList.add('walk-in');
    }, 100));

    bittuTimers.push(setTimeout(function () {
      wrap.classList.remove('walking');
      wrap.classList.add('sitting');
      var b = document.getElementById('bittu-bubble');
      if (b) b.classList.add('show');
    }, 3700));

    // Bubble visible ~9.8s after sitting
    bittuTimers.push(setTimeout(function () {
      var b = document.getElementById('bittu-bubble');
      if (b) b.classList.remove('show');
    }, 13500));

    bittuTimers.push(setTimeout(function () {
      wrap.classList.remove('sitting');
      wrap.classList.add('walking');
      wrap.classList.remove('walk-in');
      wrap.classList.add('walk-out');
    }, 14500));

    bittuTimers.push(setTimeout(function () {
      hardResetBittu();
    }, 17500));
  }

  // ── EXAM PEEK ───────────────────────────────────────
  var examPeekShown = false;
  var examPeekTimers = [];

  function clearExamPeekTimers() {
    examPeekTimers.forEach(clearTimeout);
    examPeekTimers = [];
  }

  function hideExamPeek() {
    clearExamPeekTimers();
    var b = document.getElementById('bittu-exam-bubble');
    if (b) b.classList.remove('show');
    examPeek.classList.remove('peek-down');
    examPeekTimers.push(setTimeout(function () {
      examPeek.style.display = 'none';
      examPeekShown = false;
    }, 800));
  }

  function showExamPeek() {
    if (examPeekShown) return;
    examPeekShown = true;
    examPeek.style.display = 'block';

    examPeekTimers.push(setTimeout(function () {
      examPeek.classList.add('peek-down');
    }, 100));

    examPeekTimers.push(setTimeout(function () {
      var b = document.getElementById('bittu-exam-bubble');
      if (b) b.classList.add('show');
    }, 900));

    examPeekTimers.push(setTimeout(function () {
      var b = document.getElementById('bittu-exam-bubble');
      if (b) b.classList.remove('show');
    }, 7000));

    examPeekTimers.push(setTimeout(function () {
      hideExamPeek();
    }, 8000));
  }

  // ── BLINK EYES ──────────────────────────────────────
  function showBlinkEyes(show) {
    if (show) {
      eyes.style.display = 'block';
      setTimeout(function () { eyes.classList.add('visible'); }, 100);
    } else {
      eyes.classList.remove('visible');
      setTimeout(function () { eyes.style.display = 'none'; }, 1000);
    }
  }

  // ── PAW CONFETTI ────────────────────────────────────
  function launchPawConfetti() {
    var emojis = ['🐾', '🐱', '✨', '💜', '🧡', '⭐', '🌟'];
    for (var i = 0; i < 28; i++) {
      (function (i) {
        setTimeout(function () {
          var paw = document.createElement('div');
          paw.className = 'paw-confetti';
          paw.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          paw.style.left = Math.random() * 100 + 'vw';
          paw.style.top = '-40px';
          var dur = 2.2 + Math.random() * 1.8;
          paw.style.animationDuration = dur + 's';
          document.body.appendChild(paw);
          setTimeout(function () { paw.remove(); }, dur * 1000 + 200);
        }, i * 80);
      })(i);
    }
  }

  // ── RESULT CHEER (65%+ score) ───────────────────────
  function showBittuCheer(scorePct) {
    if (scorePct >= 65) {
      var hero = document.querySelector('.result-hero');
      if (hero && !hero.contains(cheer)) {
        hero.insertBefore(cheer, hero.firstChild);
      }
      cheer.style.display = 'block';
      launchPawConfetti();
      setTimeout(launchPawConfetti, 1500);
    } else {
      cheer.style.display = 'none';
    }
  }

  // ── EXAM PROGRESS WATCHER ───────────────────────────
  var progressWatcher = null;
  var peekTriggeredThisExam = false;

  function startProgressWatch() {
    peekTriggeredThisExam = false;
    clearInterval(progressWatcher);
    progressWatcher = setInterval(function () {
      if (peekTriggeredThisExam) return;
      var answered = Object.keys(window.answers || {}).length;
      var total = (window.questions || []).length;
      if (total > 0 && (answered / total) >= 0.80) {
        peekTriggeredThisExam = true;
        showExamPeek();
      }
    }, 2000);
  }

  function stopProgressWatch() {
    clearInterval(progressWatcher);
    progressWatcher = null;
  }

  // ── SCREEN WATCHER (MutationObserver) ───────────────
  // Watches which .screen gains the 'active' class — no function interception needed
  var lastScreen = '';

  function onScreenChange(screenId) {
    if (screenId === lastScreen) return;
    lastScreen = screenId;

    // Clean up from previous screen
    if (screenId !== 'exam-screen') {
      stopProgressWatch();
      hideExamPeek();
    }
    if (screenId !== 'home-screen') {
      showBlinkEyes(false);
    }
    if (screenId !== 'result-screen') {
      cheer.style.display = 'none';
    }

    // React to new screen
    if (screenId === 'paper-select-screen') {
      hardResetBittu();
      setTimeout(showBittu, 400);
    }

    if (screenId === 'home-screen') {
      hardResetBittu();
      setTimeout(function () { showBlinkEyes(true); }, 800);
    }

    if (screenId === 'exam-screen') {
      startProgressWatch();
    }

    if (screenId === 'result-screen') {
      setTimeout(function () {
        var pctEl = document.getElementById('res-pct');
        if (pctEl) {
          var score = parseInt(pctEl.textContent, 10);
          showBittuCheer(score);
        }
      }, 400);
    }
  }

  // Observe class changes on all .screen elements
  function startObserver() {
    var screens = document.querySelectorAll('.screen');
    var observer = new MutationObserver(function () {
      screens.forEach(function (s) {
        if (s.classList.contains('active')) {
          onScreenChange(s.id);
        }
      });
    });
    screens.forEach(function (s) {
      observer.observe(s, { attributes: true, attributeFilter: ['class'] });
    });

    // Fire immediately for whichever screen is active on load
    screens.forEach(function (s) {
      if (s.classList.contains('active')) {
        onScreenChange(s.id);
      }
    });
  }

  // Start after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }

})();
