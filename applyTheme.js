const fs = require('fs');

// 1. Update index.css
let indexCss = fs.readFileSync('src/index.css', 'utf8');
indexCss = indexCss.replace(/background-color: #0f0e0d;/g, 'background-color: #171717;');
indexCss = indexCss.replace(/color: #C4BFB8;/g, 'color: #D6D3D1;'); // stone-300
indexCss = indexCss.replace(/-webkit-text-stroke: 2px #F59E0B;/g, '-webkit-text-stroke: 2px #10B981;');
fs.writeFileSync('src/index.css', indexCss);

// 2. Update App.jsx
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

// Remove background image
appJsx = appJsx.replace(
  /backgroundImage: 'url\\(\\/bg\\.jpeg\\)',\n\s*backgroundSize: 'cover',\n\s*backgroundPosition: 'center',\n\s*backgroundRepeat: 'no-repeat',/g,
  "backgroundColor: '#171717',"
);

// Swap Accents
appJsx = appJsx.replace(/#F59E0B/g, '#10B981'); // Amber to Emerald
appJsx = appJsx.replace(/245,158,11/g, '16,185,129'); // Amber RGB to Emerald RGB

// Swap Indigo / Sky to Teal / Emerald
appJsx = appJsx.replace(/indigo-500/g, 'teal-600');
appJsx = appJsx.replace(/indigo-400/g, 'teal-500');
appJsx = appJsx.replace(/sky-500/g, 'emerald-600');

// Slate to Stone
appJsx = appJsx.replace(/slate-800/g, 'stone-800');
appJsx = appJsx.replace(/slate-700/g, 'stone-700');
appJsx = appJsx.replace(/slate-600/g, 'stone-600');

// Update specific text colors to bone/sand
appJsx = appJsx.replace(/#E2E8F0/g, '#F3F4F6'); // slate-200 to gray-100 (bone)
appJsx = appJsx.replace(/#EDEAE4/g, '#F3F4F6'); // old cream to bone

fs.writeFileSync('src/App.jsx', appJsx);

// 3. Update HexagonParticles.jsx
let hex = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
const hexColors = `    const colors = [
      { r: 16, g: 185, b: 129, a: 0.35 },  // Emerald   #10B981
      { r: 15, g: 118, b: 110, a: 0.35 },  // Teal      #0F766E
      { r: 243, g: 244, b: 246, a: 0.15 }, // Bone      #F3F4F6
      { r: 168, g: 162, b: 158, a: 0.20 }, // Stone     #A8A29E
    ];`;
hex = hex.replace(/const colors = \[\s*\{ r: 245, g: 158, b: 11,[^\]]+\];/m, hexColors);
fs.writeFileSync('src/components/HexagonParticles.jsx', hex);

console.log('OpenAI Neutral theme applied!');
