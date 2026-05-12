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
      transition: left 3.5s cubic-bezier(0.4, 0, 0.6, 1);
    }

    #bittu-wrap.walk-in {
      left: calc(50% - 40px);
      transition: left 3.5s cubic-bezier(0.4, 0, 0.6, 1);
    }

    #bittu-wrap.walk-out {
      left: calc(100% + 120px);
      transition: left 2.5s cubic-bezier(0.4, 0, 0.6, 1);
    }

    /* Bittu SVG cat body */
    .bittu-cat {
      width: 80px;
      height: 80px;
      position: relative;
      filter: drop-shadow(0 4px 12px rgba(167,139,250,0.4));
    }

    /* Paw bounce walking animation */
    #bittu-wrap.walking .bittu-cat {
      animation: bittu-walk 0.4s steps(1) infinite;
    }

    @keyframes bittu-walk {
      0%   { transform: translateY(0px) rotate(-1deg); }
      50%  { transform: translateY(-4px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(-1deg); }
    }

    /* Sitting animation */
    #bittu-wrap.sitting .bittu-cat {
      animation: bittu-sit 3s ease-in-out infinite;
    }

    @keyframes bittu-sit {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-3px); }
    }

    /* Tail wag */
    #bittu-tail {
      transform-origin: top center;
    }

    #bittu-wrap.sitting #bittu-tail {
      animation: tail-wag 1.2s ease-in-out infinite;
    }

    @keyframes tail-wag {
      0%, 100% { transform: rotate(-20deg); }
      50%       { transform: rotate(20deg); }
    }

    /* Eye blink */
    #bittu-wrap.sitting #bittu-eye-l,
    #bittu-wrap.sitting #bittu-eye-r {
      animation: eye-blink 4s ease-in-out infinite;
    }

    @keyframes eye-blink {
      0%, 90%, 100% { transform: scaleY(1); }
      95%            { transform: scaleY(0.1); }
    }

    /* ── BITTU MESSAGE BUBBLE ── */
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
      width: 0;
      height: 0;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top: 9px solid rgba(167,139,250,0.5);
    }

    #bittu-bubble .bubble-name {
      font-size: 11px;
      color: #f472b6;
      font-weight: 600;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
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

    /* ── BLINKING CAT EYES (home screen) ── */
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

    #blink-eyes.visible {
      opacity: 0.5;
    }

    .blink-eye {
      width: 10px;
      height: 10px;
      background: #a78bfa;
      border-radius: 50%;
      display: inline-block;
      margin: 0 5px;
      box-shadow: 0 0 8px #a78bfa;
      animation: slow-blink 5s ease-in-out infinite;
    }

    .blink-eye:nth-child(2) {
      animation-delay: 0.1s;
    }

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

    /* ── RESULT BITTU CHEER ── */
    #bittu-result {
      display: none;
      text-align: center;
      margin: 8px 0 16px;
      animation: cheer-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes cheer-bounce {
      from { transform: scale(0) rotate(-10deg); opacity: 0; }
      to   { transform: scale(1) rotate(0deg); opacity: 1; }
    }

    #bittu-result .cheer-text {
      font-size: 13px;
      color: #f472b6;
      font-family: 'Noto Sans Devanagari', sans-serif;
      margin-top: 4px;
    }

  `;
  document.head.appendChild(style);

  // ── BUILD BITTU SVG CAT ─────────────────────────────
  // White body with ginger patches — simple but charming
  function buildBittuSVG() {
    return `
    <svg class="bittu-cat" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail -->
      <g id="bittu-tail">
        <path d="M62 58 Q78 45 72 32 Q68 26 64 32 Q70 42 58 52Z"
              fill="#e8956d" stroke="#c97a52" stroke-width="0.8"/>
      </g>
      <!-- Body -->
      <ellipse cx="38" cy="55" rx="24" ry="20" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <!-- Ginger patch on body -->
      <ellipse cx="46" cy="58" rx="12" ry="10" fill="#e8956d" opacity="0.7"/>
      <!-- Head -->
      <ellipse cx="38" cy="32" rx="19" ry="17" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <!-- Ginger patch on head -->
      <ellipse cx="44" cy="28" rx="10" ry="8" fill="#e8956d" opacity="0.65"/>
      <!-- Left ear -->
      <polygon points="22,20 17,6 30,16" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <polygon points="23,19 19,9 29,17" fill="#f4a0a0" opacity="0.6"/>
      <!-- Right ear -->
      <polygon points="48,18 52,5 57,19" fill="#e8956d" stroke="#c97a52" stroke-width="0.8"/>
      <polygon points="49,18 53,9 55,18" fill="#f4a0a0" opacity="0.6"/>
      <!-- Eyes -->
      <g id="bittu-eye-l" style="transform-origin: 30px 30px;">
        <ellipse cx="30" cy="30" rx="4.5" ry="4" fill="#2d1b4e"/>
        <ellipse cx="31.5" cy="28.5" rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
        <!-- Eyelid -->
        <path d="M25.5 30 Q30 26.5 34.5 30" fill="none" stroke="#c8a882" stroke-width="1"/>
      </g>
      <g id="bittu-eye-r" style="transform-origin: 46px 30px;">
        <ellipse cx="46" cy="30" rx="4.5" ry="4" fill="#2d1b4e"/>
        <ellipse cx="47.5" cy="28.5" rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
        <path d="M41.5 30 Q46 26.5 50.5 30" fill="none" stroke="#c8a882" stroke-width="1"/>
      </g>
      <!-- Nose -->
      <polygon points="38,36 36,38.5 40,38.5" fill="#f4a0a0"/>
      <!-- Mouth -->
      <path d="M36,38.5 Q34,41 32,40" fill="none" stroke="#c8a882" stroke-width="1" stroke-linecap="round"/>
      <path d="M40,38.5 Q42,41 44,40" fill="none" stroke="#c8a882" stroke-width="1" stroke-linecap="round"/>
      <!-- Whiskers left -->
      <line x1="18" y1="36" x2="33" y2="38" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="17" y1="39" x2="32" y2="39" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="18" y1="42" x2="33" y2="40" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <!-- Whiskers right -->
      <line x1="58" y1="36" x2="43" y2="38" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="59" y1="39" x2="44" y2="39" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <line x1="58" y1="42" x2="43" y2="40" stroke="#c8a882" stroke-width="0.8" opacity="0.7"/>
      <!-- Front paws -->
      <ellipse cx="28" cy="73" rx="7" ry="5" fill="#f5f0e8" stroke="#e0d8cc" stroke-width="0.8"/>
      <ellipse cx="44" cy="73" rx="7" ry="5" fill="#e8956d" stroke="#c97a52" stroke-width="0.8"/>
      <!-- Paw toes -->
      <ellipse cx="25" cy="75" rx="2" ry="1.5" fill="#e0d8cc"/>
      <ellipse cx="28" cy="76" rx="2" ry="1.5" fill="#e0d8cc"/>
      <ellipse cx="31" cy="75" rx="2" ry="1.5" fill="#e0d8cc"/>
      <ellipse cx="41" cy="75" rx="2" ry="1.5" fill="#c97a52"/>
      <ellipse cx="44" cy="76" rx="2" ry="1.5" fill="#c97a52"/>
      <ellipse cx="47" cy="75" rx="2" ry="1.5" fill="#c97a52"/>
    </svg>
    `;
  }

  // ── CREATE BITTU DOM ────────────────────────────────
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

  // ── BLINK EYES DOM ─────────────────────────────────
  var eyes = document.createElement('div');
  eyes.id = 'blink-eyes';
  eyes.innerHTML = '<span class="blink-eye"></span><span class="blink-eye"></span>';
  document.body.appendChild(eyes);

  // ── RESULT CHEER DOM ───────────────────────────────
  var cheer = document.createElement('div');
  cheer.id = 'bittu-result';
  cheer.innerHTML = buildBittuSVG() +
    `<div class="cheer-text">बिट्टू खूश आहे! 🎉 Luna, तू सर्वोत्तम आहेस!</div>`;
  document.body.appendChild(cheer);

  // ── BITTU WALK SEQUENCE ────────────────────────────
  var bittuShown = false;

  function showBittu() {
    if (bittuShown) return;
    bittuShown = true;

    wrap.style.display = 'block';
    wrap.classList.add('walking');

    // Step 1: Walk in
    setTimeout(function () {
      wrap.classList.add('walk-in');
    }, 100);

    // Step 2: Sit and show bubble
    setTimeout(function () {
      wrap.classList.remove('walking');
      wrap.classList.add('sitting');
      document.getElementById('bittu-bubble').classList.add('show');
    }, 3700);

    // Step 3: Hide bubble after longer delay (~13000ms)
    setTimeout(function () {
      document.getElementById('bittu-bubble').classList.remove('show');
    }, 13000);   // changed from 8500 to 13000

    // Step 4: Walk out after bubble is hidden (give extra 500ms)
    setTimeout(function () {
      wrap.classList.remove('sitting');
      wrap.classList.add('walking');
      wrap.classList.remove('walk-in');
      wrap.classList.add('walk-out');
    }, 13500);   // changed from 9200 to 13500

    // Step 5: Reset for next visit
    setTimeout(function () {
      wrap.style.display = 'none';
      wrap.classList.remove('walking', 'sitting', 'walk-out');
      wrap.style.left = '-120px';
      bittuShown = false;
    }, 17000);   // adjust final cleanup (13500 + 3500 walk)

  // ── BLINK EYES (home screen only) ──────────────────
  function showBlinkEyes(show) {
    if (show) {
      eyes.style.display = 'block';
      setTimeout(function () { eyes.classList.add('visible'); }, 100);
    } else {
      eyes.classList.remove('visible');
      setTimeout(function () { eyes.style.display = 'none'; }, 1000);
    }
  }

  // ── PAW CONFETTI ───────────────────────────────────
  function launchPawConfetti() {
    var emojis = ['🐾', '🐱', '✨', '💜', '🧡', '⭐', '🌟'];
    var count = 28;
    for (var i = 0; i < count; i++) {
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

  // ── RESULT CHEER (80% of questions ANSWERED) ────────────
  function showBittuCheer(answeredRatio) {
    if (answeredRatio >= 0.8) {
      // Insert cheer above result title
      var hero = document.querySelector('.result-hero');
      if (hero && !hero.contains(cheer)) {
        hero.insertBefore(cheer, hero.firstChild);
      }
      cheer.style.display = 'block';
      launchPawConfetti();
      // Second wave of confetti
      setTimeout(launchPawConfetti, 1500);
    } else {
      cheer.style.display = 'none';
    }
  }

  // ── HOOK INTO APP SCREENS ──────────────────────────
  // Watch for screen changes by intercepting showScreen
  var originalShowScreen = window.showScreen;
  window.showScreen = function (id) {
    originalShowScreen(id);

    if (id === 'paper-select-screen') {
      showBlinkEyes(false);
      setTimeout(showBittu, 1200);
    }

    if (id === 'home-screen') {
      setTimeout(function () {
        showBlinkEyes(true);
      }, 800);
    } else {
      showBlinkEyes(false);
    }

    if (id === 'result-screen') {
      setTimeout(function () {
        // Use the global answers and questions objects (from app.js)
        if (typeof questions !== 'undefined' && typeof answers !== 'undefined') {
          var answeredCount = Object.keys(answers).length;
          var totalQuestions = questions.length;
          var answeredRatio = answeredCount / totalQuestions;
          showBittuCheer(answeredRatio);
        } else {
          // fallback to old pct (just in case)
          var pctEl = document.getElementById('res-pct');
          if (pctEl) {
            var pct = parseInt(pctEl.textContent, 10);
            showBittuCheer(pct / 100);
          }
        }
      }, 400);
    } else {
      cheer.style.display = 'none';
    }
  };

  // Show Bittu on first load of paper-select-screen
  window.addEventListener('load', function () {
    var paperScreen = document.getElementById('paper-select-screen');
    if (paperScreen && paperScreen.classList.contains('active')) {
      setTimeout(showBittu, 1800);
    }
  });

})();
