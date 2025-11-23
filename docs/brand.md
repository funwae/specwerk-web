# SpecWerk Brand Guide

_Last updated: v0.1 MVP_

SpecWerk is a **spec-first AI automation runtime** with a deliberate, industrial aesthetic:

> Kraftwerk control room meets serious internal tools platform.

The brand should feel:

- Precise and engineered (not playful SaaS slop)
- Slightly euro-weird, but confident
- Minimal, grid-driven, and functional

---

## 1. Logo & Mark

### 1.1 Wordmark

Primary logo text: **SPECWERK** (all caps).

Key characteristics:

- Custom letterforms built from a semi-condensed grotesk base.
- Tight tracking, rectangular overall silhouette.
- Two distinctive **triple-bar "E"s**:
  - No vertical stem.
  - Three horizontal bars decreasing in length from top to bottom.
  - Bars share the same stroke weight as other stems.

Letter personality (for visual designers):

- **S**: Slightly squared, with subtly flattened top/bottom curves. May use small 45° chamfers on outer corners.
- **P**: Compact, almost rectangular bowl, aligned to the vertical stems of W/K.
- **E**s: Triple-bar construction (hero feature), read as both "E" and "spec lines / steps".
- **W**: Tall, sharp W; four vertical-ish strokes with acute inner angles; not too wide.
- **R**: Compact bowl; leg aligns angle with K's lower diagonal.
- **K**: Short upper diagonal arm; extended lower diagonal "lever" to suggest mechanical action.

#### Wordmark Variants

1. **Primary wordmark**
   - All black (`Werk Black`) on light background.
   - Both E's use triple-bar construction.

2. **Accent wordmark**
   - Same as primary, but triple-bar E's filled with `SpecWerk Red`.
   - Use sparingly (hero, slides, key marketing surfaces).

3. **Monochrome**
   - Entire wordmark in white on black or red backgrounds.
   - Triple-bar E's remain visually distinct by shape alone.

---

### 1.2 Icon (Graphic Mark)

The icon is the condensed symbol of "spec lines as steps":

- A red square with slightly rounded corners.
- Three horizontal white bars inside, each shorter than the one above it:
  - Top bar: full width.
  - Middle bar: ~80% of top.
  - Bottom bar: ~60% of top.

This mirrors the triple-bar E in the wordmark and represents:

- Spec lines
- Workflow steps
- Reduction / convergence

Usage:

- Favicon, app icon, Studio header symbol.
- Can be used alone at small sizes or alongside the wordmark for headers.

---

## 2. Color System

Core palette:

- **SpecWerk Red**
  `#E50012`
  Primary accent, icon background, occasional highlight in wordmark.

- **Werk Black**
  `#111111`
  Main text, logo color, dark UI elements.

- **Control Gray**
  `#F5F5F5`
  Default app and marketing background (panel surfaces).

- **Line Gray**
  `#D4D4D4`
  Borders, separators, subtle grid lines.

- **Console Green (optional accent)**
  `#00D66B`
  For "RUNNING / ONLINE / PASS" states in Studio. Avoid in logo.

Suggested CSS tokens:

```css
:root {
  --specwerk-red: #E50012;
  --specwerk-black: #111111;
  --specwerk-bg: #F5F5F5;
  --specwerk-line: #D4D4D4;
  --specwerk-ok: #00D66B;
}
```

---

## 3. Typography

### 3.1 Logo & Display

The wordmark is custom; for headings and big text, use:

* **Display / headings**: `Space Grotesk`
  * Weights: 500–600
  * Use for page titles, section headings, large labels.

Example CSS:

```css
:root {
  --font-display: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

### 3.2 Body & UI

For general UI/body text:

* **Body**: `Inter` *or* `IBM Plex Sans`
  * Weights: 400–500
  * Use for paragraphs, labels, small controls.

For code / terminal:

* **Mono**: `IBM Plex Mono` or `JetBrains Mono`

Example CSS:

```css
body {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

code, pre, .terminal {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

---

## 4. Layout & Tone

* **Grid**: 8px baseline grid for all UI and marketing layouts.
* **Mood**: "Control panel, not brochure."
* **Shapes**: Rectangles, squares, and simple diagonals; avoid bubbly, organic blobs.
* **Motion**: Subtle. Icon bars may shift slightly on hover to suggest a cycle or step.

Copy tone:

* Direct, succinct, slightly dry.
* Humor is allowed in **opt-in modes** (e.g., "Gunther Mode"), not in default enterprise copy.

---

## 5. Do & Don't

**Do**

* Use the icon alone at small sizes (favicon, app tile).
* Use the full wordmark on marketing pages and splash screens.
* Keep color usage minimal: mostly black and grays, with controlled red.

**Don't**

* Don't replace the triple-bar E with a standard E in the logo.
* Don't apply gradients or glows to the logo.
* Don't mix playful "AI slop" visuals (bubbles, cartoons) into core SpecWerk branding.

