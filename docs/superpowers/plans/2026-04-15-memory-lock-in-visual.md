# Memory Lock-In Scroll-Reveal Visual — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a vertical scroll-reveal section between the hero and beliefs that visualizes AI memory lock-in — a simulated chat input with typing animation, labeled personal details flowing into a locked vault vs. a thin memory.md export.

**Architecture:** Single new section in `index.html` with inline CSS and JS (matching existing pattern). Three subsystems: the chat typing engine (JS), the fragment stream with mouse parallax (CSS + JS), and the vault/export split (HTML + CSS + JS counter). All styles scoped under `.memory-reveal` using existing CSS custom properties.

**Tech Stack:** Vanilla HTML, CSS, JS. No dependencies. Uses existing `IntersectionObserver` scroll-reveal pattern, existing font stack (Instrument Serif, JetBrains Mono, DM Sans), existing CSS custom properties for theme support.

**Spec:** `docs/superpowers/specs/2026-04-15-memory-lock-in-visual-design.md`

---

### File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `index.html` (CSS section, ~line 697) | Add `.memory-reveal` styles |
| Modify | `index.html` (HTML, between hero and first divider, ~line 757) | Add section HTML structure |
| Modify | `index.html` (JS section, ~line 833) | Add typing engine, stream, parallax, counter |

No new files. Everything lives in `index.html` consistent with the existing single-file architecture.

---

### Task 1: Add the HTML skeleton and section opener

**Files:**
- Modify: `index.html:757` (insert after `</div>` closing hero, before first `<div class="divider">`)

- [ ] **Step 1: Insert the section HTML**

Find the closing `</div>` of `.hero` and the first `<div class="divider">`. Insert between them:

