# Dataflow Canvas Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Matrix rain canvas with a Fiber Grid Scanner — vertical fiber lines, compressing horizontal scan lines, and large glowing data fragments as the hero element.

**Architecture:** Single-file edit to the canvas IIFE in `index.html` (lines 2485-2723). Strip all rain/stream code, replace with four draw functions (fibers, scan lines, fragments, hotspot). Preserve the state machine API and external interfaces.

**Tech Stack:** Vanilla JS, Canvas 2D API, CSS custom properties for theming.

**Spec:** `docs/superpowers/specs/2026-04-16-dataflow-canvas-redesign.md`

---

## File Map

- **Modify:** `index.html:2485-2723` — The `// ===== MEMORY REVEAL: MATRIX DATAFLOW CANVAS =====` IIFE
  - Remove: rain variables (`pool`, `streams`, `cols`, `fontSize`), stream init in `resize()`, all rain rendering in `draw()`, fragment rendering in `draw()`
  - Add: fiber data, scan line data, new `drawFibers()`, `drawScanLines()`, `updateAndDrawFragments()`, `drawHotspot()`, updated `resize()`, updated `mrDataflowEmit()`
- **No other files change.** The typing engine, highlight system, vault, fork — all untouched.

---

### Task 1: Strip Rain, Update State Machine & Scaffold

Remove the Matrix rain system and update the state machine values. Scaffold the four empty draw functions so the canvas renders nothing but doesn't break.

**Files:**
- Modify: `index.html:2485-2723`

- [ ] **Step 1: Replace the canvas IIFE variables and state machine**

Replace lines 2486-2533 (from `(function () {` through the end of `mrDataflowEmit`). Remove `pool`, `cols`, `fontSize`, `streams`. Update state values. Add fiber/scan line data arrays and new fragment structure.

Replace the contents of the IIFE (keep the opening `(function () {` and the closing `})();`) with:

```javascript
      var canvas = document.getElementById('mr-dataflow');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W, H, isMobile;

      // State machine: idle -> typing -> analyzing -> sending -> idle
      var state = 'idle';
      var targetAlpha = 0;
      var currentAlpha = 0;
      var targetSpeed = 0.4;
      var currentSpeed = 0.4;
      var targetDensity = 0;
      var currentDensity = 0;

      var states = {
        idle:      { alpha: 0,   speed: 0.4, density: 0 },
        typing:    { alpha: 0,   speed: 0.4, density: 0 },
        analyzing: { alpha: 0,   speed: 0.4, density: 0 },
        sending:   { alpha: 1.0, speed: 2.5, density: 1.0 }
      };

      window.mrDataflowState = function (s) {
        state = s;
        var p = states[s] || states.idle;
        targetAlpha = p.alpha;
        targetSpeed = p.speed;
        targetDensity = p.density;
      };

      // -- Fiber data (computed in resize) --
      var fibers = [];
      var fiberGlow = []; // per-fiber glow intensity (0-1), decays each frame

      // -- Scan line data (computed in resize) --
      var scanLines = [];
      var scanLineBrightness = []; // per-line local brightness boost array [{x, intensity}]

      // -- Fragment data --
      var dataFragments = [];

      // -- Hotspot --
      var hotspotOpacity = 0;
```

- [ ] **Step 2: Replace `mrDataflowEmit` with highlight-position-aware version**

