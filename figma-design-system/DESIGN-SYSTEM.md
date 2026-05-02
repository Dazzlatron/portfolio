# Daryn Higginson Portfolio — Design System Spec
> Use this alongside `tokens.json` to build the Figma design system.

---

## How to import into Figma

1. Install the **Tokens Studio for Figma** plugin (free, formerly "Figma Tokens")
2. Open the plugin → click the sync icon → choose **Local** → point it to `tokens.json`
3. Apply token sets: enable **global** always, then toggle **light** or **dark** as your active theme
4. Run "Create styles" to generate Figma color styles, text styles, and effects

---

## 1. Color Palette

### Brand
| Token | Hex | Usage |
|-------|-----|-------|
| `brand.red` | `#FF1515` | CTAs, bullet markers, logo accent square, rdot punctuation |
| `brand.red-dark` | `#C81414` | Tablet nav arrows |

### Neutral Scale
| Token | Hex | Notes |
|-------|-----|-------|
| `neutral.black` | `#121212` | Dark bg / light text |
| `neutral.900` | `#1e1e1e` | Dark secondary surface |
| `neutral.800` | `#2a2a2a` | Dark hover |
| `neutral.700` | `#424242` | Dark border (toggle) |
| `neutral.600` | `#616161` | Dark mode border |
| `neutral.500` | `#858585` | Image borders dark mode |
| `neutral.400` | `#a2a2a2` | Muted labels (TECHNOLOGIES, MY SWEET SPOT) |
| `neutral.350` | `#a6a6a6` | Side nav inactive links |
| `neutral.300` | `#c3c3c3` | Dark mode small-header |
| `neutral.200` | `#d1d1d1` | Light mode border |
| `neutral.50` | `#f3f3f3` | Light secondary surface |
| `neutral.white` | `#fbfbfb` | Light bg / dark text |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| Success bg | `#d4edda` | Form success message |
| Success text | `#155724` | |
| Error bg | `#f8d7da` | Form error message |
| Error text | `#721c24` | |
| Info | `#007acc` | Badge text |

---

## 2. Typography

### Font Families
| Name | CSS class | Weight | Usage |
|------|-----------|--------|-------|
| **biryanibold** | `.biriyani-bold` | Bold | h1 hero name, section headers |
| **biryaniregular** | — | Regular | General body |
| **biryanilight** | `.biriyani-light` | Light | h2 subtitle, descriptions, nav links, body copy |

> In Figma: add all three as local styles. The font files are in `/assets/fonts/`.

