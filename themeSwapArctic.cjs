const fs = require('fs');

// 1. Update App.jsx
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Hex code swaps from Quantum Prism -> Arctic Slate
content = content.replace(/#8B5CF6/ig, '#0EA5E9'); // Violet -> Sky Blue
content = content.replace(/#FB7185/ig, '#14B8A6'); // Rose -> Teal
content = content.replace(/#38BDF8/ig, '#0284C7'); // Glacier Blue -> Darker Sky
content = content.replace(/#C084FC/ig, '#38BDF8'); 
content = content.replace(/#F472B6/ig, '#99F6E4'); 
content = content.replace(/#34D399/ig, '#CBD5E1'); 

// Tailwind color class swaps
content = content.replace(/sky-/g, 'emerald-'); // temporary hold for existing sky
content = content.replace(/purple-/g, 'sky-');
content = content.replace(/rose-/g, 'teal-');

// Text color light mode swaps
content = content.replace(/text-white/g, 'text-slate-900');
content = content.replace(/text-gray-100/g, 'text-slate-800');
content = content.replace(/text-gray-200/g, 'text-slate-700');
content = content.replace(/text-gray-300/g, 'text-slate-600');
content = content.replace(/text-gray-400/g, 'text-slate-500');

// Background light mode swaps
content = content.replace(/bg-\[#110C1A\]\/40/g, 'bg-white/60');
content = content.replace(/bg-\[#110C1A\]\/50/g, 'bg-white/70');
content = content.replace(/bg-\[#110C1A\]\/60/g, 'bg-white/80');
content = content.replace(/bg-\[#110C1A\]\/80/g, 'bg-white');
content = content.replace(/border-white\/10/g, 'border-[rgba(0,0,0,0.08)]');
content = content.replace(/bg-white\/5/g, 'bg-slate-100/60');

// Base background gradient replacement
content = content.replace(
  /'radial-gradient\(ellipse at top right, #2E1065 0%, #110C1A 50%, #000000 100%\)'/g,
  /'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)'/
);

// Selection colors
content = content.replace(/selection:bg-purple-500\/30 selection:text-purple-200/g, 'selection:bg-sky-200 selection:text-sky-900');

fs.writeFileSync('src/App.jsx', content);

// 2. Update HexagonParticles.jsx
let hexContent = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
hexContent = hexContent.replace(/const colors = \[\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},?\s+\];/s, 
`const colors = [
      { r: 14, g: 165, b: 233 }, // Sky Blue #0EA5E9
      { r: 20, g: 184, b: 166 }, // Teal #14B8A6
      { r: 2, g: 132, b: 199 }, // Darker Sky #0284C7
      { r: 15, g: 23, b: 42 },   // Slate #0F172A
    ];`);
fs.writeFileSync('src/components/HexagonParticles.jsx', hexContent);

// 3. Optional CSS body background reset
let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace('background-color: #110C1A;\n  color: #fff;', 'background-color: #f0f4f8;\n  color: #0f172a;');
fs.writeFileSync('src/index.css', cssContent);

console.log('Arctic Slate theme applied successfully!');
