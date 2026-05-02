// ─────────────────────────────────────────────
// DARYN HIGGINSON — PORTFOLIO DESIGN SYSTEM
// Figma Plugin: Builds the full DS page
// ─────────────────────────────────────────────

// ── 1. TOKEN CONSTANTS ────────────────────────

const C = {
  red:           '#FF1515',
  redDark:       '#C81414',
  black:         '#121212',
  white:         '#fbfbfb',
  n900:          '#1e1e1e',
  n800:          '#2a2a2a',
  n700:          '#424242',
  n600:          '#616161',
  n500:          '#858585',
  n400:          '#a2a2a2',
  n350:          '#a6a6a6',
  n300:          '#c3c3c3',
  n200:          '#d1d1d1',
  n100:          '#e3e3e3',
  n50:           '#f3f3f3',
  heroText:      '#0C0C0C',
  hoverBlue:     '#e9f3ff',
  inputBorder:   '#b8b8b8',
  successBg:     '#d4edda',
  successText:   '#155724',
  successBorder: '#c3e6cb',
  errorBg:       '#f8d7da',
  errorText:     '#721c24',
  errorBorder:   '#f5c6cb',
  info:          '#007acc',
  infoBg:        '#e0f2ff',
};

const RADII = { logo: 4, sm: 3, md: 5, lg: 10, full: 19 };

const SPACING_SCALE = [16, 24, 32, 40, 48, 96, 128];

// Primary font. Fallback to Inter if Biryani isn't installed.
let FONT_BOLD    = { family: 'Biryani', style: 'Bold' };
let FONT_REGULAR = { family: 'Biryani', style: 'Regular' };
let FONT_LIGHT   = { family: 'Biryani', style: 'Light' };

// ── 2. HELPERS ───────────────────────────────

/** Parse a CSS hex string → Figma RGB (0-1) */
function rgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

function solidFill(hex) {
  return [{ type: 'SOLID', color: rgb(hex) }];
}

function solidStroke(hex) {
  return [{ type: 'SOLID', color: rgb(hex) }];
}

/**
 * Create an auto-layout frame and append it to a parent (or the current page).
 */
function makeFrame(name, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.fills = opts.fills !== undefined ? opts.fills : [];
  if (opts.color) f.fills = solidFill(opts.color);
  if (opts.w) f.resize(opts.w, opts.h || 100);
  if (opts.layout) {
    f.layoutMode = opts.layout; // 'HORIZONTAL' | 'VERTICAL' | 'NONE'
    f.primaryAxisSizingMode   = opts.primarySize   || 'AUTO';
    f.counterAxisSizingMode   = opts.counterSize   || 'AUTO';
    f.primaryAxisAlignItems   = opts.primaryAlign  || 'MIN';
    f.counterAxisAlignItems   = opts.counterAlign  || 'MIN';
    f.itemSpacing             = opts.gap           || 0;
    f.paddingTop    = opts.pt ?? opts.pad ?? 0;
    f.paddingBottom = opts.pb ?? opts.pad ?? 0;
    f.paddingLeft   = opts.pl ?? opts.padH ?? 0;
    f.paddingRight  = opts.pr ?? opts.padH ?? 0;
    if (opts.wrap) f.layoutWrap = 'WRAP';
  }
  if (opts.radius  !== undefined) f.cornerRadius = opts.radius;
  if (opts.stroke)  { f.strokes = solidStroke(opts.stroke); f.strokeWeight = opts.strokeW || 1; }
  if (opts.strokeAlign) f.strokeAlign = opts.strokeAlign;
  if (opts.parent)  opts.parent.appendChild(f);
  if (opts.x !== undefined) f.x = opts.x;
  if (opts.y !== undefined) f.y = opts.y;
  return f;
}

