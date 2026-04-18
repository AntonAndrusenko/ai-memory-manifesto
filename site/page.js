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
    });
  }
})();

// ===== MOBILE NAV TOGGLE =====
(function () {
  var hamburger = document.getElementById('nav-hamburger');
  var panel = document.getElementById('mobile-nav-panel');
  if (!hamburger || !panel) return;

  hamburger.addEventListener('click', function () {
    panel.classList.toggle('open');
  });

  document.addEventListener('click', function (e) {
    if (!panel.contains(e.target) && !hamburger.contains(e.target)) {
      panel.classList.remove('open');
    }
  });
})();


// ===== MARKDOWN RENDERER =====
// GitHub repo config
var GITHUB_REPO = 'AntonAndrusenko/ai-memory-manifesto';
var GITHUB_BRANCH = 'main';
var GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/' + GITHUB_REPO + '/' + GITHUB_BRANCH + '/';

// Fetches a .md file from GitHub (with local fallback), parses, sanitizes, renders.
// NOTE: innerHTML is used here but content is sanitized via DOMPurify before injection.
// Returns a promise that resolves when rendering is complete.
function renderMarkdown(mdPath, targetId) {
  var target = document.getElementById(targetId);
  if (!target) return Promise.resolve();

  var githubUrl = GITHUB_RAW_BASE + mdPath;

  // Try GitHub first, fall back to local
  return fetch(githubUrl)
    .then(function(res) {
      if (!res.ok) throw new Error('GitHub fetch failed');
      return res.text();
    })
    .catch(function() {
      return fetch(mdPath).then(function(res) {
        if (!res.ok) throw new Error('Local fetch failed');
        return res.text();
      });
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
        // Sanitized via DOMPurify to prevent XSS
        target.innerHTML = DOMPurify.sanitize(rawHtml, { ADD_ATTR: ['target'] });
      } else {
        target.textContent = md;
      }

      // Fire custom event so other scripts can hook into render completion
      target.dispatchEvent(new CustomEvent('markdown-rendered', { bubbles: true }));
    })
    .catch(function() {
      target.textContent = 'Failed to load content. View the source at github.com/' + GITHUB_REPO;
    });
}