```html
<!-- ===== MEMORY LOCK-IN REVEAL ===== -->
<section class="memory-reveal">
  <div class="mr-container">

    <!-- Opener -->
    <p class="mr-opener reveal">Every conversation leaves a trace.</p>

    <!-- Chat Input Simulation -->
    <div class="mr-chat reveal">
      <div class="mr-chat-box">
        <div class="mr-chat-messages">
          <div class="mr-msg-area">
            <span class="mr-cursor"></span>
          </div>
        </div>
        <div class="mr-chat-bar">
          <button class="mr-attach" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <span class="mr-placeholder">Message AI...</span>
          <button class="mr-send" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-1.41 1.41L16.17 9H4v2h12.17l-5.58 5.59L12 18l8-8z" transform="rotate(-90 12 12)"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Fragment Stream -->
    <div class="mr-stream reveal">
      <!-- Pills injected by JS -->
    </div>

    <!-- Fork point -->
    <div class="mr-fork reveal">
      <div class="mr-fork-line"></div>
      <svg class="mr-fork-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      <div class="mr-fork-line"></div>
    </div>

    <!-- Split: Vault vs Export -->
    <div class="mr-split reveal">

      <!-- The Vault -->
      <div class="mr-vault">
        <div class="mr-vault-bar">
          <div class="mr-dots"><span></span><span></span><span></span></div>
          <div class="mr-vault-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-lock-sm"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Provider Memory
          </div>
          <div class="mr-dots-spacer"></div>
        </div>
        <div class="mr-vault-body">
          <div class="mr-vault-pills">
            <span class="mr-vpill" style="--r:-1.5deg">emotion: overwhelmed</span>
            <span class="mr-vpill" style="--r:0.8deg">life event: divorce</span>
            <span class="mr-vpill" style="--r:-0.5deg">intent: resignation</span>
            <span class="mr-vpill" style="--r:1.2deg">employer: Meridian Corp</span>
            <span class="mr-vpill" style="--r:-1deg">health: ADHD diagnosis</span>
            <span class="mr-vpill" style="--r:0.3deg">family: parent</span>
            <span class="mr-vpill" style="--r:1.8deg">idea: therapist platform</span>
            <span class="mr-vpill" style="--r:-0.7deg">business: independent therapists</span>
            <span class="mr-vpill" style="--r:0.5deg">emotion: falling in love</span>
            <span class="mr-vpill" style="--r:-1.3deg">relationship: best friend</span>
            <span class="mr-vpill" style="--r:1deg">preference: dark mode</span>
            <span class="mr-vpill" style="--r:-0.4deg">routine: morning journal</span>
            <span class="mr-vpill" style="--r:1.5deg">fear: custody battle</span>
            <span class="mr-vpill" style="--r:-0.9deg">goal: career change</span>
            <span class="mr-vpill" style="--r:0.6deg">health: anxiety</span>
            <span class="mr-vpill" style="--r:-1.7deg">finance: savings concern</span>
            <span class="mr-vpill" style="--r:0.2deg">belief: therapy works</span>
            <span class="mr-vpill" style="--r:1.3deg">location: Bay Area</span>
            <span class="mr-vpill" style="--r:-0.6deg">habit: late nights</span>
            <span class="mr-vpill" style="--r:0.9deg">emotion: lonely</span>
            <span class="mr-vpill" style="--r:-1.1deg">social: few close friends</span>
            <span class="mr-vpill" style="--r:1.6deg">intent: find therapist</span>
            <span class="mr-vpill" style="--r:-0.2deg">family: son age 8</span>
            <span class="mr-vpill" style="--r:0.7deg">media: reads Stoic philosophy</span>
            <span class="mr-vpill" style="--r:-1.4deg">work: senior engineer</span>
            <span class="mr-vpill" style="--r:1.1deg">conflict: work-life balance</span>
            <span class="mr-vpill" style="--r:-0.8deg">dream: write a book</span>
            <span class="mr-vpill" style="--r:0.4deg">health: insomnia</span>
            <span class="mr-vpill" style="--r:-1.6deg">relationship: complicated</span>
            <span class="mr-vpill" style="--r:1.4deg">coping: running</span>
            <span class="mr-vpill" style="--r:-0.3deg">emotion: hopeful</span>
            <span class="mr-vpill" style="--r:0.1deg">parenting: ADHD support</span>
            <span class="mr-vpill" style="--r:-1.8deg">identity: introvert</span>
            <span class="mr-vpill" style="--r:1.7deg">plan: move cities</span>
            <span class="mr-vpill" style="--r:-0.1deg">tech: React developer</span>
            <span class="mr-vpill" style="--r:0.8deg">fear: being vulnerable</span>
            <span class="mr-vpill" style="--r:-1.2deg">memory: childhood</span>
            <span class="mr-vpill" style="--r:1.9deg">value: independence</span>
            <span class="mr-vpill" style="--r:-0.5deg">emotion: grieving</span>
            <span class="mr-vpill" style="--r:0.3deg">aspiration: startup founder</span>
          </div>
          <div class="mr-vault-frost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-lock-lg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <span>Access denied</span>
          </div>
        </div>
        <div class="mr-vault-footer">
          <span class="mr-counter" data-start="1200" data-end="1260">1,247</span> personal details retained &middot; No export available
        </div>
      </div>

      <!-- Your Export -->
      <div class="mr-export">
        <div class="mr-export-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-file-icon"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          memory.md
        </div>
        <div class="mr-export-body">
          <code>- Prefers dark mode</code>
          <code>- Has a child</code>
          <code>- Interested in startups</code>
        </div>
        <div class="mr-export-footer">3 items visible to you</div>
      </div>

    </div>

    <!-- Punchline -->
    <p class="mr-punchline reveal">They remember everything. You own almost nothing.</p>

  </div>
</section>
```

- [ ] **Step 2: Verify HTML is valid**

Open the page in a browser. The section should appear (unstyled) between the hero and beliefs. Confirm no layout breakage.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add memory lock-in reveal section HTML skeleton"
```

---

### Task 2: Add the CSS for the section layout, opener, and chat input

**Files:**
- Modify: `index.html` (inside `<style>` block, before the `/* ===== SCROLL REVEAL =====*/` comment at ~line 658)

- [ ] **Step 1: Add the section container and opener styles**

Insert before the scroll-reveal styles:

```css
/* ===== MEMORY LOCK-IN REVEAL ===== */
.memory-reveal {
  padding: 60px 0 100px;
  position: relative;
}