```javascript
      window.mrDataflowEmit = function (texts) {
        var highlights = document.querySelectorAll('.mr-highlight');
        var canvasRect = canvas.getBoundingClientRect();
        texts.forEach(function (text, i) {
          var x;
          if (i < highlights.length && canvasRect.width > 0) {
            var hRect = highlights[i].getBoundingClientRect();
            x = (hRect.left + hRect.width / 2 - canvasRect.left) / canvasRect.width * W;
            x = Math.max(W * 0.05, Math.min(W * 0.85, x));
          } else {
            x = W * 0.15 + Math.random() * W * 0.7;
          }
          dataFragments.push({
            text: text,
            x: x,
            y: -20 - i * 28,
            speed: currentSpeed * 1.2 + Math.random() * 0.4,
            opacity: 0.9,
            fontSize: isMobile ? 12 : 14,
            crossings: 0,       // how many scan lines crossed
            _crossedLines: 0,   // bitmask of which scan lines have been crossed
            flashIntensity: 0,  // 0-1, controls white flash
            nodeOpacity: 0,     // 0-1, intersection node
            statusText: ''      // CLASSIFYING / EXTRACTED
          });
        });
      };
```

- [ ] **Step 3: Replace `resize()` — compute fiber and scan line positions**

```javascript
      function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        isMobile = W <= 480;

        // Fiber positions (% of W)
        if (isMobile) {
          fibers = [
            { x: W * 0.20, w: 1 },
            { x: W * 0.50, w: 1.5 },
            { x: W * 0.80, w: 1 }
          ];
        } else {
          fibers = [
            { x: W * 0.12, w: 1 },
            { x: W * 0.28, w: 1 },
            { x: W * 0.50, w: 1.5 },
            { x: W * 0.70, w: 1 },
            { x: W * 0.87, w: 1 }
          ];
        }
        fiberGlow = fibers.map(function () { return 0; });

        // Scan line positions (% of H) — compress toward bottom
        if (isMobile) {
          scanLines = [
            { baseY: H * 0.40, y: H * 0.40, peakAlpha: 0.22, glowSpread: 4 },
            { baseY: H * 0.80, y: H * 0.80, peakAlpha: 0.40, glowSpread: 12 }
          ];
        } else {
          scanLines = [
            { baseY: H * 0.25, y: H * 0.25, peakAlpha: 0.18, glowSpread: 0 },
            { baseY: H * 0.50, y: H * 0.50, peakAlpha: 0.26, glowSpread: 6 },
            { baseY: H * 0.70, y: H * 0.70, peakAlpha: 0.35, glowSpread: 10 },
            { baseY: H * 0.85, y: H * 0.85, peakAlpha: 0.45, glowSpread: 14 }
          ];
        }
        scanLineBrightness = scanLines.map(function () { return []; });

        dataFragments = [];
        hotspotOpacity = 0;
      }
```

- [ ] **Step 4: Replace `draw()` with scaffold + keep color/visibility/observer code**

Replace the entire `draw()` function and keep the color refresh, resize listener, theme toggle, and IntersectionObserver unchanged:

```javascript
      var accentColor = '';
      function refreshColor() {
        accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      }

      function hexToRgb(hex) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return r + ',' + g + ',' + b;
      }

      function drawFibers(rgb) { /* Task 2 */ }
      function drawScanLines(rgb) { /* Task 3 */ }
      function updateAndDrawFragments(rgb) { /* Task 4 */ }
      function drawHotspot(rgb) { /* Task 5 */ }

      function draw() {
        if (window.mrUserPaused) {
          requestAnimationFrame(draw);
          return;
        }

        // Asymmetric easing: fast fade-in, slow fade-out
        var lerpFactor = (targetAlpha > currentAlpha) ? 0.08 : 0.04;
        currentAlpha += (targetAlpha - currentAlpha) * lerpFactor;
        currentSpeed += (targetSpeed - currentSpeed) * lerpFactor;
        currentDensity += (targetDensity - currentDensity) * lerpFactor;

        // Early exit if nothing to render
        if (currentAlpha < 0.01 && dataFragments.length === 0) {
          ctx.clearRect(0, 0, W, H);
          if (visible) requestAnimationFrame(draw); else running = false;
          return;
        }

        ctx.clearRect(0, 0, W, H);

        if (!accentColor) refreshColor();
        var rgb = hexToRgb(accentColor);

        drawFibers(rgb);
        drawScanLines(rgb);
        updateAndDrawFragments(rgb);
        drawHotspot(rgb);

        if (visible) {
          requestAnimationFrame(draw);
        } else {
          running = false;
        }
      }

      resize();
      refreshColor();
      window.addEventListener('resize', resize, { passive: true });

      var themeBtn = document.getElementById('theme-toggle');
      if (themeBtn) themeBtn.addEventListener('click', function () {
        setTimeout(refreshColor, 100);
      });

      var streamEl = canvas.parentElement;
      var running = false;
      var visible = false;
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          visible = e.isIntersecting;
          if (e.isIntersecting && !running) {
            running = true;
            draw();
          }
        });
      }, { threshold: 0.1, rootMargin: '100px 0px' });
      obs.observe(streamEl);
```

