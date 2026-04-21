import React, { useEffect, useRef } from 'react';

// ── roundRect polyfill ────────────────────────────────────────────────────────
if (typeof CanvasRenderingContext2D !== 'undefined' &&
    !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    this.moveTo(x + rr, y);
    this.lineTo(x + w - rr, y);
    this.arcTo(x + w, y, x + w, y + rr, rr);
    this.lineTo(x + w, y + h - rr);
    this.arcTo(x + w, y + h, x + w - rr, y + h, rr);
    this.lineTo(x + rr, y + h);
    this.arcTo(x, y + h, x, y + h - rr, rr);
    this.lineTo(x, y + rr);
    this.arcTo(x, y, x + rr, y, rr);
    this.closePath();
  };
}

/* ── ICON DRAW FUNCTIONS ─────────────────────────────────────────────────────
   Each fn(ctx, s) draws centred at (0,0) within radius s.
   Use brand-accurate colours.                                               */

function drawReact(ctx, s) {
  ctx.strokeStyle = '#61DAFB';
  ctx.lineWidth = s * 0.10;
  const rx = s * 0.90, ry = s * 0.32;
  for (let i = 0; i < 3; i++) {
    ctx.save(); ctx.rotate((i * Math.PI) / 3);
    ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = '#61DAFB';
  ctx.beginPath(); ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2); ctx.fill();
}

