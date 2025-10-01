// Canvas particle field with subtle parallax
const c = document.getElementById('bg');
const ctx = c.getContext('2d', { alpha: true });
let W, H, P = [];
const COUNT = 120, SPEED = .25;

function resize() {
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight;
  P = Array.from({ length: COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.6 + 0.4,
    vx: (Math.random() - .5) * SPEED,
    vy: (Math.random() - .5) * SPEED,
    h: Math.random() * 360
  }));
}
window.addEventListener('resize', resize);
resize();

function step(t) {
  ctx.clearRect(0, 0, W, H);
  for (const p of P) {
    p.x += p.vx; p.y += p.vy; p.h = (p.h + .2) % 360;
    if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
    if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.h}, 90%, 60%, .6)`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

// Example: build cards from minimal data (thumbnails should be small GIF/APNG)
const shows = [
  { t: "Attack on Titan", img: "assets/covers/aot.gif", pct: 98 },
  { t: "Vinland Saga", img: "assets/covers/vinland.gif", pct: 96 },
  { t: "FMA: Brotherhood", img: "assets/covers/fmab.gif", pct: 97 },
];
const grid = document.getElementById('grid');
for (const s of shows) {
  const d = document.createElement('div');
  d.className = 'card';
  d.innerHTML = `
    <img class="thumb" src="${s.img}" alt="${s.t}" loading="lazy" />
    <div class="title">${s.t}</div>
    <div class="meta">Masterpiece Core</div>
    <div class="rating" style="--pct:${s.pct}%"></div>
  `;
  grid.appendChild(d);
}