- [ ] **Step 5: Verify the page loads without errors**

Run: Open the page in a browser, open the console, scroll to the memory-reveal section. The canvas should be blank (all draw functions are stubs). No JS errors should appear. The typing engine, highlights, and vault should all still work normally.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Strip Matrix rain, scaffold Fiber Grid Scanner canvas"
```

---

### Task 2: Implement `drawFibers()`

Render the vertical fiber-optic infrastructure lines with proximity glow.

**Files:**
- Modify: `index.html` — the `drawFibers` function stub

- [ ] **Step 1: Implement `drawFibers()`**

Replace the stub with:

```javascript
      function drawFibers(rgb) {
        for (var i = 0; i < fibers.length; i++) {
          var f = fibers[i];

          // Proximity glow: check distance to each fragment
          var glowTarget = 0;
          for (var fi = 0; fi < dataFragments.length; fi++) {
            var dist = Math.abs(dataFragments[fi].x - f.x);
            if (dist < 40) {
              glowTarget = Math.max(glowTarget, 1 - dist / 40);
            }
          }
          // Smooth glow: rise fast, decay slow
          if (glowTarget > fiberGlow[i]) {
            fiberGlow[i] += (glowTarget - fiberGlow[i]) * 0.3;
          } else {
            fiberGlow[i] *= 0.87; // decay over ~8 frames
          }

          var isCenter = (f.w > 1);
          var baseAlpha = isCenter ? 0.18 : 0.13;
          var peakAlpha = (baseAlpha + fiberGlow[i] * baseAlpha) * currentAlpha;

          if (peakAlpha < 0.005) continue;

          // Vertical gradient: transparent -> peak -> transparent
          var grad = ctx.createLinearGradient(f.x, 0, f.x, H);
          grad.addColorStop(0, 'rgba(' + rgb + ',0)');
          grad.addColorStop(0.3, 'rgba(' + rgb + ',' + peakAlpha + ')');
          grad.addColorStop(0.5, 'rgba(' + rgb + ',' + peakAlpha + ')');
          grad.addColorStop(0.7, 'rgba(' + rgb + ',' + peakAlpha + ')');
          grad.addColorStop(1, 'rgba(' + rgb + ',0)');

          ctx.fillStyle = grad;
          ctx.fillRect(f.x - f.w / 2, 0, f.w, H);
        }
      }
```

- [ ] **Step 2: Verify fibers render during sending state**

Open the page, wait for a message cycle to hit the `sending` state. You should see thin vertical lines appear and fade. They should pulse brighter when fragments pass near them (fragments won't render yet since that function is still a stub, but you can temporarily add a test fragment in the console: `window.mrDataflowEmit(['test: hello'])`).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Implement drawFibers with proximity glow"
```

---

### Task 3: Implement `drawScanLines()`

Render the horizontal scan lines with downward drift and local brightening.

**Files:**
- Modify: `index.html` — the `drawScanLines` function stub

- [ ] **Step 1: Implement `drawScanLines()`**

Replace the stub with:

