const fs = require('fs');

// 1. Update App.jsx
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Hex code swaps from Arctic Slate -> Void x Lavender
content = content.replace(/#0EA5E9/ig, '#A78BFA'); // Sky -> Lavender
content = content.replace(/#14B8A6/ig, '#C4B5FD'); // Teal -> Pale Violet
content = content.replace(/#0284C7/ig, '#7C3AED'); // Dark Sky -> Deep Purple
content = content.replace(/#38BDF8/ig, '#C4B5FD'); 
content = content.replace(/#99F6E4/ig, '#C4B5FD'); 
content = content.replace(/#CBD5E1/ig, '#7C3AED'); 

// Tailwind color class swaps
content = content.replace(/sky-/g, 'purple-');
content = content.replace(/teal-/g, 'violet-');
content = content.replace(/emerald-/g, 'indigo-');

// Text color dark mode swaps
content = content.replace(/text-slate-900/g, 'text-[#e2e8f0]');
content = content.replace(/text-slate-800/g, 'text-[#cbd5e1]');
content = content.replace(/text-slate-700/g, 'text-[#94a3b8]');
content = content.replace(/text-slate-600/g, 'text-[#94a3b8]');
content = content.replace(/text-slate-500/g, 'text-[#64748b]');
content = content.replace(/text-gray-900/g, 'text-[#e2e8f0]');
content = content.replace(/text-gray-700/g, 'text-[#cbd5e1]');
content = content.replace(/text-gray-600/g, 'text-[#94a3b8]');
content = content.replace(/text-gray-500/g, 'text-[#94a3b8]');

// Background and border dark mode swaps
content = content.replace(/bg-white\/60/g, 'bg-[#0d0e1f]/40');
content = content.replace(/bg-white\/70/g, 'bg-[#0d0e1f]/50');
content = content.replace(/bg-white\/80/g, 'bg-[#0d0e1f]/60');
content = content.replace(/bg-white\b/g, 'bg-[#0d0e1f]/80'); // \b matches word boundary
content = content.replace(/border-\[rgba\(0,0,0,0\.08\)\]/g, 'border-[rgba(139,92,246,0.1)]');
content = content.replace(/bg-slate-100\/60/g, 'bg-[#0d0e1f]/50');
content = content.replace(/bg-white\/40/g, 'bg-[#0d0e1f]/40');
content = content.replace(/border-white\/50/g, 'border-[rgba(139,92,246,0.1)]');

// Base background gradient replacement
content = content.replace(
  /'linear-gradient\(135deg, #f0f4f8 0%, #e2e8f0 100%\)'/g,
  /'radial-gradient(ellipse at top right, #1a1625 0%, #06070f 50%, #000000 100%)'/
);

// Selection colors
content = content.replace(/selection:bg-sky-200 selection:text-sky-900/g, 'selection:bg-purple-500/30 selection:text-[#e2e8f0]');
content = content.replace(/selection:bg-purple-200 selection:text-purple-900/g, 'selection:bg-purple-500/30 selection:text-[#e2e8f0]');

fs.writeFileSync('src/App.jsx', content);

// 2. Update HexagonParticles.jsx
let hexContent = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
hexContent = hexContent.replace(/const colors = \[\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},?\s+\];/s, 
`const colors = [
      { r: 167, g: 139, b: 250 }, // Lavender #A78BFA
      { r: 196, g: 181, b: 253 }, // Pale Violet #C4B5FD
      { r: 124, g: 58, b: 237 },  // Deep Purple #7C3AED
      { r: 6, g: 7, b: 15 },      // Void #06070F
    ];`);
fs.writeFileSync('src/components/HexagonParticles.jsx', hexContent);

// 3. Optional CSS body background reset
let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace('background-color: #f0f4f8;\n  color: #0f172a;', 'background-color: #06070f;\n  color: #e2e8f0;');
cssContent = cssContent.replace('background-color: #110C1A;\n  color: #fff;', 'background-color: #06070f;\n  color: #e2e8f0;'); // Catch-all
fs.writeFileSync('src/index.css', cssContent);

console.log('Void x Lavender theme applied successfully!');
