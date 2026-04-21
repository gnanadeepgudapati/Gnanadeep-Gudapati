/**
 * Theme: Charcoal (#4B4C51) + White
 * Background: #141413 (unchanged — hex grid stays)
 * Primary text: #FFFFFF / rgba(255,255,255,0.85)
 * Accent surfaces: #4B4C51
 * Hover: #636469
 */

const fs = require('fs');
const sa = (s, a, b) => s.split(a).join(b);

// ────────────────────────────────────────────
// 1. index.css
// ────────────────────────────────────────────
let css = fs.readFileSync('src/index.css', 'utf8');

// Scrollbar & selection — swap indigo → charcoal
css = sa(css, 'rgba(99, 102, 241, 0.3)', 'rgba(75,76,81,0.50)');
css = sa(css, 'rgba(99, 102, 241, 0.5)', 'rgba(75,76,81,0.80)');
css = sa(css, 'rgba(99, 102, 241, 0.2)', 'rgba(75,76,81,0.30)');

// Body base colour — align with hex bg
css = sa(css, 'background-color: #1A1A1A;', 'background-color: #141413;');
css = sa(css, 'color: #D6D3D1;', 'color: #FFFFFF;');

// Hero outlined name stroke → clean white
css = sa(css, '-webkit-text-stroke: 2px #10B981;', '-webkit-text-stroke: 2px rgba(255,255,255,0.55);');

// Badge overrides — remove old indigo overrides
css = sa(css,
    '/* Ensure light-coloured/indigo badge labels stay readable */\n.text-indigo-700 {\n  color: #4338ca !important;\n}\n.bg-indigo-50\\/80 {\n  background-color: rgba(238,242,255,0.85) !important;\n}',
    '/* Charcoal + white theme overrides */'
);

fs.writeFileSync('src/index.css', css);
console.log('✓ index.css done');

// ────────────────────────────────────────────
// 2. App.jsx — systematic colour swap
// ────────────────────────────────────────────
let app = fs.readFileSync('src/App.jsx', 'utf8');

// ── OLD accent colours → NEW ──────────────────

// Hex accent colours
app = sa(app, '#10B981', '#4B4C51');
app = sa(app, '#0F766E', '#4B4C51');
app = sa(app, '#16,185,129', '75,76,81');
app = sa(app, '16,185,129', '75,76,81');

// Old emerald/teal Tailwind classes
app = sa(app, 'teal-600', '[#4B4C51]');
app = sa(app, 'teal-500', '[#636469]');
app = sa(app, 'teal-400', '[#7a7b80]');
app = sa(app, 'emerald-600', '[#4B4C51]');
app = sa(app, 'emerald-500', '[#636469]');
app = sa(app, 'emerald-400', '[#7a7b80]');
app = sa(app, 'emerald-300', 'white');

// Old text colours
app = sa(app, 'text-[#F3F4F6]', 'text-white');
app = sa(app, '#F3F4F6', '#FFFFFF');
app = sa(app, '#EDEAE4', '#FFFFFF');
app = sa(app, '#C4BFB8', 'rgba(255,255,255,0.60)');
app = sa(app, '#8A8580', 'rgba(255,255,255,0.45)');
app = sa(app, '#6B6560', 'rgba(255,255,255,0.40)');
app = sa(app, '#A8A099', 'rgba(255,255,255,0.50)');

// stone-* → neutral matches
app = sa(app, 'stone-800', '[#4B4C51]');
app = sa(app, 'stone-700', '[#3e3f44]');
app = sa(app, 'stone-600', '[#333437]');
app = sa(app, 'stone-400', 'white/50');
app = sa(app, 'stone-300', 'white/70');
app = sa(app, 'stone-200', 'white/85');
app = sa(app, 'stone-100', 'white/90');

// indigo/violet leftover classes
app = sa(app, 'indigo-500', '[#4B4C51]');
app = sa(app, 'indigo-400', '[#636469]');
app = sa(app, 'sky-500', '[#4B4C51]');
app = sa(app, 'sky-400', '[#636469]');
app = sa(app, 'violet-500', '[#4B4C51]');
app = sa(app, 'purple-500', '[#4B4C51]');
app = sa(app, 'purple-200', 'white/70');

// selection highlight
app = sa(app, 'selection:bg-teal-500/30', 'selection:bg-white/20');
app = sa(app, 'selection:text-purple-200', 'selection:text-white');

// ── Border colours ────────────────────────────

// Semi-transparent borders already using rgba → adjust
app = sa(app, 'rgba(212,168,83,', 'rgba(75,76,81,');
app = sa(app, 'rgba(16,185,129,', 'rgba(75,76,81,');
app = sa(app, 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.12)');
app = sa(app, 'rgba(255,255,255,0.04)', 'rgba(75,76,81,0.25)');
app = sa(app, 'rgba(255,255,255,0.06)', 'rgba(75,76,81,0.30)');

fs.writeFileSync('src/App.jsx', app);
console.log('✓ App.jsx done');

console.log('\n🎨 Charcoal + White theme applied!');
