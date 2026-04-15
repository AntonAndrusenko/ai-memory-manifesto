# "The Deeper Truth" -- Vertical Scroll-Reveal Visual

## Overview

A full-width, vertically-scrolling visual section inserted between the hero and beliefs sections of the landing page. It communicates the core problem of AI memory lock-in through a simulated chat interaction that reveals what happens to personal data after it leaves the user's prompt.

The user sees a familiar chat input, watches rich personal messages get typed and labeled, then scrolls down to discover those details flowing into a corporate vault they cannot unlock -- while a pathetically thin `memory.md` is all they get back.

## Design Decisions (confirmed)

| Decision | Choice |
|---|---|
| Placement | Between hero and beliefs sections |
| Interactivity | Light -- scroll-triggered reveals, subtle mouse parallax |
| Visual metaphor | Sequential vertical flow (input -> stream -> split) |
| Chat UI fidelity | High -- styled to resemble a real AI chat input (ChatGPT-like) |
| Provider identification | None -- no logos, no names, no brand colors |
| Vault aesthetic | Corporate/sterile with a lock the user cannot open |
| Sticky behavior | None -- entire section scrolls naturally |
| Tech stack | Pure HTML + CSS + vanilla JS (no dependencies) |

## Visual Sequence (top to bottom)

### 1. Section Opener

A short provocative line centered above the chat input to frame what follows.

Text: *"Every conversation leaves a trace."*

- Font: `var(--serif)` (Instrument Serif), italic
- Size: `clamp(1.3rem, 2.5vw, 1.6rem)`
- Color: `var(--text)`
- Margin-bottom: ~48px
- Uses existing `.reveal` scroll-trigger pattern

### 2. The Chat Input (simulated)

A high-fidelity recreation of a ChatGPT-style chat interface. Dark rounded container with:

- **Outer shell**: Rounded rectangle (`border-radius: 24px`), `var(--surface)` background, `1px solid var(--border)`, max-width ~680px, centered
- **Inner textarea area**: Displays the "typed" message text in `var(--sans)` (DM Sans), 1rem, `var(--text)` color
- **Bottom bar**: Contains a fake send button (arrow-up icon in a circle, `var(--accent)` fill) aligned right, and a faint "attach" icon on the left
- **Placeholder text** (shown briefly between messages): "Message AI..." in `var(--dim)`

**Typing animation loop** cycles through 5 messages:

1. *"I've been feeling overwhelmed since the divorce, can you help me think through next steps..."*
2. *"Can you help me draft a resignation letter for my job at Meridian Corp?"*
3. *"My son was diagnosed with ADHD last week. What should I know as a parent?"*
4. *"Here's my startup idea -- a platform that connects independent therapists with..."*
5. *"I think I'm falling in love with my best friend and I don't know what to do..."*

**Typing speed**: ~40ms per character, with brief pauses (~800ms) at commas and sentence breaks for naturalism. Each message stays visible for ~1.5s after completing before transitioning to the next.

**Highlight labels**: After each message finishes typing, specific phrases get highlighted with small floating labels that fade in above the text:

| Message | Highlighted phrase | Label |
|---|---|---|
| 1 | "feeling overwhelmed" | `emotion` |
| 1 | "the divorce" | `life event` |
| 2 | "resignation letter" | `intent` |
| 2 | "Meridian Corp" | `employer` |
| 3 | "diagnosed with ADHD" | `health` |
| 3 | "as a parent" | `family` |
| 4 | "startup idea" | `idea` |
| 4 | "independent therapists" | `business plan` |
| 5 | "falling in love" | `emotion` |
| 5 | "my best friend" | `relationship` |

**Label styling**:
- Font: `var(--mono)` (JetBrains Mono), 0.65rem, weight 400
- Background: `var(--accent-glow)` with `1px solid` using `var(--accent)` at 30% opacity
- Color: `var(--accent)`
- Border-radius: 4px
- Padding: 2px 8px
- Positioned absolutely above the highlighted phrase
- Small connecting line (1px) from label to text
- Fade-in animation: 0.4s ease

**Highlight on text**: The corresponding phrase gets a subtle background of `var(--accent-glow)` and slightly brighter text color.

### 3. The Stream

Below the chat input, after ~80px of whitespace, the labeled fragments detach and drift downward.

**Visual treatment**:
- Each fragment is a small pill/tag: the label text + a condensed version of the data (e.g., `emotion: overwhelmed`, `health: ADHD`, `employer: Meridian Corp`)
- Pill styling: same as the highlight labels but slightly larger (0.7rem), with a subtle glow (`box-shadow: 0 0 12px var(--accent-glow)`)
- Pills drift downward in a loose vertical stream, slightly offset left/right for organic feel
- CSS `@keyframes` animation: translateY from 0 to ~300px, opacity 1 to 0.6
- Staggered start times (0.2s apart)
- Light mouse-parallax: pills shift subtly (translateX +/-5px) based on cursor X position
- New pills are generated each time the typing loop produces a new labeled message (2 pills per message, 5 messages per cycle = 10 pills per cycle)
- Old pills fade out (opacity 0) at the bottom of the stream and are removed from DOM after transition ends to prevent accumulation
- Stream is ~300px tall, overflow hidden