function drawPython(ctx, s) {
  // Two interlocked circles representing the snake
  ctx.fillStyle = '#4B8BBE';
  ctx.beginPath(); ctx.arc(-s*0.18, -s*0.30, s*0.48, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFE873';
  ctx.beginPath(); ctx.arc( s*0.18,  s*0.30, s*0.48, 0, Math.PI * 2); ctx.fill();
  // Overlap mask
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath(); ctx.arc(-s*0.18, -s*0.30, s*0.28, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc( s*0.18,  s*0.30, s*0.28, 0, Math.PI * 2); ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  // Label
  ctx.fillStyle = '#FFE873'; ctx.font = `bold ${s*0.32}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('Python', 0, s * 0.72);
}

function drawOpenAI(ctx, s) {
  // OpenAI rotating mesh / bloom — four-petal abstract shape
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = s * 0.095;
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s*0.55, -s*0.30, s*0.55, s*0.30, 0, 0);
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${s*0.30}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('OpenAI', 0, s * 0.72);
}

function drawClaude(ctx, s) {
  // Anthropic — warm copper A with radiating dots below
  ctx.fillStyle = '#CC785C';
  ctx.font = `bold ${s*1.15}px serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('A', 0, -s*0.08);
  // Three dots
  [-s*0.35, 0, s*0.35].forEach(x => {
    ctx.beginPath(); ctx.arc(x, s*0.58, s*0.09, 0, Math.PI*2); ctx.fill();
  });
  ctx.fillStyle = 'rgba(204,120,92,0.65)'; ctx.font = `${s*0.27}px sans-serif`;
  ctx.fillText('Claude', 0, s*0.82);
}

function drawGemini(ctx, s) {
  // Gemini star — elongated 4-point star
  const grd = ctx.createLinearGradient(-s*0.8, -s*0.8, s*0.8, s*0.8);
  grd.addColorStop(0,   '#4285F4');
  grd.addColorStop(0.33,'#9B72F8');
  grd.addColorStop(0.66,'#F66D44');
  grd.addColorStop(1,   '#FBBC04');
  ctx.fillStyle = grd;
  ctx.beginPath();
  const pts = [[0,-s*0.90],[s*0.22,-s*0.22],[s*0.90,0],[s*0.22,s*0.22],
               [0,s*0.90],[-s*0.22,s*0.22],[-s*0.90,0],[-s*0.22,-s*0.22]];
  pts.forEach(([x,y],i) => i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y));
  ctx.closePath(); ctx.fill();
}

function drawGitHub(ctx, s) {
  // CircleFXS with octocat silhouette
  ctx.fillStyle = '#E6EDF3';
  ctx.beginPath(); ctx.arc(0, 0, s*0.65, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#0D1117';
  ctx.font = `bold ${s*0.60}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('GH', 0, 0);
  // Cat ears
  ctx.fillStyle = '#E6EDF3';
  [[-s*0.38,-s*0.55],[s*0.38,-s*0.55]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x, y, s*0.15, 0, Math.PI*2); ctx.fill();
  });
}

function drawDocker(ctx, s) {
  // Whale + stacked containers
  ctx.fillStyle = '#1D63ED';
  const bw = s*0.60, bh = s*0.20;
  [-s*0.30, 0, s*0.30].forEach(gap => {
    ctx.beginPath(); ctx.roundRect(-bw/2, gap - bh/2, bw, bh, bh*0.3); ctx.fill();
  });
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = `bold ${s*0.28}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('Docker', 0, s*0.72);
}

function drawAWS(ctx, s) {
  ctx.fillStyle = '#FF9900';
  ctx.font = `bold ${s*0.68}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('AWS', 0, -s*0.12);
  // Cloud arc under text
  ctx.strokeStyle = '#FF9900'; ctx.lineWidth = s*0.10;
  ctx.beginPath(); ctx.arc(0, s*0.48, s*0.35, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(-s*0.22, s*0.44, s*0.20, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc( s*0.22, s*0.44, s*0.20, Math.PI, 0); ctx.stroke();
}

function drawHuggingFace(ctx, s) {
  ctx.font = `${s*0.90}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('🤗', 0, -s*0.08);
  ctx.fillStyle = '#FFD21E'; ctx.font = `bold ${s*0.27}px sans-serif`;
  ctx.fillText('HuggingFace', 0, s*0.72);
}

function drawLangChain(ctx, s) {
  // Two interlocked chain ovals
  ctx.strokeStyle = '#00BF63'; ctx.lineWidth = s*0.13;
  ctx.beginPath(); ctx.ellipse(-s*0.28, 0, s*0.38, s*0.22, 0, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse( s*0.28, 0, s*0.38, s*0.22, 0, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle = '#00BF63'; ctx.font = `bold ${s*0.27}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('LangChain', 0, s*0.72);
}

function drawPyTorch(ctx, s) {
  // Flame circle
  ctx.fillStyle = '#EE4C2C';
  ctx.beginPath(); ctx.arc(0, s*0.08, s*0.55, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${s*0.48}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('PT', 0, s*0.08);
  ctx.fillStyle = '#EE4C2C'; ctx.font = `bold ${s*0.28}px sans-serif`;
  ctx.fillText('PyTorch', 0, -s*0.65);
}

function drawTypeScript(ctx, s) {
  ctx.fillStyle = '#3178C6';
  ctx.beginPath(); ctx.roundRect(-s*0.65, -s*0.65, s*1.30, s*1.30, s*0.15); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${s*0.78}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('TS', 0, 0);
}

function drawMCP(ctx, s) {
  // Triangle of connected nodes
  ctx.strokeStyle = '#10B981'; ctx.lineWidth = s*0.09;
  ctx.fillStyle = '#10B981';
  const nd = [[0,-s*0.60],[-s*0.55,s*0.35],[s*0.55,s*0.35]];
  nd.forEach(([x1,y1],i) => nd.forEach(([x2,y2],j) => {
    if (j>i) { ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); }
  }));
  nd.forEach(([x,y]) => { ctx.beginPath(); ctx.arc(x,y,s*0.14,0,Math.PI*2); ctx.fill(); });
  ctx.font = `bold ${s*0.36}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('MCP', 0, 0);
}

function drawRedis(ctx, s) {
  ctx.fillStyle = '#DC382D';
  ctx.beginPath(); ctx.arc(0, 0, s*0.60, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${s*0.55}px monospace`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('R', 0, 0);
  ctx.fillStyle = '#DC382D'; ctx.font = `bold ${s*0.28}px sans-serif`;
  ctx.fillText('Redis', 0, -s*0.72);
}

function drawNodeJS(ctx, s) {
  ctx.fillStyle = '#78BE20';
  // Hexagon fill
  ctx.save(); ctx.rotate(Math.PI/6);
  ctx.beginPath();
  for (let i=0;i<6;i++){const a=(Math.PI/3)*i;
    i===0?ctx.moveTo(Math.cos(a)*s*0.65,Math.sin(a)*s*0.65):ctx.lineTo(Math.cos(a)*s*0.65,Math.sin(a)*s*0.65);}
  ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${s*0.40}px sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('Node', 0, 0);
}

function drawFastAPI(ctx, s) {
  // Teal circle + lightning
  ctx.fillStyle = '#009688';
  ctx.beginPath(); ctx.arc(0, 0, s*0.62, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = `bold ${s*0.36}px sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('FastAPI', 0, 0);
}

function drawTailwind(ctx, s) {
  // Water-wave / wind chevrons
  ctx.strokeStyle = '#38BDF8'; ctx.lineWidth = s*0.13;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [[-s*0.2, s*0.18], [-s*0.2, -s*0.18]].forEach(([yo,yi]) => {
    ctx.beginPath();
    ctx.moveTo(-s*0.70, yo);
    ctx.quadraticCurveTo(-s*0.35, yi, 0, yo);
    ctx.quadraticCurveTo( s*0.35, yi+yo*0.3, s*0.70, yo - yo*0.4);
    ctx.stroke();
  });
  ctx.fillStyle = '#38BDF8'; ctx.font = `bold ${s*0.30}px sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('Tailwind', 0, s*0.72);
}

function drawPinecone(ctx, s) {
  // Pine tree
  ctx.fillStyle = '#04A777';
  [[0,-s*0.70,s*0.38,s*0.55],[0,-s*0.32,s*0.54,s*0.60]].forEach(([cx,cy,hw,bh]) => {
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx-hw,cy+bh); ctx.lineTo(cx+hw,cy+bh);
    ctx.closePath(); ctx.fill();
  });
  ctx.fillStyle = '#3D2B1F'; ctx.beginPath();
  ctx.roundRect(-s*0.10, s*0.44, s*0.20, s*0.35, s*0.05); ctx.fill();
  ctx.fillStyle = '#04A777'; ctx.font = `bold ${s*0.28}px sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('Pinecone', 0, s*0.88);
}

function drawPandas(ctx, s) {
  ctx.font = `${s*0.80}px sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('🐼', 0, -s*0.08);
  ctx.fillStyle = '#150458'; ctx.font = `bold ${s*0.30}px sans-serif`;
  ctx.fillText('Pandas', 0, s*0.72);
}

function drawElastic(ctx, s) {
  ctx.fillStyle = '#FEC514';
  ctx.beginPath(); ctx.ellipse(0,-s*0.25,s*0.55,s*0.25,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#00BFB3';
  ctx.beginPath(); ctx.ellipse(0, s*0.25,s*0.55,s*0.25,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#343741'; ctx.font = `bold ${s*0.30}px sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('Elastic', 0, s*0.72);
}

function makeLabel(text, color) {
  return (ctx, s) => {
    ctx.fillStyle = color;
    ctx.font = `bold ${s*(text.length>5?0.50:0.68)}px monospace`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(text, 0, 0);
  };
}

/* ── TECH ITEMS LIST ─────────────────────────────────────────────────────── */
const TECH_ITEMS = [
  { label: 'React',         draw: drawReact },
  { label: 'Python',        draw: drawPython },
  { label: 'OpenAI',        draw: drawOpenAI },
  { label: 'Claude',        draw: drawClaude },
  { label: 'Gemini',        draw: drawGemini },
  { label: 'GitHub',        draw: drawGitHub },
  { label: 'Docker',        draw: drawDocker },
  { label: 'AWS',           draw: drawAWS },
  { label: 'HuggingFace',   draw: drawHuggingFace },
  { label: 'LangChain',     draw: drawLangChain },
  { label: 'PyTorch',       draw: drawPyTorch },
  { label: 'TypeScript',    draw: drawTypeScript },
  { label: 'MCP',           draw: drawMCP },
  { label: 'Redis',         draw: drawRedis },
  { label: 'Node.js',       draw: drawNodeJS },
  { label: 'FastAPI',       draw: drawFastAPI },
  { label: 'Tailwind',      draw: drawTailwind },
  { label: 'Pinecone',      draw: drawPinecone },
  { label: 'Pandas',        draw: drawPandas },
  { label: 'Elastic',       draw: drawElastic },
  { label: 'RAG',           draw: makeLabel('RAG',    '#10B981') },
  { label: 'LLMs',          draw: makeLabel('LLMs',   '#A78BFA') },
  { label: 'MLflow',        draw: makeLabel('MLflow', '#0194E2') },
  { label: 'spaCy',         draw: makeLabel('spaCy',  '#09A3D5') },
  { label: 'GPT-4',         draw: makeLabel('GPT-4',  '#FFFFFF') },
];

/* ── PHYSICS + RENDER ────────────────────────────────────────────────────── */
const GRAVITY      = 0.030;   // gentle downward pull
const DRAG         = 0.993;   // air resistance per frame
const FLOOR_BOUNCE = 0.38;    // energy fraction kept on floor impact (low = less bounce)
const WALL_BOUNCE  = 0.50;
const MAX_SPD      = 5.0;
const REPEL_R      = 160;
const REPEL_F      = 6.0;
const SPREAD_MARGIN = 0.13;   // fraction of screen width — push away from this edge

function hexPath(ctx, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6; // flat-top (stable resting orientation)
    i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
            : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
  }
  ctx.closePath();
}

const HexagonParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = window.innerWidth, H = window.innerHeight;

    const mouse = { x: -2000, y: -2000 };

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout',  () => { mouse.x = -2000; mouse.y = -2000; });

    // Shuffle so icons vary per session
    const shuffled = [...TECH_ITEMS].sort(() => Math.random() - 0.5);

    class Hexagon {
      constructor(idx) {
        this.item  = shuffled[idx % shuffled.length];
        this.r     = 40 + Math.random() * 10;   // 40–50 px — tight fit around icon
        this.inner = this.r * 0.62;              // icon drawing radius
        this.mass  = this.r;

        // Spawn spread evenly across bottom 30% of screen
        const cols  = Math.ceil(Math.sqrt(shuffled.length * (W / H)));
        const col   = idx % cols;
        this.x = (col + 0.5 + (Math.random()-0.5)*0.5) * (W / cols);
        this.x = Math.max(this.r, Math.min(W - this.r, this.x));
        this.y = H * 0.72 + Math.random() * H * 0.20;

        this.vx     = (Math.random()-0.5)*1.2;
        this.vy     = (Math.random()-0.5)*1.2;
        this.angle  = 0;                         // start flat
        this.vAngle = (Math.random()-0.5)*0.010; // very slow spin
      }

      update() {
        this.vy += GRAVITY;         // gravity each frame
        if (this.vy > MAX_SPD) this.vy = MAX_SPD;

        // Drag — also damps spin
        this.vx *= DRAG;
        this.vy *= DRAG;
        this.vAngle *= 0.990;       // spin bleeds off naturally

        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vAngle;

        const speed = Math.hypot(this.vx, this.vy);

        // ── Wall collision (sides) ──
        if (this.x - this.r < 0) {
          this.x = this.r + 1;
          this.vx =  Math.abs(this.vx) * WALL_BOUNCE;
          this.vx += 0.5; // nudge away from wall
        }
        if (this.x + this.r > W) {
          this.x = W - this.r - 1;
          this.vx = -Math.abs(this.vx) * WALL_BOUNCE;
          this.vx -= 0.5;
        }

        // ── Floor collision ──
        if (this.y + this.r > H) {
          this.y = H - this.r;
          this.vy = -Math.abs(this.vy) * FLOOR_BOUNCE;
          // Dampen horizontal on floor contact so they don't slide forever
          this.vx *= 0.80;
        }

        // ── Ceiling ──
        if (this.y - this.r < 0) {
          this.y = this.r;
          this.vy = Math.abs(this.vy) * 0.40;
        }

        // ── Wall-spreading force (prevent corner piling) ──
        // Only applied when slow — doesn't interfere with mouse interactions
        if (speed < 1.2) {
          const lm = W * SPREAD_MARGIN;
          const rm = W * (1 - SPREAD_MARGIN);
          if (this.x < lm)  this.vx += 0.06 * (1 - this.x / lm);
          if (this.x > rm)  this.vx -= 0.06 * (1 - (W - this.x) / (W * SPREAD_MARGIN));
        }

        // ── Mouse repulsion (shoots upward) ──
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < REPEL_R*REPEL_R && d2 > 0) {
          const d = Math.sqrt(d2);
          const f = ((REPEL_R - d) / REPEL_R) * REPEL_F;
          this.vx += (dx/d) * f;
          this.vy += (dy/d) * f;
          this.vAngle += (Math.random()-0.5)*0.04; // brief spin burst
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // ── Drop shadow ──
        ctx.save();
        ctx.shadowColor   = 'rgba(0,0,0,0.70)';
        ctx.shadowBlur    = 18;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 7;
        hexPath(ctx, this.r);
        ctx.fillStyle = 'rgba(0,0,0,0.01)';
        ctx.fill();
        ctx.restore();

        // ── 3D glass fill: lit top-left, dark bottom-right ──
        const fillGrd = ctx.createLinearGradient(-this.r*0.7, -this.r*0.7, this.r*0.7, this.r*0.7);
        fillGrd.addColorStop(0,    'rgba(255,255,255,0.14)');
        fillGrd.addColorStop(0.45, 'rgba(255,255,255,0.05)');
        fillGrd.addColorStop(1,    'rgba(0,0,0,0.22)');
        hexPath(ctx, this.r);
        ctx.fillStyle = fillGrd;
        ctx.fill();

        // ── Silver/white gradient stroke ──
        const strokeGrd = ctx.createLinearGradient(-this.r, -this.r, this.r, this.r);
        strokeGrd.addColorStop(0,    'rgba(255,255,255,0.92)');
        strokeGrd.addColorStop(0.30, 'rgba(200,215,230,0.65)');
        strokeGrd.addColorStop(0.65, 'rgba(140,165,185,0.38)');
        strokeGrd.addColorStop(1,    'rgba(80,100,120,0.20)');
        hexPath(ctx, this.r);
        ctx.strokeStyle = strokeGrd;
        ctx.lineWidth   = 2.4;
        ctx.stroke();

        // ── Inner top-edge specular highlight ──
        const specGrd = ctx.createLinearGradient(0, -this.r, 0, -this.r*0.3);
        specGrd.addColorStop(0, 'rgba(255,255,255,0.38)');
        specGrd.addColorStop(1, 'rgba(255,255,255,0)');
        hexPath(ctx, this.r - 2.5);
        ctx.strokeStyle = specGrd;
        ctx.lineWidth   = 1.8;
        ctx.stroke();

        // ── Clip and draw icon (counter-rotate so icon stays upright) ──
        hexPath(ctx, this.r - 3);
        ctx.clip();
        ctx.rotate(-this.angle);
        try { this.item.draw(ctx, this.inner); }
        catch (_) {
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.font = `bold ${this.inner * 0.55}px monospace`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(this.item.label, 0, 0);
        }

        ctx.restore();
      }
    }

    // Elastic circle-circle collision
    const collide = (a, b) => {
      const dx = b.x-a.x, dy = b.y-a.y;
      const dist = Math.hypot(dx, dy);
      const minD = a.r + b.r;
      if (dist >= minD || dist < 0.01) return;
      const ov = (minD-dist)/2, nx = dx/dist, ny = dy/dist;
      a.x -= nx*ov; a.y -= ny*ov;
      b.x += nx*ov; b.y += ny*ov;
      const dvx=a.vx-b.vx, dvy=a.vy-b.vy, dot=dvx*nx+dvy*ny;
      if (dot>0) return;
      const r = 0.70; // restitution
      const J = -(1+r)*dot / (1/a.mass + 1/b.mass);
      a.vx += J/a.mass*nx; a.vy += J/a.mass*ny;
      b.vx -= J/b.mass*nx; b.vy -= J/b.mass*ny;
    };

    const COUNT = Math.min(Math.max(Math.floor((W*H)/28000), 18), TECH_ITEMS.length);
    const particles = Array.from({ length: COUNT }, (_, i) => new Hexagon(i));

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => p.update());
      for (let i=0;i<particles.length;i++)
        for (let j=i+1;j<particles.length;j++)
          collide(particles[i], particles[j]);
      particles.forEach(p => p.draw());
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default HexagonParticles;
