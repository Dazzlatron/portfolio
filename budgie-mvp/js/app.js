/* ============================================================
   Budgie — App Logic
   ============================================================ */

'use strict';

// ── Navigation ────────────────────────────────────────────
let current = 's1';
const history_stack = ['s1'];

// Theme colors per screen (for Android status bar tinting)
const SCREEN_THEME = {
  s1:  '#000000',
  s2:  '#f7f7f7',
  s3:  '#f7f7f7',
  s4:  '#f7f7f7',
  s5:  '#f7f7f7',
  s6:  '#f7f7f7',
  s7a: '#f7f7f7',
  s7b: '#f7f7f7',
  s8:  '#000000',
};

function nav(targetId) {
  if (targetId === current) return;

  const fromEl  = document.getElementById(current);
  const targetEl = document.getElementById(targetId);

  fromEl.classList.remove('active');
  targetEl.classList.add('active', 'slide-in');
  targetEl.addEventListener('animationend', () => targetEl.classList.remove('slide-in'), { once: true });

  // Scroll new screen to top
  targetEl.querySelectorAll('.scroll-body').forEach(el => { el.scrollTop = 0; });

  // Update meta theme-color (Android status bar tint)
  const themeEl = document.getElementById('themeColor');
  if (themeEl) themeEl.setAttribute('content', SCREEN_THEME[targetId] || '#f7f7f7');

  // Push to history stack for back-button support
  history_stack.push(targetId);
  current = targetId;

  // Capacitor status bar update (no-op in browser)
  if (window.Capacitor?.Plugins?.StatusBar) {
    const style = (SCREEN_THEME[targetId] === '#000000') ? 'Dark' : 'Light';
    window.Capacitor.Plugins.StatusBar.setStyle({ style });
    window.Capacitor.Plugins.StatusBar.setBackgroundColor({ color: SCREEN_THEME[targetId] });
  }

  if (targetId === 's8') setTimeout(launchConfetti, 350);
}

// Back navigation — used by Android hardware back button
function goBack() {
  if (history_stack.length <= 1) {
    // Let Capacitor exit or minimise the app
    if (window.Capacitor?.Plugins?.App) {
      window.Capacitor.Plugins.App.exitApp();
    }
    return;
  }
  history_stack.pop();
  const prev = history_stack[history_stack.length - 1];

  const fromEl  = document.getElementById(current);
  const targetEl = document.getElementById(prev);

  fromEl.classList.remove('active');
  targetEl.classList.add('active', 'slide-back');
  targetEl.addEventListener('animationend', () => targetEl.classList.remove('slide-back'), { once: true });

  const themeEl = document.getElementById('themeColor');
  if (themeEl) themeEl.setAttribute('content', SCREEN_THEME[prev] || '#f7f7f7');

  current = prev;
}

// ── Capacitor initialisation ───────────────────────────────
document.addEventListener('deviceready', () => {
  // Android hardware back button
  if (window.Capacitor?.Plugins?.App) {
    window.Capacitor.Plugins.App.addListener('backButton', () => goBack());
  }
  // Hide splash screen once app is ready
  if (window.Capacitor?.Plugins?.SplashScreen) {
    window.Capacitor.Plugins.SplashScreen.hide();
  }
});

// ── Screen 2 — Budget slider ───────────────────────────────
function updateBudget(v) {
  document.getElementById('budgetDisplay').textContent = '£' + v;
  const slider = document.getElementById('budgetSlider');
  const min = +slider.min;
  const max = +slider.max;
  const pct = ((v - min) / (max - min)) * 100;
  slider.style.background = [
    'linear-gradient(to right,',
    `var(--black) 0%, var(--black) ${pct}%,`,
    `var(--n100) ${pct}%, var(--n100) 100%)`
  ].join(' ');
}

// ── Screen 2 — Segmented control ──────────────────────────
function selSeg(btn) {
  btn.closest('.seg').querySelectorAll('.seg-opt').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}

// ── Screen 2 — Store chips ─────────────────────────────────
function toggleChip(chip) {
  chip.classList.toggle('on');
}

// ── Screen 5 — Bottom sheet ────────────────────────────────
function openSheet(id) {
  const el = document.getElementById(id);
  el.style.display = 'flex';
  // Prevent body scroll while sheet is open
  el.closest('.screen').querySelector('.scroll-body')?.style.setProperty('overflow', 'hidden');
}

function closeSheet(id) {
  const el = document.getElementById(id);
  el.style.display = 'none';
  el.closest('.screen').querySelector('.scroll-body')?.style.removeProperty('overflow');
}

function toggleIngr(checkEl) {
  checkEl.classList.toggle('on');
  const isOn = checkEl.classList.contains('on');
  checkEl.textContent = isOn ? '✓' : '';
  const nameEl = checkEl.nextElementSibling;
  if (nameEl) {
    nameEl.style.color = isOn ? 'var(--black)' : 'var(--n300)';
    nameEl.style.textDecoration = isOn ? 'none' : 'line-through';
  }
}

// ── Screen 6 — Delivery toggle ─────────────────────────────
function toggleDelivery() {
  document.getElementById('delivTog').classList.toggle('off');
}

// ── Screen 7a — Store mode checkboxes ─────────────────────
const ITEM_PRICES = {
  si1: 0.75, si2: 0.89, si3: 1.20,
  si4: 1.40, si5: 1.99, si6: 4.50,
  si7: 0.99, si8: 1.30,
};
const tickedItems = new Set(['si1', 'si2']);

function tickItem(id) {
  const row  = document.getElementById(id);
  const cb   = row.querySelector('.check-box');
  const name = row.querySelector('.si-name');

  if (tickedItems.has(id)) {
    tickedItems.delete(id);
    row.classList.remove('ticked');
    cb.classList.remove('on');
    cb.textContent = '';
    name.classList.remove('ticked');
  } else {
    tickedItems.add(id);
    row.classList.add('ticked');
    cb.classList.add('on');
    cb.textContent = '✓';
    name.classList.add('ticked');
  }

  const total = [...tickedItems].reduce((sum, k) => sum + (ITEM_PRICES[k] || 0), 0);
  document.getElementById('spentAmt').textContent = '£' + total.toFixed(2);

  // Haptic feedback on supported devices
  if (window.Capacitor?.Plugins?.Haptics) {
    window.Capacitor.Plugins.Haptics.impact({ style: 'light' });
  }
}

// ── Screen 8 — Confetti ────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#d9f852', '#b8d438', '#ffffff', '#000000', '#ffde03', '#a5f3fc'];
  const pieces = Array.from({ length: 150 }, () => ({
    x:     Math.random() * canvas.width,
    y:     -12 - Math.random() * 140,
    w:     Math.random() * 12 + 5,
    h:     Math.random() * 5  + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx:    (Math.random() - .5) * 4,
    vy:    Math.random() * 3 + 2.5,
    vr:    (Math.random() - .5) * .25,
    rot:   Math.random() * Math.PI * 2,
    alpha: 1,
  }));

  let frame = 0;
  const TOTAL = 220;

  (function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    for (const p of pieces) {
      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.vr;
      p.vy  += 0.055; // gravity
      if (frame > TOTAL * .65) {
        p.alpha = Math.max(0, 1 - (frame - TOTAL * .65) / (TOTAL * .35));
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (frame < TOTAL) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}