/** Create a styled text node */
function makeText(chars, opts = {}) {
  const t = figma.createText();
  t.fontName     = opts.font    || FONT_REGULAR;
  t.fontSize     = opts.size    || 14;
  t.characters   = chars;
  t.fills        = solidFill(opts.color || C.black);
  if (opts.lineH) t.lineHeight = { unit: 'PERCENT', value: opts.lineH };
  if (opts.upper) t.textCase   = 'UPPER';
  if (opts.align) t.textAlignHorizontal = opts.align;
  if (opts.parent) opts.parent.appendChild(t);
  return t;
}

/** Create a section eyebrow label */
function sectionLabel(text, parent) {
  return makeText(text, {
    font: FONT_BOLD, size: 10, color: C.n400,
    upper: true, parent,
  });
}

// ── 3. COLOR PAGE ────────────────────────────

function buildColorsPage(xOffset) {
  const outer = makeFrame('🎨 Colors', {
    layout: 'VERTICAL', gap: 48, pad: 48, x: xOffset, y: 0,
  });

  // ── Palette definition
  const palettes = [
    {
      label: 'Brand',
      bg: null,
      swatches: [
        { hex: C.red,     name: 'brand.red',     label: '#FF1515 — Brand Accent' },
        { hex: C.redDark, name: 'brand.red-dark', label: '#C81414 — Accent Dark' },
      ],
    },
    {
      label: 'Neutral Scale — Light Context',
      bg: null,
      swatches: [
        { hex: C.white, name: 'white',    label: '#fbfbfb' },
        { hex: C.n50,   name: 'n50',      label: '#f3f3f3' },
        { hex: C.n100,  name: 'n100',     label: '#e3e3e3' },
        { hex: C.n200,  name: 'n200',     label: '#d1d1d1 — Light Border' },
        { hex: C.n300,  name: 'n300',     label: '#c3c3c3' },
        { hex: C.n350,  name: 'n350',     label: '#a6a6a6 — Nav Inactive' },
        { hex: C.n400,  name: 'n400',     label: '#a2a2a2 — Labels' },
        { hex: C.n500,  name: 'n500',     label: '#858585' },
        { hex: C.n600,  name: 'n600',     label: '#616161 — Dark Border' },
        { hex: C.n700,  name: 'n700',     label: '#424242' },
        { hex: C.n800,  name: 'n800',     label: '#2a2a2a — Dark Hover' },
        { hex: C.n900,  name: 'n900',     label: '#1e1e1e — Dark Surface' },
        { hex: C.black, name: 'black',    label: '#121212 — Dark BG' },
      ],
    },
    {
      label: 'Semantic',
      bg: null,
      swatches: [
        { hex: C.successBg,   name: 'success-bg',     label: '#d4edda' },
        { hex: C.successText, name: 'success-text',   label: '#155724' },
        { hex: C.errorBg,     name: 'error-bg',       label: '#f8d7da' },
        { hex: C.errorText,   name: 'error-text',     label: '#721c24' },
        { hex: C.info,        name: 'info',           label: '#007acc' },
        { hex: C.infoBg,      name: 'info-bg',        label: '#e0f2ff' },
      ],
    },
  ];

  for (const palette of palettes) {
    const group = makeFrame(palette.label, {
      layout: 'VERTICAL', gap: 16, parent: outer,
    });
    sectionLabel(palette.label, group);

    const grid = makeFrame('swatches', {
      layout: 'HORIZONTAL', gap: 12, wrap: true,
      primarySize: 'FIXED', w: 760, h: 10,
      parent: group,
    });
    grid.counterAxisSizingMode = 'AUTO';

    for (const swatch of palette.swatches) {
      const swatchGroup = makeFrame(swatch.name, {
        layout: 'VERTICAL', gap: 6, parent: grid,
      });

      // Colour block
      const block = makeFrame('block', {
        color: swatch.hex, w: 120, h: 64,
        radius: RADII.md, parent: swatchGroup,
      });
      // Add a subtle border so near-white swatches are visible
      block.strokes = solidStroke(C.n200);
      block.strokeWeight = 1;
      block.strokeAlign = 'INSIDE';

      makeText(swatch.label, {
        font: FONT_REGULAR, size: 10, color: C.n600,
        parent: swatchGroup,
      });
    }
  }

  figma.currentPage.appendChild(outer);
  return outer;
}