.mr-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mr-opener {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2.5vw, 1.6rem);
  font-style: italic;
  color: var(--text);
  text-align: center;
  margin-bottom: 48px;
}
```

- [ ] **Step 2: Add the chat input styles**

```css
/* Chat input simulation */
.mr-chat {
  width: 100%;
  max-width: 680px;
  margin-bottom: 64px;
}

.mr-chat-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.mr-chat-messages {
  padding: 20px 24px 8px;
  min-height: 56px;
}

.mr-msg-area {
  font-family: var(--sans);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  position: relative;
  min-height: 1.6em;
}

.mr-msg-area .mr-highlight {
  background: var(--accent-glow);
  color: var(--accent);
  border-radius: 2px;
  padding: 0 2px;
  position: relative;
}

.mr-msg-area .mr-label {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--mono);
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--accent);
  background: var(--surface);
  border: 1px solid rgba(232, 101, 74, 0.3);
  border-radius: 4px;
  padding: 2px 8px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

[data-theme="light"] .mr-msg-area .mr-label {
  border-color: rgba(181, 57, 33, 0.3);
}

.mr-msg-area .mr-label.visible {
  opacity: 1;
}

.mr-msg-area .mr-label::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 4px;
  background: var(--accent);
  opacity: 0.3;
}

.mr-cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--accent);
  vertical-align: text-bottom;
  animation: mrBlink 1s step-end infinite;
}

@keyframes mrBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.mr-chat-bar {
  display: flex;
  align-items: center;
  padding: 8px 12px 12px;
  gap: 8px;
}

.mr-attach,
.mr-send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: default;
  transition: background 0.2s;
}

.mr-attach {
  background: transparent;
  color: var(--dim);
}

.mr-attach svg {
  width: 18px;
  height: 18px;
}

.mr-placeholder {
  flex: 1;
  font-family: var(--sans);
  font-size: 0.9rem;
  color: var(--dim);
  opacity: 0;
  transition: opacity 0.3s;
}

.mr-placeholder.visible {
  opacity: 1;
}

.mr-send {
  background: var(--accent);
  color: #fff;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.mr-send.active {
  opacity: 1;
}

.mr-send svg {
  width: 16px;
  height: 16px;
}
```

- [ ] **Step 3: Verify in browser**

The chat input should appear as a dark rounded box with the blinking cursor, the attach icon on the left, send button on the right. Should look high-fidelity in both dark and light themes.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add CSS for memory-reveal section layout and chat input"
```

---

### Task 3: Add the CSS for stream, fork, split, vault, export, and punchline

**Files:**
- Modify: `index.html` (append to the memory-reveal CSS block from Task 2)

- [ ] **Step 1: Add stream and fork styles**

```css
/* Fragment stream */
.mr-stream {
  width: 100%;
  max-width: 400px;
  height: 280px;
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
}

.mr-pill {
  position: absolute;
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--accent);
  background: var(--surface);
  border: 1px solid rgba(232, 101, 74, 0.25);
  border-radius: 4px;
  padding: 3px 10px;
  white-space: nowrap;
  box-shadow: 0 0 12px var(--accent-glow);
  opacity: 0;
  animation: mrDrift 4s ease-in forwards;
  pointer-events: none;
}

[data-theme="light"] .mr-pill {
  border-color: rgba(181, 57, 33, 0.25);
}

@keyframes mrDrift {
  0%   { opacity: 0; transform: translateY(0); }
  10%  { opacity: 0.9; }
  80%  { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(260px); }
}

/* Fork */
.mr-fork {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 680px;
  margin-bottom: 40px;
}

.mr-fork-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.mr-fork-chevron {
  width: 20px;
  height: 20px;
  color: var(--dim);
}
```

- [ ] **Step 2: Add split, vault, and export styles**

