# Dataflow Canvas Redesign: Fiber Grid Scanner

**Date:** 2026-04-16
**Section:** `.memory-reveal` — dataflow canvas (`#mr-dataflow`)
**Status:** Design approved

## Problem

The current dataflow canvas between the chat input and vault/export split is a Matrix-style rain of random characters in a single accent color. It fails to communicate the narrative: personal data being extracted from conversation and funneled into a memory vault. The rain is visually monotone. Data fragments (11px, same color as rain) are illegible against the noise. There's no visual connection between highlighted chat phrases and canvas fragments. The whole thing reads as decorative noise rather than data interception.

## Design: Fiber Grid Scanner

Replace the Matrix rain with a three-layer pipeline visualization: vertical fiber-optic infrastructure lines, horizontal scan lines that compress into a funnel, and large glowing data fragments as the hero element.

**Core metaphor:** A net closing in. Your data passes through layer after layer of analysis — each scan line is another stage of extraction.

**Timing approach:** Brief but punchy. The canvas is fully invisible during `idle`, `typing`, and `analyzing` states. It erupts during `sending` with a fast fade-in, then lingers out slowly. The ~1.5 seconds it's active should be dramatically legible and emotionally charged.

## Visual Layers (back to front)

### Layer 1: Vertical Fibers

5-7 thin vertical lines (1-1.5px) spanning the full canvas height. These represent the data transmission infrastructure — always present as faint background structure during `sending`.

- Positioned at roughly 12%, 28%, 50%, 70%, 87% of canvas width (slight asymmetry, denser at center)
- Center fiber is 1.5px; edge fibers are 1px
- Base appearance: vertical gradient — transparent at top/bottom edges, peak opacity at center height
- Peak base opacity: 0.18 for center fiber, 0.12-0.14 for edge fibers
- **Proximity glow:** When a fragment is within ~40px horizontally of a fiber, that fiber brightens to 2x its base opacity. The brightness decays over 8 frames after the fragment passes. Effect: "the infrastructure lights up where data flows."
- Color: `--accent` (via `hexToRgb()`)

### Layer 2: Horizontal Scan Lines

3-4 horizontal lines that create a compressing funnel pattern — wider spacing at top, tighter at bottom.

- **Desktop (4 lines):** Positioned at approximately 25%, 50%, 70%, 85% of canvas height
  - Gap pattern: ~25% → ~20% → ~15% (compressing)
- **Mobile (2 lines):** Positioned at ~35% and ~75%
- Each line: full-width horizontal gradient — transparent at edges, peak opacity at center
- Progressive brightness: line 1 (faintest, peak 0.18) → line 4 (brightest, peak 0.45)
- Progressive glow: deeper lines get box-shadow glow (0 → 6px → 10px → 14px spread)
- **Scan motion:** Lines drift slowly downward at 0.3px/frame during `sending`, wrapping back to their original position when they exceed a threshold (~15px displacement). Creates subtle "sweeping" without being distracting.
- **Local brightening:** When a fragment crosses a scan line, the line brightens by 50% in a ~100px radius around the crossing point for 8 frames. Implemented as a brighter overlay segment rendered at the intersection x-position.
- Color: `--accent`

### Layer 3: Fragments (the hero)

Large, glowing labeled text — the payload. These are the data packets being transmitted. Everything else is atmosphere; fragments are what the viewer should read.

- **Font:** `700 14px "JetBrains Mono", monospace` (up from 11px)
- **Mobile font:** `700 12px`
- **Color:** `--accent` base, with layered text-shadow for glow:
  - Normal state: `0 0 12px accent/0.65, 0 0 30px accent/0.25`
  - Intersection flash: `0 0 6px white/0.5, 0 0 14px accent/0.9, 0 0 35px accent/0.5, 0 0 60px accent/0.2`
- **Letter-spacing:** 0.3px (slight expansion for legibility)

#### Fragment Lifecycle

**1. SPAWN**
- Fragment appears above the canvas (y = -20, staggered by index: `y = -20 - i * 28`)
- x-position matches the horizontal center of its source highlight in the chat box (via `getBoundingClientRect()` on the highlight span, mapped proportionally to canvas width)
- If highlight position unavailable, falls back to random spawn: `W * 0.15 + Math.random() * W * 0.7`
- Initial opacity: 0.9
- Motion trail appears immediately (thin vertical line above fragment)

