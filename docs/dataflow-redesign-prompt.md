# Dataflow Canvas Redesign Prompt: Memory Lock-In Reveal

Use this prompt in a fresh Claude Code session. Open the project directory, start a local server, and run this prompt. **This session should produce a redesigned dataflow visualization, not just ideas.**

---

## Prompt

The "memory lock-in reveal" section has a **dataflow canvas** between the chat input and the vault/export split. It's supposed to visualize personal data being extracted from your conversation and flowing into the AI provider's memory vault. **Right now it's not landing.** It looks like a monochrome mess of floating characters — a vague Matrix-rain homage that doesn't communicate anything specific. The moment should feel like watching your private thoughts get intercepted, catalogued, and locked away. Instead it just looks like decorative noise.

**Your job: redesign this canvas and its orchestration with the surrounding components so the data extraction feels visceral, legible, and narratively clear.**

---

## Context: What Exists

The page is a single `index.html` with inline CSS and JS. No frameworks. The relevant section is `.memory-reveal`, containing these components in order:

### The Pipeline (top to bottom)

1. **Chat input** (`.mr-chat-box`) — Types messages character-by-character with human-pace delays. After typing completes, key phrases get highlighted with colored `.mr-highlight` spans and floating `.mr-label` tags appear above them (e.g., "emotion", "life event", "employer").

2. **Dataflow canvas** (`#mr-dataflow`, 680x200px) — A `<canvas>` element that currently shows a Matrix-style rain of random characters in `--accent` color. Has a state machine: `idle` (invisible), `typing` (invisible), `analyzing` (invisible), `sending` (visible burst). Data fragment labels flow down the canvas during `sending` state.

3. **Fork divider** (`.mr-fork`) — Two horizontal lines with a chevron. Pulses with accent color during data emission.

4. **Vault/Export split** (`.mr-split`) — Left: a locked vault card showing categorized pills (e.g., "emotion: overwhelmed"). Right: a tiny export card showing 3 trivial items. Pills reveal progressively as messages cycle.

5. **Profile card** (`.mr-profile`) — Appears after enough pills accumulate. Shows a synthesized paragraph about the user.

### Current Orchestration Timeline

```
typeMessage()
  → state: 'typing' (canvas invisible)
  → characters appear one by one in chat

applyHighlights()
  → state: 'analyzing' (canvas still invisible)  
  → highlight spans wrap key phrases
  → label tags fade in with stagger (350ms each)

emitPills() [called holdTime - 800ms after highlights]
  → state: 'sending' (canvas becomes visible, rain bursts)
  → fork lines pulse accent
  → mrDataflowEmit() sends labeled fragments down the canvas
  → 1200ms later: vault pills reveal, export card flickers "stale"

[holdTime later]
  → message fades out
  → state: 'idle' (canvas fades to invisible)
  → next message starts after 800ms pause
```

### Current Canvas Implementation

- **Rain**: Columns of random characters (`A-Z`, `0-9`, symbols) falling downward. All rendered in `--accent` color with varying opacity. Center columns are denser. Head character is brightest.
- **Data fragments**: During `sending` state, labeled text strings (e.g., "emotion: feeling overwhelmed") spawn at random x positions near the top, fall downward, and converge toward center-x. They fade out in the bottom 30%.
- **Transition**: Canvas alpha smoothly interpolates between states (lerp factor 0.04). The `sending` state ramps up to alpha 0.55, speed 3.0, density 0.95 — then everything fades back to 0 during `idle`.
- **The problem**: The rain is visually monotone (single color, uniform character set, no structure). The data fragments are small (11px), same color as rain, and hard to distinguish from the noise. There's no visual connection between the highlighted phrases in the chat and the fragments falling in the canvas. The whole thing reads as "generic Matrix effect" rather than "your words are being harvested."

---

## What Needs to Change

### The Core Narrative Problem

The canvas sits between "what you said" (chat) and "what they kept" (vault). It should feel like a **pipeline** — you can *see* your words being disassembled, transmitted, and deposited. Right now it's a black box that just kind of... glows orange briefly.

### Design Direction

Think of it less as Matrix rain and more as a **data pipeline visualization**. The key feeling: your words are being broken apart, analyzed, and funneled into categories. Some specific directions to explore:

1. **Make the fragments the hero, not the rain.** The labeled data (`emotion: overwhelmed`, `life event: divorce`) should be large, legible, and visually prominent. They should look like data packets being transmitted — not tiny text lost in noise. Consider giving them backgrounds, borders, or glow effects. They're the payload; everything else is atmosphere.