```css
/* Split layout */
.mr-split {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 680px;
  margin-bottom: 80px;
  align-items: flex-start;
}

/* Vault */
.mr-vault {
  flex: 7;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  overflow: hidden;
  animation: mrPulseGlow 4s ease-in-out infinite;
}

@keyframes mrPulseGlow {
  0%, 100% { box-shadow: 0 0 0px transparent; }
  50%      { box-shadow: 0 0 30px var(--accent-glow); }
}

.mr-vault-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.mr-dots {
  display: flex;
  gap: 6px;
}

.mr-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}

.mr-dots-spacer {
  width: 44px;
}

.mr-vault-title {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--dim);
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.05em;
}

.mr-lock-sm {
  width: 12px;
  height: 12px;
}

.mr-vault-body {
  position: relative;
  padding: 20px 16px;
  min-height: 180px;
}

.mr-vault-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  line-height: 1;
}

.mr-vpill {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--accent);
  background: var(--surface);
  border: 1px solid rgba(232, 101, 74, 0.2);
  border-radius: 3px;
  padding: 3px 8px;
  white-space: nowrap;
  transform: rotate(var(--r, 0deg));
  opacity: 0.8;
}

[data-theme="light"] .mr-vpill {
  border-color: rgba(181, 57, 33, 0.2);
}

.mr-vault-frost {
  position: absolute;
  inset: 0;
  background: var(--surface);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.mr-lock-lg {
  width: 40px;
  height: 40px;
  color: var(--dim);
}

.mr-vault-frost span {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--dim);
  letter-spacing: 0.08em;
}

.mr-vault-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--dim);
  letter-spacing: 0.03em;
}

.mr-counter {
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

/* Export card */
.mr-export {
  flex: 3;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  overflow: hidden;
}

.mr-export-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--dim);
  letter-spacing: 0.05em;
}

.mr-file-icon {
  width: 12px;
  height: 12px;
}

.mr-export-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mr-export-body code {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--muted);
  background: none;
  border: none;
  padding: 0;
  line-height: 1.6;
}

.mr-export-footer {
  padding: 10px 14px;
  border-top: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--dim);
  letter-spacing: 0.03em;
}
```

- [ ] **Step 3: Add punchline and responsive styles**

```css
/* Punchline */
.mr-punchline {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2.5vw, 1.6rem);
  font-style: italic;
  color: var(--text);
  text-align: center;
  max-width: 520px;
}

/* Responsive */
@media (max-width: 600px) {
  .mr-split {
    flex-direction: column;
  }

  .mr-vault {
    flex: none;
    width: 100%;
  }

  .mr-export {
    flex: none;
    width: 100%;
  }

  .mr-chat-messages {
    padding: 16px 18px 6px;
  }

  .mr-msg-area {
    font-size: 0.9rem;
  }

  .mr-stream {
    max-width: 280px;
  }
}
```

- [ ] **Step 4: Verify in browser**

