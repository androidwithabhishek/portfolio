// ============================================================
// Abhishek Gupta — Portfolio
// Vanilla JS only: mobile nav toggle, smooth scroll, hero code typing
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Hero code-card typing effect ---------- */
  var codeEl = document.getElementById('typedCode');
  var cursorEl = document.getElementById('codeCursor');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lines defined as arrays of [text, tokenClass] so we can color-highlight
  // without needing a syntax-highlighting library.
  var lines = [
    [['class ', 'tok-kw'], ['Developer', 'tok-cls'], [' {', '']],
    [['    val ', 'tok-kw'], ['name', ''], [' = ', ''], ['"Abhishek Gupta"', 'tok-str']],
    [['    val ', 'tok-kw'], ['role', ''], [' = ', ''], ['"Android Developer"', 'tok-str']],
    [['    val ', 'tok-kw'], ['stack', ''], [' = ', ''], ['listOf', 'tok-fn'], ['("Kotlin", "Compose", "MVVM")', 'tok-str']],
    [['', '']],
    [['    fun ', 'tok-kw'], ['buildGreatApps', 'tok-fn'], ['()', ''], [' = ', ''], ['true', 'tok-def']],
    [['}', '']]
  ];

  function renderStatic() {
    var html = '';
    lines.forEach(function (segments) {
      segments.forEach(function (seg) {
        var text = escapeHtml(seg[0]);
        html += seg[1] ? '<span class="' + seg[1] + '">' + text + '</span>' : text;
      });
      html += '\n';
    });
    codeEl.innerHTML = html;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (!codeEl) return;

  if (prefersReducedMotion) {
    renderStatic();
    if (cursorEl) cursorEl.style.display = 'none';
    return;
  }

  // Typing animation: reveal characters progressively while keeping colors
  var flatChars = []; // { char, cls }
  lines.forEach(function (segments, li) {
    segments.forEach(function (seg) {
      seg[0].split('').forEach(function (ch) {
        flatChars.push({ ch: ch, cls: seg[1] });
      });
    });
    if (li < lines.length - 1) flatChars.push({ ch: '\n', cls: '' });
  });

  var i = 0;
  var speed = 16; // ms per character

  function typeStep() {
    if (i > flatChars.length) return;
    var html = '';
    var openSpan = false;
    var currentCls = null;

    for (var idx = 0; idx < i; idx++) {
      var item = flatChars[idx];
      if (item.cls !== currentCls) {
        if (openSpan) html += '</span>';
        if (item.cls) { html += '<span class="' + item.cls + '">'; openSpan = true; }
        else { openSpan = false; }
        currentCls = item.cls;
      }
      html += escapeHtml(item.ch);
    }
    if (openSpan) html += '</span>';

    codeEl.innerHTML = html;
    i++;

    if (i <= flatChars.length) {
      setTimeout(typeStep, speed);
    }
  }

  typeStep();
});