// ── 4. TYPOGRAPHY PAGE ───────────────────────

function buildTypePage(xOffset) {
  const outer = makeFrame('✍️ Typography', {
    layout: 'VERTICAL', gap: 0, pad: 48, x: xOffset, y: 0,
  });

  sectionLabel('Typography Scale', outer);

  const divider = () => {
    const d = makeFrame('divider', { w: 560, h: 1, color: C.n200, parent: outer });
    d.resize(560, 1);
  };

  const specimens = [
    {
      label: 'Hero Name — biryanibold 28px / 130%',
      chars: 'Hi, my name is Daryn :)',
      font: FONT_BOLD, size: 28, lineH: 130, color: C.black,
    },
    {
      label: 'Section Header — biryanibold 28px',
      chars: 'A little about me.',
      font: FONT_BOLD, size: 28, color: C.black,
      redDot: true,
    },
    {
      label: 'Section Header LG — biryanibold 34px',
      chars: 'Where creativity meets technology.',
      font: FONT_BOLD, size: 34, color: C.black,
      redDot: true,
    },
    {
      label: 'Hero Subtitle — biryanilight 16.5px',
      chars: 'I design and build digital experiences.',
      font: FONT_LIGHT, size: 16.5, color: C.black,
    },
    {
      label: 'Body / Description — biryanilight 16px / 140%',
      chars: 'Combining UX strategy, interface design, and front-end development to create fast, accessible, user-centred digital experiences.',
      font: FONT_LIGHT, size: 16, lineH: 140, color: C.black,
      wrap: true,
    },
    {
      label: 'Paragraph LG — biryanilight 18px',
      chars: 'I really enjoy creating, collaborating, and learning.',
      font: FONT_LIGHT, size: 18, color: C.black,
    },
    {
      label: 'Body SM / Nav — biryanilight 14px',
      chars: 'Projects  ·  About me  ·  Contact',
      font: FONT_LIGHT, size: 14, color: C.black,
    },
    {
      label: 'Small Header Label — 14px uppercase muted',
      chars: 'TECHNOLOGIES',
      font: FONT_REGULAR, size: 14, color: C.n400, upper: true,
    },
    {
      label: 'Badge — 9.6px uppercase',
      chars: 'EXPLORING',
      font: FONT_REGULAR, size: 9.6, color: C.info, upper: true,
    },
  ];

  for (const s of specimens) {
    const row = makeFrame(s.label, {
      layout: 'VERTICAL', gap: 6, pad: 16, parent: outer,
      primarySize: 'FIXED', w: 656, h: 10,
    });
    row.counterAxisSizingMode = 'AUTO';

    makeText(s.label, {
      font: FONT_REGULAR, size: 10, color: C.n400, parent: row,
    });

    const t = makeText(s.chars, {
      font: s.font, size: s.size, color: s.color,
      lineH: s.lineH, upper: s.upper, parent: row,
    });

    if (s.wrap) {
      t.textAutoResize = 'HEIGHT';
      t.resize(560, t.height);
    }

    // Red dot on the last character for section headers
    if (s.redDot) {
      const lastIdx = t.characters.length - 1;
      t.setRangeFills(lastIdx, lastIdx + 1, solidFill(C.red));
    }

    divider();
  }

  figma.currentPage.appendChild(outer);
  return outer;
}

// ── 5. SPACING + RADIUS PAGE ─────────────────

