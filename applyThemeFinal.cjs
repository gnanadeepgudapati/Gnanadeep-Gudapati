const fs = require('fs');

function replaceAll(str, a, b) {
  return str.split(a).join(b);
}

// 1. Update index.css
let indexCss = fs.readFileSync('src/index.css', 'utf8');
indexCss = replaceAll(indexCss, 'background-color: #0f0e0d;', 'background-color: #1A1A1A;');
indexCss = replaceAll(indexCss, 'color: #C4BFB8;', 'color: #D6D3D1;'); // Ensure Stone-300
indexCss = replaceAll(indexCss, '-webkit-text-stroke: 2px #F59E0B;', '-webkit-text-stroke: 2px #10B981;');
fs.writeFileSync('src/index.css', indexCss);

// 2. Update App.jsx
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

appJsx = replaceAll(appJsx, '#F59E0B', '#10B981'); // Amber to Emerald
appJsx = replaceAll(appJsx, '245,158,11', '16,185,129'); // Amber RGB to Emerald RGB

appJsx = replaceAll(appJsx, 'indigo-500', 'teal-600');
appJsx = replaceAll(appJsx, 'indigo-400', 'teal-500');
appJsx = replaceAll(appJsx, 'sky-500', 'emerald-600');

appJsx = replaceAll(appJsx, 'slate-800', 'stone-800');
appJsx = replaceAll(appJsx, 'slate-700', 'stone-700');
appJsx = replaceAll(appJsx, 'slate-600', 'stone-600');

appJsx = replaceAll(appJsx, '#E2E8F0', '#F3F4F6'); 
appJsx = replaceAll(appJsx, '#EDEAE4', '#F3F4F6'); 

fs.writeFileSync('src/App.jsx', appJsx);

// 3. Update HexagonParticles.jsx
let hex = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
hex = replaceAll(hex, '245, 158, 11', '16, 185, 129');  // Amber rgb to Emerald rgb
hex = replaceAll(hex, '234, 179, 8', '15, 118, 110');   // Yellow to Teal
hex = replaceAll(hex, '99, 102, 241', '243, 244, 246'); // Indigo/Slate to Bone
hex = replaceAll(hex, '129, 140, 248', '168, 162, 158');// Light Indigo to Stone
hex = replaceAll(hex, '244, 63, 94', '16, 185, 129');   // Rose to Emerald
fs.writeFileSync('src/components/HexagonParticles.jsx', hex);

console.log('OpenAI Neutral theme applied!');