### 4. The Split

The stream reaches a visual fork point. A thin horizontal line (`1px, var(--border)`) spans the container width with a small downward-pointing chevron/arrow in the center.

Below the fork, two paths diverge:

**Left side (70% width) -- "The Vault"**:

A large corporate container representing what the provider keeps.

- Container: `border-radius: 16px`, `var(--surface)` background, `1px solid var(--border)`
- Top bar: Simulated window chrome -- three dots (gray), a lock icon centered, and the text `Provider Memory` in `var(--mono)`, 0.7rem, `var(--dim)`
- Body: Behind a frosted glass effect (`backdrop-filter: blur(8px)` on an overlay), a pre-rendered grid of ~40-50 pill elements (same styling as stream pills but smaller, 0.6rem) arranged in 4-5 rows with slight random rotation (-2deg to 2deg) and overlap. These are static HTML, not dynamically generated -- they represent the accumulated mass of captured data. The frost overlay makes individual text hard to read, creating an impression of volume without legibility
- The frosted overlay has a centered lock icon (SVG, 48px, `var(--dim)`) and text: `"Access denied"` in `var(--mono)`, 0.75rem
- Counter at the bottom: `"1,247 personal details retained"` in `var(--mono)`, 0.7rem, `var(--muted)` -- the number slowly increments (requestAnimationFrame when in viewport) from ~1,200 to ~1,260 over 10 seconds, then loops
- The whole vault subtly pulses: `box-shadow` oscillates between `0 0 0px transparent` and `0 0 30px var(--accent-glow)` on a 4s cycle

**Right side (30% width) -- "Your Export"**:

A small, plain, almost apologetic card representing what the user gets.

- Container: `border-radius: 12px`, `var(--surface)` background, `1px solid var(--border)`, noticeably smaller/shorter than the vault
- Top bar: A small file icon and `memory.md` in `var(--mono)`, 0.7rem, `var(--dim)`
- Body: Plain text in `var(--mono)`, 0.75rem, `var(--muted)`:
  ```
  - Prefers dark mode
  - Has a child
  - Interested in startups
  ```
  Three lines. Nothing about emotions, health, relationships, employers, or ideas.
- Bottom text: `"3 items visible to you"` in `var(--mono)`, 0.65rem, `var(--dim)`
- No glow, no pulse, no animation -- deliberately static and lifeless compared to the vault

### 5. The Punchline

Below the split, centered, fading in on scroll:

> *"They remember everything. You own almost nothing."*

- Font: `var(--serif)`, `clamp(1.3rem, 2.5vw, 1.6rem)`, italic
- Color: `var(--text)`
- Margin-top: 80px
- Uses `.reveal` scroll-trigger

Then the existing divider and beliefs section follows.

## Animation & Interaction Details

### Scroll-triggered reveals
Uses the existing `IntersectionObserver` pattern (`.reveal` / `.visible`). Each major element (opener text, chat input, stream, split, punchline) fades in as it enters the viewport with the existing `opacity 0.7s / translateY 24px` transition.

### Typing animation
- JS-driven with `setTimeout` chain
- Cycles through messages array indefinitely
- Each character appended to a span inside the chat input
- Pauses at punctuation for naturalism
- After message complete: highlight labels fade in (staggered 0.3s each)
- After labels shown (1.5s hold): message fades, input clears, next message begins
- Animation runs regardless of scroll position (ambient motion when visible)

### Mouse parallax (stream pills only)
- Passive `mousemove` listener on the stream container
- Calculates cursor offset from container center
- Applies `transform: translateX(offset * 0.03)` to pill elements
- Throttled to requestAnimationFrame

### Vault counter
- `IntersectionObserver` triggers counter animation when vault enters viewport
- `requestAnimationFrame` loop increments from 1200 to 1260 over 10s
- Resets and loops when complete
- Number formatted with commas

## Responsive Behavior

### Mobile (< 600px)
- Chat input: full width, slightly smaller text (0.9rem)
- Stream: narrower, pills in single column
- Split: Stacks vertically -- vault on top (full width), user card below (full width). The size disparity is maintained through height difference (vault ~3x taller than card)
- Punchline text: smaller clamp range

### Tablet (600-900px)
- Split ratio adjusts to 65/35
- Chat input max-width stays at 680px

## Integration Points

### HTML
New section inserted after `.hero` closing div and before first `.divider` + `.beliefs` section. Wrapped in a container div with class `memory-reveal`.

### CSS
All new styles scoped under `.memory-reveal` to avoid conflicts. Uses existing CSS custom properties throughout. Added to the `<style>` block in index.html (consistent with current pattern -- styles are inline, not in page.css which is for shared sub-pages only).

### JS
New script block added before the existing scroll-reveal script. Self-contained IIFE. Uses existing patterns:
- `IntersectionObserver` for scroll triggers
- `requestAnimationFrame` for counter animation
- Passive event listeners for mouse tracking

## What This Does NOT Include

- No real company logos or names
- No click/tap interactions
- No external dependencies
- No canvas/WebGL (shader background continues behind)
- No sticky/fixed positioning
- No audio or video
- No modifications to existing sections