function buildSpacingPage(xOffset) {
  const outer = makeFrame('📐 Spacing & Radius', {
    layout: 'VERTICAL', gap: 48, pad: 48, x: xOffset, y: 0,
  });

  // ── Spacing bars
  sectionLabel('Spacing Scale', outer);
  const barsGroup = makeFrame('spacing-bars', {
    layout: 'VERTICAL', gap: 12, parent: outer,
  });

  const spacingLabels = {
    16: '1rem — Tight',
    24: '1.5rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem — Section gap',
    96: '6rem — Major separator',
    128: '8rem — About section top',
  };

  for (const px of SPACING_SCALE) {
    const row = makeFrame(`${px}px`, {
      layout: 'HORIZONTAL', gap: 16, counterAlign: 'CENTER', parent: barsGroup,
    });

    const bar = makeFrame('bar', {
      color: C.red, radius: 2, parent: row,
    });
    bar.resize(px, 20);

    makeText(`${px}px  —  ${spacingLabels[px] || ''}`, {
      font: FONT_REGULAR, size: 11, color: C.n500, parent: row,
    });
  }

  // ── Border radius swatches
  sectionLabel('Border Radius', outer);
  const radiusGroup = makeFrame('radius', {
    layout: 'HORIZONTAL', gap: 20, counterAlign: 'CENTER', parent: outer,
  });

  const radii = [
    { px: RADII.sm,   label: '3px — Badge' },
    { px: RADII.md,   label: '5px — Input' },
    { px: RADII.lg,   label: '10px — Card' },
    { px: RADII.full, label: '19px — Toggle' },
    { px: RADII.logo, label: '4px — Logo square' },
  ];

  for (const r of radii) {
    const col = makeFrame(`r-${r.px}`, {
      layout: 'VERTICAL', gap: 8, counterAlign: 'CENTER', parent: radiusGroup,
    });

    const swatch = makeFrame('swatch', {
      color: C.n50, radius: r.px,
      stroke: C.n200, strokeAlign: 'INSIDE',
      parent: col,
    });
    swatch.resize(56, 56);

    makeText(r.label, {
      font: FONT_REGULAR, size: 10, color: C.n500, parent: col,
    });
  }

  figma.currentPage.appendChild(outer);
  return outer;
}

// ── 6. COMPONENTS PAGE ───────────────────────