2. **Create visual continuity with the highlights.** When a phrase gets highlighted in the chat box, the fragment that appears in the canvas should feel like it *came from* that highlight. Consider: starting the fragment at the same x-position as the highlight, matching the visual style (same accent-glow background), or having a brief connection line/particle trail from the chat to the canvas.

3. **Reconsider the rain.** It might not be needed at all. Or it could be reimagined as:
   - Thin vertical data lines (like fiber optics) that pulse when fragments pass through
   - A subtle grid or circuit pattern that lights up directionally
   - Particle streams that flow from the chat region toward the vault
   - Nothing — just the fragments on a clean dark background, maybe with a subtle gradient

4. **Add a sense of acceleration and convergence.** Fragments should start scattered (matching the scattered highlights in the text) and converge toward a focal point at the bottom (matching the vault below). The motion should feel like a funnel — dispersed at the top, compressed at the bottom.

5. **Consider the "analyzing" state.** Currently it does nothing visually. This is a missed opportunity. While the labels are fading in above the chat, the canvas could show the early stages of analysis — perhaps scanning lines, pulsing dots at the highlight positions, or a brief "locking on" animation.

6. **The fork divider should feel connected.** The fork pulse currently feels disconnected from the canvas above it. Consider extending the visual effect — fragments could visually cross the fork boundary, or the fork lines could act as "wires" that the data flows through.

### Technical Constraints

- Must remain a single `<canvas>` element (no DOM overlays for performance)
- Must respect the state machine (`idle`, `typing`, `analyzing`, `sending`) and its transition timing
- Must work in both dark and light themes (use `--accent` color variable)
- Must not interfere with the typing engine or its timing (the timer-based typing with human-pace delays is sacred — never touch it)
- Canvas is 680px wide, 200px tall at desktop. Scales to 100% width, 120px height on mobile
- Must use `requestAnimationFrame` and pause when not visible (IntersectionObserver pattern already exists)
- Must pause during user input mode (`window.mrUserPaused`)
- Keep the `mrDataflowState()` and `mrDataflowEmit()` API — other components call these

### What NOT to Change

- The typing engine (speed, delays, character-by-character behavior)
- The highlight/label system in the chat (`.mr-highlight`, `.mr-label`)
- The vault pill reveal mechanism
- The fork divider HTML structure
- The profile card behavior
- The overall section layout and spacing
- The message content or highlight definitions

---

## Methodology

1. **Start the local server** and watch 2-3 full message cycles at desktop width. Observe the current animation. Take a screen recording or multiple timed screenshots to document the problem.

2. **Sketch the new design** by describing it in detail before writing code. What does each state look like? How do fragments appear, travel, and disappear? What's the visual language?

3. **Implement the new canvas `draw()` function.** Replace the Matrix rain with the new visualization. Keep the state machine, the fragment system, and the external API.

4. **Tune the orchestration timing.** You may adjust:
   - The `states` object (alpha, speed, density values per state)
   - How `mrDataflowEmit()` creates and positions fragments
   - Fragment visual properties (size, color, opacity, glow)
   - The transition lerp factor (currently 0.04)
   - Adding new visual elements (particles, lines, grids) to the canvas
   
   You may NOT adjust:
   - When `mrDataflowState()` is called (that's controlled by the typing engine)
   - When `emitPills()` fires (that's controlled by the highlight timing)
   - The message cycle timing

5. **Test at 1280px and 375px** in both themes. The effect should scale gracefully — simpler on mobile is fine, but it should still communicate the narrative.

6. **Test the user input flow.** Click the chat, type something personal, press Enter. The canvas should handle user-generated fragments with the same visual quality as auto-generated ones.

7. **Take before/after screenshots** showing the same moment in the animation cycle (the `sending` burst). Compare legibility and emotional impact.

### Quality Bar

The redesigned canvas should pass these tests:

- **Legibility test**: A first-time visitor should be able to read at least one data fragment label without squinting or pausing the animation
- **Narrative test**: Watching a full cycle (type → highlight → send → vault) should make a non-technical person understand that their words are being analyzed and stored
- **Aesthetic test**: The canvas should feel like it belongs to the same design language as the rest of the page — not like a tech demo bolted on
- **Subtlety test**: During `idle` and `typing` states, the canvas should be either invisible or extremely subtle — it should not compete with the typing animation for attention
- **Performance test**: Smooth 60fps on a mid-range laptop. No dropped frames during state transitions

---

## Reference Points

For visual inspiration (not to copy, but for the *feeling*):

- Network packet visualizations in security dashboards (Darktrace, Splunk)
- Data flow diagrams in Figma/Miro with animated edges
- The "intercepted transmission" aesthetic from cybersecurity UIs
- Stripe's animated gradient transitions (for smoothness quality)
- Linear's subtle motion design (for restraint and taste)