```javascript
      function drawScanLines(rgb) {
        for (var i = 0; i < scanLines.length; i++) {
          var sl = scanLines[i];

          // Drift downward during sending
          if (currentAlpha > 0.1) {
            sl.y += 0.3;
            if (sl.y - sl.baseY > 15) {
              sl.y = sl.baseY;
            }
          } else {
            sl.y = sl.baseY; // reset when idle
          }

          var lineAlpha = sl.peakAlpha * currentAlpha;
          if (lineAlpha < 0.005) continue;

          // Main scan line: horizontal gradient, transparent at edges
          var edgeFade = 0.05 + i * 0.02; // deeper lines have wider visible region
          var grad = ctx.createLinearGradient(0, sl.y, W, sl.y);
          grad.addColorStop(0, 'rgba(' + rgb + ',0)');
          grad.addColorStop(edgeFade, 'rgba(' + rgb + ',' + lineAlpha * 0.5 + ')');
          grad.addColorStop(0.5, 'rgba(' + rgb + ',' + lineAlpha + ')');
          grad.addColorStop(1 - edgeFade, 'rgba(' + rgb + ',' + lineAlpha * 0.5 + ')');
          grad.addColorStop(1, 'rgba(' + rgb + ',0)');

          ctx.fillStyle = grad;
          ctx.fillRect(0, sl.y - 0.5, W, 1);

          // Glow for deeper lines (shadowBlur is expensive — use a wider faint rect instead)
          if (sl.glowSpread > 0) {
            var glowGrad = ctx.createLinearGradient(0, sl.y - sl.glowSpread, 0, sl.y + sl.glowSpread);
            glowGrad.addColorStop(0, 'rgba(' + rgb + ',0)');
            glowGrad.addColorStop(0.5, 'rgba(' + rgb + ',' + lineAlpha * 0.12 + ')');
            glowGrad.addColorStop(1, 'rgba(' + rgb + ',0)');

            ctx.fillStyle = glowGrad;
            ctx.fillRect(0, sl.y - sl.glowSpread, W, sl.glowSpread * 2);
          }

          // Local brightening from fragment intersections — decay existing
          var brights = scanLineBrightness[i];
          for (var bi = brights.length - 1; bi >= 0; bi--) {
            brights[bi].intensity *= 0.85; // decay over ~8 frames
            if (brights[bi].intensity < 0.02) {
              brights.splice(bi, 1);
              continue;
            }
            // Render bright spot: 100px wide gaussian-ish blob
            var bx = brights[bi].x;
            var bAlpha = lineAlpha * 0.5 * brights[bi].intensity * currentAlpha;
            var bGrad = ctx.createLinearGradient(bx - 50, sl.y, bx + 50, sl.y);
            bGrad.addColorStop(0, 'rgba(' + rgb + ',0)');
            bGrad.addColorStop(0.3, 'rgba(' + rgb + ',' + bAlpha + ')');
            bGrad.addColorStop(0.5, 'rgba(' + rgb + ',' + bAlpha * 1.5 + ')');
            bGrad.addColorStop(0.7, 'rgba(' + rgb + ',' + bAlpha + ')');
            bGrad.addColorStop(1, 'rgba(' + rgb + ',0)');
            ctx.fillStyle = bGrad;
            ctx.fillRect(bx - 50, sl.y - 1, 100, 2);
          }
        }
      }
```

- [ ] **Step 2: Verify scan lines render during sending**

