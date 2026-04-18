# Creative Review Prompt: AI Memory Manifesto Landing Page

Use this prompt in a fresh Claude Code session. Open the project directory, start a local server, and run this prompt.

---

## Prompt

I need a rigorous creative and technical review of the landing page for the AI Memory Manifesto — a declaration of rights over the memory that AI systems build about us.

**Live URL**: https://memorymanifesto.org (or run `python3 -m http.server 8765` and open http://localhost:8765/index.html)

**The page is a single `index.html` file** with inline CSS (~1200 lines), HTML, and JS (~400 lines). No frameworks, no dependencies — vanilla HTML/CSS/JS with a WebGL shader background.

### What the page does

The landing page has a hero section followed by an interactive **"memory lock-in reveal"** section that visualizes the core problem: AI providers capture rich personal data from your conversations but give you almost nothing back. The sequence:

1. **Hero** — title, tagline, CTA buttons, scroll hint
2. **Opener** — *"You share everything. Here's what you get back."*
3. **Simulated chat input** — a ChatGPT-style rounded input box with a typing animation that cycles through 5 emotionally rich messages (divorce, health, career, startup idea, love). Key phrases get highlighted with floating labels (emotion, health, employer, etc.)
4. **Matrix-style ASCII data stream** — canvas-based falling characters that activate only when a message "sends," carrying labeled data fragments through the rain
5. **Fork** — a divider line that pulses with accent color during the send event
6. **Vault vs Export split** — left (70%): a frosted "Provider Memory" vault with 40 data pills progressively revealed behind a lock (hover to peek). Right (30%): a sad `memory.md` card with 3 trivial lines and "Last updated: 47 days ago"
7. **Punchline** — *"They remember everything. You own almost nothing."*
8. **Transition** — *"But it doesn't have to be this way."*
9. **Beliefs section** → 16 rights grid → urgency → CTA → footer

The typing engine has a state machine (idle → typing → analyzing → sending → idle) that orchestrates the Matrix rain, data fragment emission, vault pill reveals, counter increments, fork pulse, and export card flicker.

### What I want from you

**Do NOT make any changes.** This is a read-only review. Read the full `index.html`, view the page in a browser (take screenshots at each scroll position, both desktop 1280px and mobile 375px, dark and light themes), and produce:

#### 1. Visual Design Audit
- Does the section tell a clear, emotionally resonant story as you scroll?
- Is there visual hierarchy — does the eye know where to go?
- Are the animations purposeful or distracting?
- How does the pacing feel — too fast, too slow, dead spots?
- Rate the chat input fidelity — does it feel like a real AI chat interface?
- Rate the vault/export contrast — does the asymmetry land emotionally?
- How do dark and light themes compare? Any weaker in one mode?
- How does mobile compare to desktop? Any breakdowns or loss of impact?

#### 2. Narrative Flow Assessment
- Does the opener set up the right tension?
- Is the connection between "your message was analyzed" and "data flows to the vault" clear without explanation?
- Does the Matrix rain add to or distract from the narrative?
- Does the fork moment register as "this is where your data diverges"?
- Does the punchline land with the right weight?
- Does "But it doesn't have to be this way" bridge effectively into the manifesto?
- Would a first-time visitor understand the problem within 15 seconds of scrolling?

#### 3. Technical Quality
- Performance: any jank, excessive repaints, DOM accumulation?
- Canvas rendering: efficiency of the draw loop, any visual artifacts?
- Animation timing: do the state transitions feel smooth or abrupt?
- Responsive: any overflow, clipping, or misalignment at any breakpoint?
- Accessibility: keyboard navigation, screen reader concerns, contrast ratios?
- Theme toggle: does everything adapt cleanly?

#### 4. Competitive Benchmark
- Compare the storytelling approach to the best interactive landing pages you know (Stripe, Linear, Vercel, Apple product pages). Where does this stand?
- What techniques do those pages use that this page doesn't?
- What does this page do that's genuinely novel?

#### 5. Improvement Ideas
Produce a prioritized list of concrete improvement ideas. For each:
- **What**: one-sentence description
- **Why**: what problem it solves or what impact it creates
- **Effort**: S/M/L
- **Impact**: low/medium/high

Categorize into: Quick Wins (high impact, small effort), Strategic (high impact, larger effort), Polish (medium impact, small effort), and Ambitious (transformative but significant effort).

### Constraints
- The page must remain a single HTML file with no build step
- No external JS dependencies (vanilla only)
- Must work in all modern browsers without polyfills
- Must support dark/light theme toggle
- Must be performant on mobile
- The WebGL shader background is a separate concern — focus on the memory-reveal section

### How to review
1. Read the full CSS, HTML, and JS sections of index.html
2. Start a local server and open in browser
3. Take screenshots at each scroll position (hero, opener+chat, stream+fork, vault+export, punchline, beliefs) in both themes and both viewport sizes
4. Watch 3 full typing animation cycles to evaluate timing and orchestration
5. Test the vault hover-to-peek interaction
6. Test the theme toggle mid-animation
7. Test at 375px, 768px, and 1280px widths
8. Write your review with specific file:line references where relevant
