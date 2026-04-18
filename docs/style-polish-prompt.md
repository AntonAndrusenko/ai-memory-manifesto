# Style Polish & WCAG Audit Prompt: AI Memory Manifesto Landing Page

Use this prompt in a fresh Claude Code session. Open the project directory, start a local server, and run this prompt. **This session should produce fixes, not just a report.**

---

## Prompt

I need a deep style consistency, typography, color, WCAG compliance, and alignment audit of the landing page for the AI Memory Manifesto — with fixes applied.

**Live URL**: https://memorymanifesto.org (or run `python3 -m http.server 8765` and open http://localhost:8765/index.html)

**The page is a single `index.html` file** with inline CSS (~1300 lines), HTML, and JS (~500 lines). Shared styles for subpages live in `page.css`. The WebGL shader background is in `shader.js`. No frameworks — vanilla HTML/CSS/JS.

### What you're auditing

The page has: a hero section, an interactive "memory lock-in reveal" section (chat simulation, Matrix rain canvas, vault/export split, profile card, punchline), a beliefs section, a 16-item rights grid, an urgency section, a "claim your memory" interactive, a CTA, and a footer. It supports dark and light themes toggled via a button. It must work at desktop (1280px), tablet (768px), and mobile (375px).

---

## Audit Areas

### 1. Typography Consistency

Audit every text element on the page and verify:

- **Font family usage is intentional**: The page defines three families — `--serif` (Outfit), `--mono` (JetBrains Mono), `--sans` (DM Sans). Each should have a clear role. Flag any element using the wrong family for its context (e.g., body copy in mono, labels in serif).
- **Font weight consistency**: Headers, labels, body text, and UI elements should use consistent weight tiers. Flag any element with a weight that doesn't match its role.
- **Font size scale**: Check that sizes follow a coherent scale (no arbitrary jumps). All sizes should use `clamp()` or `rem` — flag any `px` font sizes. Flag sizes that feel too close together (e.g., 0.6rem and 0.65rem serving different roles — pick one).
- **Line height consistency**: Body text should have consistent line-height across all sections. Flag any mismatches.
- **Letter-spacing consistency**: Uppercase labels should use consistent letter-spacing. Flag any variations.
- **`font-display: swap`**: Verify it's in the Google Fonts URL.

### 2. Color System & WCAG Compliance

For every text/background color combination on the page, in both dark and light themes:

- **Compute the contrast ratio** (WCAG 2.1 formula). Use the actual CSS variable values from `[data-theme="dark"]` and `[data-theme="light"]` blocks.
- **Flag any combination below 4.5:1** for normal text (AA) or below 3:1 for large text (AA).
- **Flag any combination below 7:1** if it should meet AAA (primary body text, critical UI).
- **Check accent color on backgrounds**: The `--accent` color is used on `--bg`, `--surface`, and inside highlights. Verify contrast in all combinations.
- **Check `--dim` and `--muted` usage**: These are used for secondary text. Verify they meet AA on `--bg` and `--surface`.
- **Check the vault frost overlay**: The "Access denied" text and lock icon use `--dim` on a blurred `--surface` background. Verify readability.
- **Check label tags**: `.mr-label` has a custom background in both themes. Verify the label text is readable against its background AND that the label background has enough contrast against the highlight span.
- **Check the export card**: `--dim` text on `--surface` background in a small card. Verify.
- **Check the rights grid**: `.right` cards use `--text` on `--surface`. Verify hover states too.
- **Produce a contrast table**: For every unique color pair, list: element, foreground, background, ratio, pass/fail for AA and AAA.

### 3. Spacing & Alignment