Check both dark and light themes. The vault should show frosted pills behind the lock, the export card should look minimal, the split should be 70/30 on desktop and stacked on mobile. The punchline should be centered below.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add CSS for stream, vault, export, and responsive layout"
```

---

### Task 4: Add the typing animation engine

**Files:**
- Modify: `index.html` (add new `<script>` block before the existing theme toggle script at ~line 833)

- [ ] **Step 1: Add the typing engine JavaScript**

Insert a new `<script>` block right before the existing `<script>` that handles theme toggle:

```javascript
// ===== MEMORY REVEAL: TYPING ENGINE =====
(function () {
  var msgArea = document.querySelector('.mr-msg-area');
  var placeholder = document.querySelector('.mr-placeholder');
  var sendBtn = document.querySelector('.mr-send');
  if (!msgArea) return;

  var messages = [
    {
      text: "I've been feeling overwhelmed since the divorce, can you help me think through next steps...",
      highlights: [
        { phrase: 'feeling overwhelmed', label: 'emotion' },
        { phrase: 'the divorce', label: 'life event' }
      ]
    },
    {
      text: "Can you help me draft a resignation letter for my job at Meridian Corp?",
      highlights: [
        { phrase: 'resignation letter', label: 'intent' },
        { phrase: 'Meridian Corp', label: 'employer' }
      ]
    },
    {
      text: "My son was diagnosed with ADHD last week. What should I know as a parent?",
      highlights: [
        { phrase: 'diagnosed with ADHD', label: 'health' },
        { phrase: 'as a parent', label: 'family' }
      ]
    },
    {
      text: "Here's my startup idea \u2014 a platform that connects independent therapists with underserved communities...",
      highlights: [
        { phrase: 'startup idea', label: 'idea' },
        { phrase: 'independent therapists', label: 'business plan' }
      ]
    },
    {
      text: "I think I'm falling in love with my best friend and I don't know what to do...",
      highlights: [
        { phrase: 'falling in love', label: 'emotion' },
        { phrase: 'my best friend', label: 'relationship' }
      ]
    }
  ];

  var msgIndex = 0;

  function showPlaceholder(show) {
    if (placeholder) placeholder.classList.toggle('visible', show);
    if (sendBtn) sendBtn.classList.toggle('active', !show);
  }

  function typeMessage() {
    var msg = messages[msgIndex];
    showPlaceholder(false);

    // Clear previous content, keep cursor
    var cursor = msgArea.querySelector('.mr-cursor');
    while (msgArea.firstChild) msgArea.removeChild(msgArea.firstChild);
    msgArea.appendChild(cursor);

    var charIndex = 0;

    function typeChar() {
      if (charIndex < msg.text.length) {
        // Insert character before cursor
        var textNode = document.createTextNode(msg.text[charIndex]);
        msgArea.insertBefore(textNode, cursor);
        charIndex++;

        // Variable delay: slower at punctuation
        var ch = msg.text[charIndex - 1];
        var delay = 25 + Math.random() * 25;
        if (ch === ',' || ch === '.') delay = 400;
        else if (ch === '\u2014') delay = 300;
        else if (ch === '?' || ch === '!') delay = 500;

        setTimeout(typeChar, delay);
      } else {
        // Typing done — apply highlights
        setTimeout(function () { applyHighlights(msg); }, 400);
      }
    }

    typeChar();
  }

  function applyHighlights(msg) {
    var cursor = msgArea.querySelector('.mr-cursor');
    var fullText = msg.text;

    // Build DOM with highlights using safe DOM methods
    while (msgArea.firstChild) msgArea.removeChild(msgArea.firstChild);

    // Find highlight positions
    var regions = [];
    msg.highlights.forEach(function (h) {
      var idx = fullText.indexOf(h.phrase);
      if (idx !== -1) {
        regions.push({ start: idx, end: idx + h.phrase.length, label: h.label, phrase: h.phrase });
      }
    });
    regions.sort(function (a, b) { return a.start - b.start; });

    var pos = 0;
    regions.forEach(function (r) {
      // Text before highlight
      if (r.start > pos) {
        msgArea.appendChild(document.createTextNode(fullText.slice(pos, r.start)));
      }
      // Highlighted span
      var hlSpan = document.createElement('span');
      hlSpan.className = 'mr-highlight';

      var labelSpan = document.createElement('span');
      labelSpan.className = 'mr-label';
      labelSpan.textContent = r.label;
      hlSpan.appendChild(labelSpan);

      hlSpan.appendChild(document.createTextNode(r.phrase));
      msgArea.appendChild(hlSpan);
      pos = r.end;
    });

    // Remaining text
    if (pos < fullText.length) {
      msgArea.appendChild(document.createTextNode(fullText.slice(pos)));
    }

    // Re-append cursor
    msgArea.appendChild(cursor);

    // Stagger label reveals
    var labels = msgArea.querySelectorAll('.mr-label');
    labels.forEach(function (label, i) {
      setTimeout(function () { label.classList.add('visible'); }, i * 350);
    });

    // After labels shown, emit pills and transition
    var holdTime = labels.length * 350 + 1500;
    setTimeout(function () {
      emitPills(msg);
    }, holdTime - 800);

    setTimeout(function () {
      // Fade out message
      msgArea.style.opacity = '0';
      setTimeout(function () {
        msgArea.style.opacity = '1';
        msgIndex = (msgIndex + 1) % messages.length;
        showPlaceholder(true);
        // Brief placeholder visible
        setTimeout(function () {
          typeMessage();
        }, 800);
      }, 400);
    }, holdTime);
  }

  // Emit pills into the stream
  function emitPills(msg) {
    var stream = document.querySelector('.mr-stream');
    if (!stream) return;

    msg.highlights.forEach(function (h, i) {
      setTimeout(function () {
        var pill = document.createElement('span');
        pill.className = 'mr-pill';
        pill.textContent = h.label + ': ' + h.phrase.split(' ').slice(0, 3).join(' ');
        // Random horizontal offset
        pill.style.left = (20 + Math.random() * 60) + '%';
        pill.style.top = '0px';
        stream.appendChild(pill);

        // Remove after animation completes
        pill.addEventListener('animationend', function () {
          pill.remove();
        });
      }, i * 300);
    });
  }

  // Start when chat input enters viewport
  var chatEl = document.querySelector('.mr-chat');
  var started = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !started) {
        started = true;
        showPlaceholder(true);
        setTimeout(typeMessage, 600);
      }
    });
  }, { threshold: 0.3 });

  if (chatEl) observer.observe(chatEl);
})();
```

- [ ] **Step 2: Verify in browser**

The chat input should start typing when it scrolls into view. Messages should type character-by-character, highlights should appear with labels, then the message should fade and the next one begins. Pills should appear in the stream area and drift downward.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add typing animation engine and pill emission"
```