Open the page, wait for `sending` state. You should see horizontal lines at different heights — faintest at top, brightest at bottom. They should drift slowly downward. Local brightening won't be visible yet (needs fragment intersection logic in Task 4).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Implement drawScanLines with drift and local brightening"
```

---

### Task 4: Implement `updateAndDrawFragments()`

The hero: large glowing fragments with motion trails, intersection flashes, status labels, and scan line interaction.

**Files:**
- Modify: `index.html` — the `updateAndDrawFragments` function stub

- [ ] **Step 1: Implement `updateAndDrawFragments()`**

Replace the stub with:

```javascript
      function updateAndDrawFragments(rgb) {
        if (dataFragments.length === 0) return;

        var lastScanY = scanLines.length > 0 ? scanLines[scanLines.length - 1].y : H * 0.85;
        ctx.textAlign = 'left';

        for (var fi = dataFragments.length - 1; fi >= 0; fi--) {
          var frag = dataFragments[fi];

          // -- Update position --
          frag.y += frag.speed;
          frag.x += (W / 2 - frag.x) * 0.008; // converge toward center

          // -- Deposit: rapid fade below last scan line --
          if (frag.y > lastScanY) {
            frag.opacity *= 0.94;
            frag.fontSize = Math.max(9, frag.fontSize - 0.05);
          }

          // -- Remove if done --
          if (frag.y > H + 20 || frag.opacity < 0.05) {
            dataFragments.splice(fi, 1);
            continue;
          }

          // -- Check scan line intersections --
          var nearScanLine = false;
          for (var si = 0; si < scanLines.length; si++) {
            var dist = Math.abs(frag.y - scanLines[si].y);
            if (dist < 8) {
              nearScanLine = true;
              // Count crossing (only once per line — use a bitmask-like approach)
              var lineBit = 1 << si;
              if (!(frag._crossedLines & lineBit)) {
                frag._crossedLines = (frag._crossedLines || 0) | lineBit;
                frag.crossings++;
                if (!isMobile) {
                  frag.statusText = frag.crossings >= 2 ? 'EXTRACTED' : 'CLASSIFYING';
                }
              }
              // Register local brightening on this scan line
              var brights = scanLineBrightness[si];
              var found = false;
              for (var bi = 0; bi < brights.length; bi++) {
                if (Math.abs(brights[bi].x - frag.x) < 30) {
                  brights[bi].intensity = 1;
                  found = true;
                  break;
                }
              }
              if (!found) {
                brights.push({ x: frag.x, intensity: 1 });
              }
              break;
            }
          }

          // Flash intensity: ramp up near scan line, decay after
          if (nearScanLine) {
            frag.flashIntensity = Math.min(1, frag.flashIntensity + 1 / 6);
            frag.nodeOpacity = Math.min(1, frag.nodeOpacity + 0.2);
          } else {
            frag.flashIntensity = Math.max(0, frag.flashIntensity - 1 / 12);
            frag.nodeOpacity = Math.max(0, frag.nodeOpacity - 0.1);
          }

          // -- Render motion trail --
          var trailLen = isMobile ? (12 + frag.speed * 2) : (18 + frag.speed * 4);
          trailLen = Math.min(trailLen, 28) * (frag.opacity / 0.9);
          var trailGrad = ctx.createLinearGradient(frag.x + 4, frag.y - trailLen - 4, frag.x + 4, frag.y - 4);
          trailGrad.addColorStop(0, 'rgba(' + rgb + ',0)');
          trailGrad.addColorStop(1, 'rgba(' + rgb + ',' + frag.opacity * 0.35 * currentAlpha + ')');
          ctx.fillStyle = trailGrad;
          ctx.fillRect(frag.x + 3, frag.y - trailLen - 4, 1.5, trailLen);

          // -- Render intersection node --
          if (frag.nodeOpacity > 0.01) {
            ctx.beginPath();
            ctx.arc(frag.x - 10, frag.y + frag.fontSize * 0.35, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + rgb + ',' + frag.nodeOpacity * frag.opacity * currentAlpha + ')';
            ctx.shadowColor = 'rgba(' + rgb + ',' + frag.nodeOpacity * 0.9 + ')';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // -- Render fragment text with glow --
          var flash = frag.flashIntensity;
          ctx.font = '700 ' + frag.fontSize + 'px "JetBrains Mono", monospace';

          // Layer 1: wide soft glow
          ctx.shadowColor = 'rgba(' + rgb + ',' + (0.25 + flash * 0.25) + ')';
          ctx.shadowBlur = 30;
          ctx.fillStyle = 'rgba(' + rgb + ',' + frag.opacity * currentAlpha * 0.5 + ')';
          ctx.fillText(frag.text, frag.x, frag.y);

          // Layer 2: tight bright glow
          ctx.shadowColor = 'rgba(' + rgb + ',' + (0.65 + flash * 0.25) + ')';
          ctx.shadowBlur = 12;
          // Lerp color from accent to near-white during flash
          var r = parseInt(accentColor.slice(1, 3), 16);
          var g = parseInt(accentColor.slice(3, 5), 16);
          var b2 = parseInt(accentColor.slice(5, 7), 16);
          var fr = Math.round(r + (255 - r) * flash * 0.8);
          var fg = Math.round(g + (212 - g) * flash * 0.8);
          var fb = Math.round(b2 + (196 - b2) * flash * 0.8);
          ctx.fillStyle = 'rgba(' + fr + ',' + fg + ',' + fb + ',' + frag.opacity * currentAlpha + ')';
          ctx.fillText(frag.text, frag.x, frag.y);
          ctx.shadowBlur = 0;

          // -- Render status label (desktop only) --
          if (frag.statusText && !isMobile) {
            ctx.font = '400 8px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(' + rgb + ',' + 0.35 * frag.opacity * currentAlpha + ')';
            ctx.letterSpacing = '1.5px';
            ctx.fillText(frag.statusText, frag.x, frag.y + frag.fontSize + 4);
            ctx.letterSpacing = '0px';
          }
        }
      }
```

- [ ] **Step 2: Test a full message cycle at desktop width (1280px)**

Open the page at 1280px width. Watch a full cycle: type → highlight → send → vault. During `sending`:
- Fragments should appear near the top, falling downward
- They should glow orange with visible text at 14px
- When crossing scan lines, text should flash brighter/whiter
- Status labels should appear below fragments
- Fragments should converge toward center and fade at the bottom
- Fibers should pulse when fragments pass near them
- Scan lines should brighten locally at intersection points

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Implement fragment rendering with glow, intercept flash, status labels"
```

---

### Task 5: Implement `drawHotspot()`

Render the convergence hotspot at the bottom of the canvas.

**Files:**
- Modify: `index.html` — the `drawHotspot` function stub

- [ ] **Step 1: Implement `drawHotspot()`**

Replace the stub with:

```javascript
      function drawHotspot(rgb) {
        // Pulse hotspot when fragments are near the bottom
        var hotspotTarget = 0;
        var lastScanY = scanLines.length > 0 ? scanLines[scanLines.length - 1].y : H * 0.85;
        for (var i = 0; i < dataFragments.length; i++) {
          if (dataFragments[i].y > lastScanY) {
            hotspotTarget = 0.2;
            break;
          }
        }
        // Also pulse during active sending even without fragments past last line
        if (currentAlpha > 0.5 && dataFragments.length > 0) {
          hotspotTarget = Math.max(hotspotTarget, 0.1);
        }

        if (hotspotTarget > hotspotOpacity) {
          hotspotOpacity += (hotspotTarget - hotspotOpacity) * 0.12;
        } else {
          hotspotOpacity += (hotspotTarget - hotspotOpacity) * 0.04;
        }

        if (hotspotOpacity < 0.005) return;

        var hotW = isMobile ? W * 0.8 : W * 0.6;
        var hotH = H * 0.15;
        var hotX = (W - hotW) / 2;
        var hotY = H - hotH;

        var grad = ctx.createRadialGradient(
          W / 2, H, 0,
          W / 2, H, hotW / 2
        );
        grad.addColorStop(0, 'rgba(' + rgb + ',' + hotspotOpacity * currentAlpha + ')');
        grad.addColorStop(1, 'rgba(' + rgb + ',0)');

        ctx.fillStyle = grad;
        ctx.fillRect(hotX, hotY, hotW, hotH);
      }
```

- [ ] **Step 2: Verify hotspot pulses before fork activation**

Watch a full cycle. When fragments reach the bottom of the canvas (past the last scan line), a warm glow should appear at the bottom center. This should happen just before the fork divider pulses orange.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Implement convergence hotspot with fragment-driven pulse"
```

---

### Task 6: Test User Input Flow

Verify the canvas handles user-typed messages correctly.

**Files:**
- No code changes expected (fix if issues found)

- [ ] **Step 1: Test user input at desktop**

Click the chat input, type something personal like "I'm worried about my job security", press Enter. Verify:
- The canvas activates during the sending phase
- Fragments appear with the analyzed labels (e.g., "emotion: worried", "work: job security")
- Fragments glow, cross scan lines, show status labels, converge, and fade
- The fork pulses and vault pills appear
- After the user message cycle completes, auto-typing resumes normally

- [ ] **Step 2: Test at mobile width (375px)**

Resize to 375px width. Watch one full auto-cycle and one user-input cycle. Verify:
- Canvas is 120px tall
- Only 3 fibers and 2 scan lines visible
- Fragment font is 12px
- No status labels appear
- Motion trails are shorter
- Everything still fits and is legible

- [ ] **Step 3: Test theme toggle**

Switch between dark and light themes mid-animation. Verify:
- Colors update immediately (accent changes)
- No rendering artifacts or stuck colors
- Fibers and scan lines use the new accent color

- [ ] **Step 4: Commit (if any fixes needed)**

```bash
git add index.html
git commit -m "Fix canvas issues found during testing"
```

---

### Task 7: Polish & Performance Verification

Fine-tune visual parameters and verify 60fps performance.

**Files:**
- Modify: `index.html` — adjust numeric values if needed

- [ ] **Step 1: Tune fragment speed for legibility**

Watch 3 full cycles. If fragments move too fast to read, reduce `sending.speed` from 2.5 toward 2.0. If too slow (animation feels sluggish), increase toward 3.0. Adjust in the `states` object.

- [ ] **Step 2: Tune glow intensity**

If the glow is overwhelming or washed out, adjust:
- `shadowBlur` values in `updateAndDrawFragments` (currently 30 wide, 12 tight)
- `flashIntensity` ramp rates (currently 1/6 up, 1/12 down)
- Fiber `baseAlpha` values (currently 0.18 center, 0.13 edge)
- Scan line `peakAlpha` values (currently 0.18 → 0.45)

- [ ] **Step 3: Check `letterSpacing` canvas support**

`ctx.letterSpacing` is a relatively new canvas API. If it causes errors in any browser, remove the two `letterSpacing` lines in `updateAndDrawFragments` — the status labels will still work, just without extra spacing.

- [ ] **Step 4: Performance check**

Open Chrome DevTools Performance tab. Record a full sending cycle. Verify:
- Frame rate stays at 60fps (no drops below 50fps)
- No long tasks (>50ms)
- `shadowBlur` is only used on fragment text and intersection nodes (not fibers or scan lines)

- [ ] **Step 5: Commit final tuning**

```bash
git add index.html
git commit -m "Tune dataflow canvas visual parameters and verify performance"
```

---

## Summary

| Task | What it builds | Key risk |
|------|---------------|----------|
| 1 | Strip rain, scaffold new structure | Breaking existing API |
| 2 | Vertical fiber lines + proximity glow | Performance of per-fragment distance checks |
| 3 | Horizontal scan lines + drift + local brightening | Visual clutter from too many gradients |
| 4 | Fragment rendering (the hero) | `shadowBlur` perf, `letterSpacing` compat |
| 5 | Convergence hotspot | Timing alignment with fork pulse |
| 6 | User input + mobile + theme testing | Responsive edge cases |
| 7 | Polish & performance | Subjective tuning |