function buildComponentsPage(xOffset) {
  const outer = makeFrame('🧩 Components', {
    layout: 'VERTICAL', gap: 64, pad: 48, x: xOffset, y: 0,
  });

  // ─── Skill Card ─────────────────────────────
  {
    const section = makeFrame('Skill Card', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Skill Card', section);
    const row = makeFrame('variants', { layout: 'HORIZONTAL', gap: 20, counterAlign: 'CENTER', parent: section });

    const variants = [
      { name: 'Light / Default',  bg: C.white,    text: C.black,  border: C.n200,  note: '' },
      { name: 'Light / Hover',    bg: C.hoverBlue,text: C.black,  border: C.n200,  note: 'hover' },
      { name: 'Dark / Default',   bg: C.black,    text: C.white,  border: C.n600,  note: '' },
      { name: 'Dark / Hover',     bg: C.n800,     text: C.white,  border: C.n600,  note: 'hover' },
    ];

    for (const v of variants) {
      const col = makeFrame(v.name, { layout: 'VERTICAL', gap: 6, parent: row });

      const card = makeFrame('card', {
        layout: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
        color: v.bg, stroke: v.border, strokeAlign: 'INSIDE',
        radius: RADII.lg, pt: 9, pb: 10, pl: 20, pr: 20,
        parent: col,
      });
      if (v.note === 'hover') {
        // Simulate the translateY(-2px) with a shadow
        card.effects = [{
          type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
          color: { ...rgb(C.n200), a: 0.6 },
          offset: { x: 0, y: 2 }, radius: 6, spread: 0,
        }];
      }
      makeText('UX Design', { font: FONT_LIGHT, size: 14, color: v.text, parent: card });

      makeText(v.name, { font: FONT_REGULAR, size: 9, color: C.n400, parent: col });
    }
  }

  // ─── Button ─────────────────────────────────
  {
    const section = makeFrame('Button', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Button (Gradient / Submit)', section);

    const note = makeText('Hard offset drop-shadow — no blur. Shadow direction: bottom-left offset.', {
      font: FONT_REGULAR, size: 11, color: C.n500, parent: section,
    });
    note.textAutoResize = 'WIDTH_AND_HEIGHT';

    const row = makeFrame('variants', { layout: 'HORIZONTAL', gap: 24, counterAlign: 'CENTER', parent: section });

    const btnVariants = [
      { name: 'Light / Default', bg: C.white, text: C.black, border: C.black, shadow: C.black, ox: -1, oy: 1 },
      { name: 'Light / Hover',   bg: C.white, text: C.black, border: C.black, shadow: C.black, ox: -3, oy: 3 },
      { name: 'Dark / Default',  bg: C.black, text: C.white, border: C.white, shadow: C.white, ox: -1, oy: 1 },
      { name: 'Dark / Hover',    bg: C.black, text: C.white, border: C.white, shadow: C.white, ox: -3, oy: 3 },
    ];

    for (const v of btnVariants) {
      const col = makeFrame(v.name, { layout: 'VERTICAL', gap: 8, parent: row });

      const btn = makeFrame('button', {
        layout: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
        color: v.bg, stroke: v.border, strokeAlign: 'OUTSIDE',
        pt: 10, pb: 8, pl: 24, pr: 24,
        parent: col,
      });
      btn.effects = [{
        type: 'DROP_SHADOW', visible: true, blendMode: 'NORMAL',
        color: { ...rgb(v.shadow), a: 1 },
        offset: { x: v.ox, y: v.oy }, radius: 0, spread: 1,
      }];
      makeText('Get in touch', { font: FONT_LIGHT, size: 14, color: v.text, parent: btn });

      makeText(v.name, { font: FONT_REGULAR, size: 9, color: C.n400, parent: col });
    }
  }

  // ─── Toggle Switch ───────────────────────────
  {
    const section = makeFrame('Toggle Switch', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Theme Toggle Switch', section);

    const row = makeFrame('variants', { layout: 'HORIZONTAL', gap: 40, counterAlign: 'CENTER', parent: section });

    const toggleVariants = [
      { name: 'Light Mode', trackBg: C.white, trackBorder: C.n700, ballBg: C.black, ballX: 3  },
      { name: 'Dark Mode',  trackBg: C.black, trackBorder: C.white, ballBg: C.white, ballX: 26 },
    ];

    for (const v of toggleVariants) {
      const col = makeFrame(v.name, { layout: 'VERTICAL', gap: 8, counterAlign: 'CENTER', parent: row });

      // Track (no auto-layout — ball positioned absolutely)
      const track = makeFrame('track', {
        color: v.trackBg, stroke: v.trackBorder, strokeAlign: 'INSIDE',
        radius: RADII.full, // 19px
        parent: col,
      });
      track.layoutMode = 'NONE';
      track.resize(43, 20);

      // Ball — manually positioned inside track
      const ball = makeFrame('ball', { color: v.ballBg });
      ball.cornerRadius = 6;
      ball.resize(12, 12);
      ball.x = v.ballX;
      ball.y = 3;
      track.appendChild(ball);

      makeText(v.name, { font: FONT_REGULAR, size: 10, color: C.n400, parent: col });
    }
  }

  // ─── Side Nav Item ───────────────────────────
  {
    const section = makeFrame('Side Nav', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Side Nav Item', section);

    const row = makeFrame('variants', { layout: 'HORIZONTAL', gap: 16, counterAlign: 'CENTER', parent: section });

    const navStates = [
      { name: 'Default',  textColor: C.n350, arrowColor: C.n350 },
      { name: 'Active',   textColor: C.white, arrowColor: C.white },
      { name: 'Hover',    textColor: C.white, arrowColor: C.n350 },
    ];

    for (const state of navStates) {
      const col = makeFrame(state.name, { layout: 'VERTICAL', gap: 6, parent: row });

      const item = makeFrame('nav-item', {
        layout: 'HORIZONTAL', gap: 8, counterAlign: 'CENTER',
        pt: 6, pb: 6, pl: 8, pr: 8,
        color: C.n900,
        parent: col,
      });

      makeText(' Projects ', { font: FONT_LIGHT, size: 14, color: state.textColor, parent: item });

      // Arrow icon placeholder (12×12 square)
      const arrowIcon = makeFrame('arrow', { color: state.arrowColor, parent: item });
      arrowIcon.resize(12, 12);
      arrowIcon.cornerRadius = 1;

      makeText(state.name, { font: FONT_REGULAR, size: 9, color: C.n400, parent: col });
    }

    // Full side nav rail mockup
    const rail = makeFrame('Full Rail', {
      layout: 'VERTICAL', gap: 0,
      color: C.n900, stroke: C.n600, strokeAlign: 'OUTSIDE',
      pt: 24, pb: 24, pl: 0, pr: 0,
      parent: section,
    });
    rail.resize(180, 1);
    rail.counterAxisSizingMode = 'AUTO';

    // Logo area
    const logoArea = makeFrame('logo', {
      layout: 'HORIZONTAL', counterAlign: 'CENTER',
      pt: 0, pb: 16, pl: 16, pr: 16,
      parent: rail,
    });
    logoArea.primaryAxisSizingMode = 'FIXED';
    logoArea.resize(180, 1);
    logoArea.counterAxisSizingMode = 'AUTO';
    const logoPlaceholder = makeFrame('logo-placeholder', { color: C.red, parent: logoArea });
    logoPlaceholder.resize(40, 40);
    logoPlaceholder.cornerRadius = RADII.logo;

    // Nav items list
    const navList = makeFrame('nav-list', {
      layout: 'VERTICAL', gap: 0, parent: rail,
    });
    navList.primaryAxisSizingMode = 'FIXED';
    navList.resize(180, 1);
    navList.counterAxisSizingMode = 'AUTO';

    const navItems = ['Projects', 'About me', 'Contact'];
    for (const label of navItems) {
      const itemFrame = makeFrame(label, {
        layout: 'HORIZONTAL', gap: 8, counterAlign: 'CENTER',
        pt: 10, pb: 10, pl: 16, pr: 16,
        parent: navList,
      });
      itemFrame.primaryAxisSizingMode = 'FIXED';
      itemFrame.resize(180, 1);
      itemFrame.counterAxisSizingMode = 'AUTO';
      itemFrame.stroke = C.n600;
      itemFrame.strokeWeight = 1;
      itemFrame.strokes = solidStroke(C.n600);
      // Only bottom border — use outline instead
      makeText(` ${label} `, { font: FONT_LIGHT, size: 14, color: C.n350, parent: itemFrame });
      const arrow = makeFrame('arrow', { color: C.n350, parent: itemFrame });
      arrow.resize(10, 10);
      arrow.cornerRadius = 1;
    }
  }

  // ─── Section Header Pattern ──────────────────
  {
    const section = makeFrame('Section Header', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Section Header Pattern', section);

    const demo = makeFrame('demo', {
      layout: 'VERTICAL', gap: 8, pt: 24, pb: 24, pl: 0, pr: 0,
      parent: section,
    });

    makeText('MY SWEET SPOT', {
      font: FONT_REGULAR, size: 14, color: C.n400, upper: true, parent: demo,
    });

    const heading = makeText('Where creativity meets technology.', {
      font: FONT_BOLD, size: 28, color: C.black, parent: demo,
    });

    // Red dot on the last character
    const lastIdx = heading.characters.length - 1;
    heading.setRangeFills(lastIdx, lastIdx + 1, solidFill(C.red));

    makeText('Note: The "." at the end of section headings is always #FF1515 (brand red).', {
      font: FONT_REGULAR, size: 10, color: C.n400, parent: section,
    });
  }

  // ─── Testimonial Card ────────────────────────
  {
    const section = makeFrame('Testimonial Card', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Testimonial / Quote Card', section);

    const cardVariants = [
      { name: 'Light', bg: C.white, text: C.black, border: C.n200, nameColor: C.black, metaColor: C.n500 },
      { name: 'Dark',  bg: C.n900,  text: C.white, border: C.n600, nameColor: C.white, metaColor: C.n350 },
    ];

    const cardRow = makeFrame('cards', { layout: 'HORIZONTAL', gap: 32, parent: section });

    for (const v of cardVariants) {
      const card = makeFrame(v.name, {
        layout: 'VERTICAL', gap: 20,
        color: v.bg, stroke: v.border, strokeAlign: 'INSIDE',
        radius: RADII.lg, pt: 28, pb: 28, pl: 28, pr: 28,
        primarySize: 'FIXED', counterSize: 'AUTO',
        parent: cardRow,
      });
      card.resize(360, 1);

      // Quote icon placeholder
      const quoteIcon = makeFrame('quote-icon', { color: C.red, parent: card });
      quoteIcon.resize(28, 22);
      quoteIcon.cornerRadius = 2;

      // Quote text
      const quoteText = makeText(
        'Working with Daryn over the last six years has been a joy. His expert insights help shape smarter, more effective solutions.',
        { font: FONT_LIGHT, size: 15, color: v.text, lineH: 150, parent: card }
      );
      quoteText.textAutoResize = 'HEIGHT';
      quoteText.resize(304, quoteText.height);

      // Quotee row
      const quoteeRow = makeFrame('quotee', {
        layout: 'HORIZONTAL', gap: 16, counterAlign: 'CENTER', parent: card,
      });

      // Avatar circle
      const avatar = makeFrame('avatar', { color: C.n300, parent: quoteeRow });
      avatar.resize(44, 44);
      avatar.cornerRadius = 22;

      // Name + title
      const details = makeFrame('details', { layout: 'VERTICAL', gap: 4, parent: quoteeRow });
      makeText('David Hamilton', { font: FONT_BOLD, size: 14, color: v.nameColor, parent: details });
      makeText('Marketing Director, CoStar', { font: FONT_LIGHT, size: 12, color: v.metaColor, parent: details });
    }
  }

  // ─── Form Inputs ─────────────────────────────
  {
    const section = makeFrame('Form Inputs', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Form Inputs', section);

    const inputRow = makeFrame('inputs', {
      layout: 'HORIZONTAL', gap: 24, counterAlign: 'MIN', parent: section,
    });

    const inputVariants = [
      { name: 'Text Input — Light',    bg: C.white, border: C.inputBorder, placeholder: C.n400, text: C.black,  h: 36 },
      { name: 'Textarea — Light',      bg: C.white, border: C.inputBorder, placeholder: C.n400, text: C.black,  h: 100 },
      { name: 'Text Input — Dark',     bg: C.n900,  border: C.n600,        placeholder: C.n500, text: C.white,  h: 36 },
      { name: 'Textarea — Dark',       bg: C.n900,  border: C.n600,        placeholder: C.n500, text: C.white,  h: 100 },
    ];

    for (const v of inputVariants) {
      const col = makeFrame(v.name, { layout: 'VERTICAL', gap: 6, parent: inputRow });

      const input = makeFrame('input', {
        layout: 'HORIZONTAL', counterAlign: 'MIN',
        color: v.bg, stroke: v.border, strokeAlign: 'INSIDE',
        radius: RADII.md, pt: 8, pb: 8, pl: 8, pr: 8,
        primarySize: 'FIXED', counterSize: 'FIXED',
        parent: col,
      });
      input.resize(240, v.h);

      makeText('Your name', { font: FONT_LIGHT, size: 15, color: v.placeholder, parent: input });

      makeText(v.name, { font: FONT_REGULAR, size: 9, color: C.n400, parent: col });
    }
  }

  // ─── Logo Mark ───────────────────────────────
  {
    const section = makeFrame('Logo Mark', { layout: 'VERTICAL', gap: 16, parent: outer });
    sectionLabel('Logo / Mark', section);

    const variants = [
      { name: 'Light BG', pageBg: C.n50,   squareBg: C.black },
      { name: 'Dark BG',  pageBg: C.black, squareBg: C.white },
    ];
    const logoRow = makeFrame('logos', { layout: 'HORIZONTAL', gap: 32, parent: section });

    for (const v of variants) {
      const col = makeFrame(v.name, { layout: 'VERTICAL', gap: 8, counterAlign: 'CENTER', parent: logoRow });

      const bg = makeFrame('bg', {
        layout: 'NONE', color: v.pageBg, radius: RADII.md,
        pt: 24, pb: 24, pl: 24, pr: 24,
        parent: col,
      });
      bg.resize(160, 120);

      // 5×4 grid of logo squares — simplified approximation
      // The logo is a specific pattern; we place 18 squares
      const gridPositions = [
        [0,3],[2,3],[2,1],[3,3],[3,1],[5,3],[5,1], // col positions
        [0,4],[2,4],[2,2],[4,2],[1,4],[1,2],[3,4],[3,2],[5,4],[5,2],
      ];
      const SQ = 18;
      const GAP_SQ = 2;
      const STEP = SQ + GAP_SQ;
      for (let i = 0; i < gridPositions.length; i++) {
        const [col_i, row_i] = gridPositions[i];
        const sq = makeFrame(`sq-${i}`, { color: i === 16 ? C.red : v.squareBg });
        sq.resize(SQ, SQ);
        sq.cornerRadius = RADII.logo;
        sq.x = 24 + col_i * STEP;
        sq.y = 12 + (row_i - 1) * STEP;
        bg.appendChild(sq);
      }

      makeText(v.name, { font: FONT_REGULAR, size: 10, color: C.n400, parent: col });
    }

    makeText('Red square = brand accent position (top-right of the "D" letterform)', {
      font: FONT_REGULAR, size: 10, color: C.n500, parent: section,
    });
  }

  figma.currentPage.appendChild(outer);
  return outer;
}

// ── 7. ENTRY POINT ───────────────────────────

figma.showUI(__html__, { width: 280, height: 220 });

figma.ui.onmessage = async (msg) => {
  if (msg !== 'run') return;

  figma.ui.postMessage({ status: 'Loading fonts…' });

  // Attempt to load Biryani; fall back to Inter if not installed
  try {
    await Promise.all([
      figma.loadFontAsync({ family: 'Biryani', style: 'Bold' }),
      figma.loadFontAsync({ family: 'Biryani', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Biryani', style: 'Light' }),
    ]);
  } catch (e) {
    // Biryani not available — use Inter
    FONT_BOLD    = { family: 'Inter', style: 'Bold' };
    FONT_REGULAR = { family: 'Inter', style: 'Regular' };
    FONT_LIGHT   = { family: 'Inter', style: 'Regular' };
    await Promise.all([
      figma.loadFontAsync(FONT_BOLD),
      figma.loadFontAsync(FONT_REGULAR),
    ]);
    figma.ui.postMessage({ status: 'Biryani not found — using Inter as fallback.' });
  }

  figma.ui.postMessage({ status: 'Creating Design System page…' });

  // Create or reuse page
  let page = figma.root.children.find(p => p.name === '🎨 Design System');
  if (!page) {
    page = figma.createPage();
    page.name = '🎨 Design System';
  } else {
    // Clear existing content
    for (const child of [...page.children]) child.remove();
  }
  figma.currentPage = page;

  const GAP = 120;
  let xOffset = 0;

  figma.ui.postMessage({ status: 'Building color swatches…' });
  const colorsFrame = buildColorsPage(xOffset);
  xOffset += colorsFrame.width + GAP;

  figma.ui.postMessage({ status: 'Building typography…' });
  const typeFrame = buildTypePage(xOffset);
  xOffset += typeFrame.width + GAP;

  figma.ui.postMessage({ status: 'Building spacing & radius…' });
  const spacingFrame = buildSpacingPage(xOffset);
  xOffset += spacingFrame.width + GAP;

  figma.ui.postMessage({ status: 'Building components…' });
  buildComponentsPage(xOffset);

  figma.viewport.scrollAndZoomIntoView(page.children);

  figma.ui.postMessage({ status: '✓ Design system built.', done: true });
};