---

### Task 5: Add mouse parallax and vault counter

**Files:**
- Modify: `index.html` (add after the typing engine script from Task 4)

- [ ] **Step 1: Add mouse parallax for stream pills**

Add a new script block after the typing engine:

```javascript
// ===== MEMORY REVEAL: MOUSE PARALLAX =====
(function () {
  var stream = document.querySelector('.mr-stream');
  if (!stream) return;

  var ticking = false;
  stream.addEventListener('mousemove', function (e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var rect = stream.getBoundingClientRect();
      var offsetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      var pills = stream.querySelectorAll('.mr-pill');
      pills.forEach(function (pill) {
        pill.style.marginLeft = (offsetX * 10) + 'px';
      });
      ticking = false;
    });
  }, { passive: true });
})();
```

- [ ] **Step 2: Add vault counter animation**

Add another script block:

```javascript
// ===== MEMORY REVEAL: VAULT COUNTER =====
(function () {
  var counter = document.querySelector('.mr-counter');
  if (!counter) return;

  var start = parseInt(counter.dataset.start, 10);
  var end = parseInt(counter.dataset.end, 10);
  var running = false;
  var duration = 10000;

  function formatNumber(n) {
    return n.toLocaleString('en-US');
  }

  function animateCounter() {
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(start + (end - start) * progress);
      counter.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(animateCounter, 2000);
      }
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !running) {
        running = true;
        animateCounter();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(counter);
})();
```

- [ ] **Step 3: Verify in browser**

- Move mouse over the stream area — pills should shift slightly left/right
- Scroll to the vault — the counter should animate from 1,200 to 1,260 over 10 seconds
- Both features should work in dark and light themes

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add mouse parallax for stream and animated vault counter"
```

---

### Task 6: Final polish and integration testing

**Files:**
- Modify: `index.html` (minor adjustments only)

- [ ] **Step 1: Test complete scroll flow**

Scroll through the entire page from hero to footer. Verify:
1. Hero section is unchanged
2. Opener text fades in on scroll
3. Chat input appears and starts typing when visible
4. Labels appear on highlighted text with staggered timing
5. Pills drift down through the stream
6. Fork/chevron is visible
7. Vault shows frosted pills with lock and "Access denied"
8. Export card shows 3 sad lines
9. Counter animates in the vault footer
10. Punchline fades in
11. Beliefs section follows naturally
12. All 16 rights cards still work

- [ ] **Step 2: Test theme toggle**

Toggle between dark and light mode. Verify:
- Chat input border/background adapts
- Labels use correct accent color per theme
- Stream pills adapt colors
- Vault and export cards use correct surface/border colors
- Punchline text color adapts

- [ ] **Step 3: Test mobile layout**

Resize browser to < 600px. Verify:
- Chat input fills width
- Stream narrows
- Vault and export stack vertically (vault on top)
- All text is readable
- No horizontal overflow

- [ ] **Step 4: Test performance**

Open DevTools Performance tab. Scroll through the section. Verify:
- No janky frames (should maintain 60fps)
- No DOM accumulation from pills (they self-remove on animation end)
- No memory leaks from the typing loop

- [ ] **Step 5: Commit final state**

```bash
git add index.html
git commit -m "feat: complete memory lock-in scroll-reveal section"
```