**2. TRANSIT**
- Falls downward at `currentSpeed * 1.2 + Math.random() * 0.4` px/frame
- Drifts toward center-x: `frag.x += (W / 2 - frag.x) * 0.008` per frame (same convergence as current)
- **Motion trail:** 1.5px wide vertical line above the fragment, 18-28px tall (length proportional to speed). Gradient from fragment's current opacity to transparent. Rendered before fragment text so it appears behind.
- Fibers near the fragment pulse via proximity glow (Layer 1)

**3. INTERCEPT**
- When fragment's y-position is within 8px of a scan line:
  - Text color lerps from `--accent` to `#ffd4c4` (near-white warm) over 6 frames
  - Color lerps back to `--accent` over 12 frames after leaving the 8px zone
  - A 4-5px circular node appears at the fragment's left edge (x - 10, vertically centered), rendered with `ctx.arc()` + fill, with `ctx.shadowBlur: 10` and `ctx.shadowColor: accent/0.9`
  - Node fades out over 10 frames after leaving the zone
  - The scan line brightens locally (see Layer 2)
- **Status label:** 8px text rendered below the fragment, accent color at 35% opacity, letter-spacing 1.5px
  - After first scan line crossing: `CLASSIFYING`
  - After second scan line crossing: `EXTRACTED`
  - Labels are atmosphere — small and dim, not competing with fragment text
  - **Mobile:** Status labels are hidden entirely

**4. DEPOSIT**
- Below the last scan line, opacity fades rapidly: `frag.opacity *= 0.94` per frame (faster than the current linear fade)
- Trail shortens proportionally to opacity
- Font size shrinks slightly: decreases by 0.05px/frame below the last scan line
- Fragment removed when `opacity < 0.05` or `y > H + 20`

### Layer 4: Convergence Hotspot

A radial gradient at bottom-center that connects the canvas visually to the fork divider below.

- Shape: `radial-gradient(ellipse at center bottom, accent/0.12, transparent)` spanning center 60% of width, bottom 15% of height
- **Pulse:** Opacity ramps to 0.2 over the last 200ms before the fork divider activates (time this by checking if all fragments have passed the final scan line). This creates visual causality: hotspot glows → fork pulses → vault pills appear.
- Fades with the rest of the canvas during transition to idle

## State Machine

The existing state machine structure is preserved. Only the target values change.

```
states = {
  idle:      { alpha: 0,   speed: 0.4, density: 0   },
  typing:    { alpha: 0,   speed: 0.4, density: 0   },
  analyzing: { alpha: 0,   speed: 0.4, density: 0   },
  sending:   { alpha: 1.0, speed: 2.5, density: 1.0 }
}
```

