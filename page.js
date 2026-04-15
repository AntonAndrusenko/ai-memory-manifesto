// ===== THEME TOGGLE =====
(function () {
  var toggle = document.getElementById('theme-toggle');
  var root = document.documentElement;
  var stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (typeof asciiNeedsRestart !== 'undefined') asciiNeedsRestart = true;
    });
  }
})();

// ===== ASCII BACKGROUND =====
var asciiNeedsRestart = false;
(function () {
  var canvas = document.getElementById('ascii-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var chars = 'MEMORY.RECALL.FORGET.RETAIN.INFER.STORE.DELETE.EXPORT.KNOW.ACCESS.PORT.PROVE.CORRECT.CONTEST.EXPIRE.AUDIT.DISCLOSE.CONTROL.SOVEREIGN';
  var pool = chars.split('');
  var fontSize = 13;
  var columns, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(function() { return Math.random() * -100; });
  }

  resize();
  window.addEventListener('resize', resize);

  function getColors() {
    var s = getComputedStyle(document.documentElement);
    return {
      fade: s.getPropertyValue('--ascii-fade').trim(),
      base: s.getPropertyValue('--ascii-base').trim(),
      mid: s.getPropertyValue('--ascii-mid').trim(),
      bright: s.getPropertyValue('--ascii-bright').trim()
    };
  }

  var colors = getColors();

  function draw() {
    if (asciiNeedsRestart) {
      colors = getColors();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < columns; i++) drops[i] = Math.random() * -50;
      asciiNeedsRestart = false;
    }

    ctx.fillStyle = colors.fade;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (var i = 0; i < columns; i++) {
      var char = pool[Math.floor(Math.random() * pool.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      var r = Math.random();
      ctx.fillStyle = r > 0.95 ? colors.bright : r > 0.8 ? colors.mid : colors.base;
      ctx.fillText(char, x, y);
      drops[i] += 0.3 + Math.random() * 0.2;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) drops[i] = 0;
    }
  }

  var frame = 0;
  function loop() {
    frame++;
    if (frame % 3 === 0) draw();
    requestAnimationFrame(loop);
  }
  loop();
})();

// ===== MARKDOWN RENDERER =====
// Fetches a .md file, parses with marked.js, sanitizes with DOMPurify, renders into target
function renderMarkdown(mdPath, targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;

  fetch(mdPath)
    .then(function(res) {
      if (!res.ok) throw new Error('Failed to load ' + mdPath);
      return res.text();
    })
    .then(function(md) {
      // Fix internal links to point to HTML pages instead of .md files
      md = md.replace(/\]\(\.\.\/MANIFESTO\.md\)/g, '](manifesto.html)');
      md = md.replace(/\]\(MANIFESTO\.md\)/g, '](manifesto.html)');
      md = md.replace(/\]\(\.\.\/CONTRIBUTING\.md\)/g, '](contribute.html)');
      md = md.replace(/\]\(CONTRIBUTING\.md\)/g, '](contribute.html)');
      md = md.replace(/\]\(\.\.\/AUTHORS\.md\)/g, '](authors.html)');
      md = md.replace(/\]\(AUTHORS\.md\)/g, '](authors.html)');

      if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        var rawHtml = marked.parse(md);
        target.innerHTML = DOMPurify.sanitize(rawHtml, { ADD_ATTR: ['target'] });
      } else {
        target.textContent = md;
      }
    })
    .catch(function() {
      target.textContent = 'Failed to load content. View the source file at ' + mdPath;
    });
}