- **Vertical rhythm**: Check that vertical spacing (margins, paddings) between sections follows a consistent scale. Flag any arbitrary values.
- **Horizontal alignment**: All centered content should be truly centered. Check with browser DevTools overlay. Flag any elements that are off-center by even 1-2px.
- **Container width consistency**: The page uses `max-width: 720px` for `.mr-container` and `max-width: 680px` for child elements. Verify these are applied consistently and nothing exceeds its container.
- **Padding consistency**: Left/right padding should be uniform. Check at all breakpoints.
- **Gap consistency**: Flex/grid gaps should follow a scale (e.g., 6, 12, 16, 20, 24px). Flag any arbitrary gaps.
- **Element alignment within the vault**: Pills, dots, bars, titles should be vertically and horizontally aligned.
- **Element alignment within the export card**: Lines, header, footer should align cleanly.
- **Mobile alignment**: At 375px, verify no content touches the screen edge (minimum 16px padding).

### 4. Visual Consistency Across Themes

- **Surface colors**: Do all card-like elements (vault, export, profile card, chat box, rights cards, claim section) use the same `--surface` value? Or are some hardcoded?
- **Border consistency**: All bordered elements should use the same `--border` value and width. Flag any hardcoded borders or inconsistent widths.
- **Border-radius consistency**: Cards should use a consistent radius (e.g., 16px for large cards, 8px for smaller elements). Flag any deviations.
- **Shadow consistency**: If any elements use box-shadow, verify shadows are consistent in style and appropriate for the theme (dark themes need different shadows than light themes).
- **Transition consistency**: Interactive elements should have consistent transition durations and easings. Flag any that feel faster/slower than siblings.
- **Icon sizing**: SVG icons should be consistently sized within their context (nav icons, card icons, inline icons).

### 5. Responsive Polish

At each breakpoint (1280px, 768px, 375px), check:

- **No horizontal overflow**: Nothing should cause a horizontal scrollbar.
- **No text truncation**: All text should be fully readable.
- **Touch targets**: All interactive elements should be at least 44x44px on mobile.
- **Readable font sizes**: Nothing below 12px on mobile.
- **Image/canvas sizing**: The dataflow canvas and shader canvas should scale cleanly.
- **Navigation**: Hamburger menu should work, all links should be accessible.

### 6. Micro-Details

- **Cursor styles**: Interactive elements should have `cursor: pointer`. Non-interactive elements should not.
- **Selection colors**: Check if `::selection` is styled to match the theme.
- **Scrollbar styling**: If custom, verify it matches the theme. If default, verify it doesn't clash.
- **Print styles**: Not critical, but flag if printing produces a blank page.
- **Placeholder text styling**: `.mr-placeholder` should match the theme's muted text.
- **Code block styling**: The claim section's JSON preview should have proper syntax styling.

---

## Methodology

1. Read the full `index.html` CSS section. Catalog every color variable, font declaration, spacing value, border-radius, and transition.
2. Start a local server. Open the page in Chrome with DevTools.
3. In both dark and light themes, at desktop width:
   - Take a full-page screenshot
   - Use DevTools accessibility panel to audit contrast
   - Use DevTools Layout panel to check alignment
4. Repeat at 375px width.
5. Produce a findings table for each audit area.
6. **Fix every issue you find.** For each fix, explain what was wrong and what you changed.
7. After all fixes, take before/after screenshots to verify the improvements.
8. Run a Lighthouse accessibility audit before and after — report the scores.

### Priority order for fixes

1. **WCAG failures** — contrast ratios below AA are bugs, fix first
2. **Alignment errors** — off-center elements, inconsistent padding
3. **Typography inconsistencies** — wrong font family, weight, or size for context
4. **Spacing inconsistencies** — arbitrary margins/paddings that break rhythm
5. **Theme inconsistencies** — elements that look right in dark but wrong in light (or vice versa)
6. **Micro-details** — cursors, selection, scrollbar

### Constraints

- The page must remain a single HTML file with no build step
- No external JS dependencies
- Must work in all modern browsers without polyfills
- Must support dark/light theme toggle
- `--accent` color is the brand color — do not change its hue, only adjust lightness/saturation if needed for contrast
- Do not change the visual design language (warm dark theme, cool light theme) — only fix inconsistencies within it
- Do not add features or change functionality — this is purely a visual polish pass