### Type Scale
| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Hero Name | 28px | Bold | 130% | `h1.my-name` |
| Hero Subtitle | 16.5px | Light | — | `h2.title` |
| Section Header | 28px | Bold | — | `.section-header-28` |
| Section Header LG | 34px | Bold | — | `.section-header-34` |
| Body / Description | 16px | Light | 140% | `.description`, `p` |
| Body SM | 14px | Light | — | Nav links, skill cards |
| Paragraph LG | 18px | Light | — | `.paragraph-18px` |
| Label / Tag | 12px | Medium | — | `.left-icon-text` |
| Small Header | 14px | Regular | — | `.small-header` — uppercase, muted (#a2a2a2) |
| Badge | 9.6px (0.6rem) | — | — | `.badge`, `.badge-exploring` |

---

## 3. Spacing

All spacers are named by rem value (base 16px):

| Class | px value | Usage |
|-------|----------|-------|
| `spacer-1rem` | 16px | Tight gaps |
| `spacer-1-5rem` | 24px | |
| `spacer-2rem` | 32px | |
| `spacer-2-5rem` | 40px | Between grid rows |
| `spacer-3rem` | 48px | Section internal gaps |
| `spacer-6rem` | 96px | Major section separators |
| `spacer-8rem` | 128px | Top of About section |

Form gap: `20px` between form row fields
Skill card gap: `0.85rem ≈ 13.6px`
Grid column pad: `10px 20px`

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 3px | Badge pills |
| `md` | 5px | Form inputs |
| `lg` | 10px | Skill cards, project hero, highlight-box |
| `full` | 19px | Toggle switch track |
| `circle` | 50% | Toggle ball, testimonial avatar |
| `logo-square` | 4px | Logo SVG grid squares |

---

## 5. Shadows / Effects

Buttons use a hard-offset drop shadow (no blur — think retro press effect):

| State | Shadow | Mode |
|-------|--------|------|
| Default | `x:-1, y:1, blur:0, spread:1` | Light: `#121212` / Dark: `#fbfbfb` |
| Hover | `x:-3, y:3, blur:0, spread:1` | Same colours |

---

## 6. Components to build in Figma

### Navigation — Side Nav
- Fixed left rail, hidden until hero scrolled past
- Logo (GIF/SVG) at top
- Nav items: text + arrow SVG
- Theme toggle at bottom
- States: default, hover, active/selected

### Navigation — Mobile Header
- Fixed top, hides on scroll with `translateY(-100%)`
- Logo left, nav links centre (tablet), hamburger + toggle right

### Toggle Switch
- Track: 43×20px, radius 19px, border 1px
- Ball: 12×12px, radius 50%
- States: light (ball left) / dark (ball right)
- Transition: 0.3s ease

### Skill Card
- Padding: `9px 20px 10px`
- Border: 1px solid, radius 10px
- Hover: `translateY(-2px)`, bg `#e9f3ff`
- Dark hover: bg `#2a2a2a`

### Button (Gradient / Submit)
- Border: 1px solid text color
- Background: matches page bg
- Hard offset shadow (see Shadows above)
- Hover: shadow increases to 3px offset

### Philosophy Card (phil-box)
- Contains: icon + h3 + description paragraph
- Three types: creativity, technology, magic

### Testimonial / Quote Card
- Quotation mark icon top-left
- Long paragraph text
- Quotee row: avatar (circle) + name (bold) + title (light, smaller)

### Form Inputs
- Text input + textarea
- Border: 1px solid `#b8b8b8` (light) / `#616161` (dark)
- Border radius: 5px
- Padding: 8px
- Form row gap: 20px

### Section Header Pattern
- Optional: small uppercase label (muted color) above main h2
- h2 ends with `<span class="rdot">.</span>` — red dot punctuation `#FF1515`

### Cursor (custom)
- Core dot: radial gradient (white in dark, dark in light)
- Ring: border circle, expands on hover over interactive elements

---

## 7. Motion / Animation Reference

| Name | Duration | Easing | Trigger |
|------|----------|--------|---------|
| Hero fade in | 1s | ease-out | Page load |
| Logo squares pop | 0.6s staggered (0.05s) | ease-in-out | Hover |
| Arrow pulse | 1s infinite | ease | Always |
| Header hide | 0.3s | ease | Scroll |
| Nav appear | 0.6s cubic-bezier(0.25,0.1,0.25,1) | — | Scroll past hero |
| Skill card lift | 0.2s | ease | Hover |
| Button shadow | 0.2s | ease | Hover |

---

## 8. Grid / Layout

- Main content max-width: constrained by `.center-content` wrapper
- 12-column grid system (`.cont.twelve`)
- Two-column bullet grid: `gap: 60px`
- Philosophy section: 5 cols (card + icon + card + icon + card)
- Side nav: fixed left, ~200px wide (implicitly)

---

## 9. Theme System

Two themes share the same component structures but swap tokens:

| | Light | Dark |
|--|-------|------|
| BG | `#fbfbfb` | `#121212` |
| Text | `#121212` | `#fbfbfb` |
| Border | `#d1d1d1` | `#616161` |
| Accent | `#FF1515` | `#FF1515` |
| Nav text inactive | `#a2a2a2` | `#a6a6a6` |
| Nav text active | `#121212` | `#fbfbfb` |
| Button shadow | `#121212` | `#fbfbfb` |
| Hero gradient | `#fbfbfb` fade | `#121212` fade |
| Footer dot pattern | `#d1d1d1` | `#313131` |

In Figma: use **variable modes** (light/dark) or the Tokens Studio theme sets.