Changes from current:
- `sending.alpha`: 0.55 → 1.0 (fragments are now the controlled visual, no need to dim the whole canvas)
- `sending.speed`: 3.0 → 2.5 (slightly slower so fragments are readable during transit)
- `sending.density`: 0.95 → 1.0 (density no longer controls column fill; it's repurposed as a general "activation" multiplier for fiber/scan line opacity)

### Transition Easing

- **Fade-in** (to `sending`): Lerp factor 0.08 (up from 0.04). Fast snap-on for the "eruption" feeling.
- **Fade-out** (to `idle`): Lerp factor 0.04 (unchanged). Slow linger as the last fragments fade.
- Detection: Use asymmetric lerp based on whether `targetAlpha > currentAlpha` (fading in) or `targetAlpha < currentAlpha` (fading out).

## External API (preserved)

### `mrDataflowState(s)`
- Signature unchanged
- Called by typing engine at state transitions
- Sets `state = s`, updates target values from `states[s]`

### `mrDataflowEmit(texts)`
- Signature unchanged
- Called by `emitPills()` with array of label strings
- Creates fragment objects and pushes to `dataFragments[]`
- **New behavior:** Attempts to read highlight positions from the DOM to set initial x-positions. Matching strategy: fragments and highlights are paired by array index (first fragment → first highlight, etc.). Bonus fragments (those beyond the highlight count) use random positioning.
  ```
  var highlights = document.querySelectorAll('.mr-highlight');
  var canvasRect = canvas.getBoundingClientRect();
  texts.forEach(function(text, i) {
    var x;
    if (i < highlights.length) {
      var hRect = highlights[i].getBoundingClientRect();
      x = (hRect.left + hRect.width / 2 - canvasRect.left) / canvasRect.width * W;
    } else {
      x = W * 0.15 + Math.random() * W * 0.7;
    }
    // ... create fragment at x
  });
  ```
  Falls back to random positioning if highlights aren't found or canvas rect is unavailable.

## Draw Function Structure

```
function draw() {
  if (window.mrUserPaused) { requestAnimationFrame(draw); return; }

  // 1. Asymmetric easing
  var lerpFactor = (targetAlpha > currentAlpha) ? 0.08 : 0.04;
  currentAlpha += (targetAlpha - currentAlpha) * lerpFactor;
  currentSpeed += (targetSpeed - currentSpeed) * lerpFactor;
  currentDensity += (targetDensity - currentDensity) * lerpFactor;

  // 2. Early exit if nothing to render
  if (currentAlpha < 0.01 && dataFragments.length === 0) {
    ctx.clearRect(0, 0, W, H);
    if (visible) requestAnimationFrame(draw); else running = false;
    return;
  }

  ctx.clearRect(0, 0, W, H);

  // 3. Draw fibers (Layer 1) — modulated by currentAlpha and proximity to fragments
  drawFibers();

  // 4. Draw scan lines (Layer 2) — modulated by currentAlpha, local brightening near fragments
  drawScanLines();

  // 5. Draw fragments (Layer 3) — update positions, check intersections, render trails + text + status
  updateAndDrawFragments();

  // 6. Draw convergence hotspot (Layer 4)
  drawHotspot();

  if (visible) requestAnimationFrame(draw); else running = false;
}
```

## What Does NOT Change

- The typing engine (speed, delays, character-by-character behavior)
- The highlight/label system (`.mr-highlight`, `.mr-label` CSS/DOM)
- The vault pill reveal mechanism (`mrRevealVaultPills`)
- The fork divider HTML structure (`.mr-fork`)
- The profile card behavior
- The overall section layout and spacing
- The message content or highlight definitions
- When `mrDataflowState()` is called (controlled by typing engine)
- When `emitPills()` fires (controlled by highlight timing)
- The message cycle timing
- The `window.mrUserPaused` check
- The IntersectionObserver visibility pattern
- The theme toggle color refresh
- The canvas element and its container structure

## What Gets Removed

- The entire Matrix rain system: `streams[]` array, column-based rendering, character pool, character mutation/flicker logic, per-column density calculations
- The `pool` character string
- The `streams` initialization in `resize()`
- All rain-related rendering code in `draw()`

## Mobile Adaptations (viewport ≤ 480px)

- Canvas height: 120px (already handled by existing CSS)
- Fibers: 3 instead of 5-7 (positions: 20%, 50%, 80%)
- Scan lines: 2 instead of 3-4 (positions: 40%, 80%)
- Fragment font: 12px instead of 14px
- Status labels: hidden
- Motion trails: shortened to 12-16px
- Convergence hotspot: wider (center 80%)

## Performance

All rendering is on a single `<canvas>` with `requestAnimationFrame`. The new visualization is *lighter* than the current Matrix rain:

- **Rain (current):** Renders 30-50+ individual characters per frame, each with font rendering and alpha calculation
- **Fiber Grid Scanner (new):** Renders 5-7 line segments, 3-4 line segments, and 4-6 text labels per frame

Key performance considerations:
- `ctx.shadowBlur` for glow effects is GPU-accelerated on modern browsers but can be expensive if overdone. Use it only on fragment text (4-6 items), not on fibers or scan lines (use rgba alpha for those).
- Fragment text with `shadowBlur`: set `ctx.shadowColor` and `ctx.shadowBlur` before `fillText()`, reset after. Max 4 shadow layers via multiple `fillText()` calls at decreasing blur.
- Scan line local brightening: simple `fillRect()` with gradient, not a shadow effect.
- Target: smooth 60fps on mid-range hardware. The reduced element count versus rain makes this achievable.

## Quality Acceptance Criteria

- **Legibility:** A first-time visitor can read at least one fragment label without pausing the animation
- **Narrative:** Watching type → highlight → send → vault makes a non-technical person understand words are being analyzed and stored
- **Aesthetic:** Canvas belongs to the same design language as the rest of the page
- **Subtlety:** During idle/typing/analyzing, canvas is invisible — does not compete with typing
- **Performance:** Smooth 60fps on a mid-range laptop, no dropped frames during transitions
- **Themes:** Works in both dark and light themes via `--accent` color variable
- **Responsive:** Scales gracefully from 1280px to 375px
- **User input:** Canvas handles user-generated fragments with the same visual quality as auto-generated ones
