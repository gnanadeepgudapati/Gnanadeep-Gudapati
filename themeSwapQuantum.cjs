const fs = require('fs');

// 1. Update App.jsx
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Hex code swaps from Deepmind -> Quantum Prism
content = content.replace(/#2563EB/ig, '#8B5CF6'); // Cobalt -> Violet
content = content.replace(/#1D4ED8/ig, '#FB7185'); // Intense Blue -> Rose
content = content.replace(/#059669/ig, '#38BDF8'); // Teal -> Glacier Blue
content = content.replace(/#60A5FA/ig, '#C084FC'); // Accent correction
content = content.replace(/#3B82F6/ig, '#F472B6'); // Accent correction
content = content.replace(/#0EA5E9/ig, '#34D399'); // Accent correction

// Tailwind color class swaps
content = content.replace(/blue-/g, 'purple-');
content = content.replace(/sky-/g, 'rose-');
content = content.replace(/teal-/g, 'sky-');

// Text color dark mode swaps
content = content.replace(/text-gray-900/g, 'text-white');
content = content.replace(/text-gray-800/g, 'text-gray-100');
content = content.replace(/text-gray-700/g, 'text-gray-200');
content = content.replace(/text-gray-600/g, 'text-gray-300');
content = content.replace(/text-gray-500/g, 'text-gray-400');

// Background / Glassmorphism dark mode swaps
content = content.replace(/bg-white\/40/g, 'bg-[#110C1A]/40');
content = content.replace(/bg-white\/50/g, 'bg-[#110C1A]/50');
content = content.replace(/bg-white\/60/g, 'bg-[#110C1A]/60');
content = content.replace(/bg-white\/80/g, 'bg-[#110C1A]/80');
content = content.replace(/border-white\/50/g, 'border-white/10');
content = content.replace(/border-gray-200\/60/g, 'border-white/10');
content = content.replace(/border-gray-200\/50/g, 'border-white/10');
content = content.replace(/border-gray-200\/40/g, 'border-white/10');
content = content.replace(/bg-gray-100\/60/g, 'bg-white/5');

// Base background gradient replacement
content = content.replace(
  /'linear-gradient\(135deg, #f8fafc 0%, #f1f5f9 100%\)'/g,
  /'radial-gradient(ellipse at top right, #2E1065 0%, #110C1A 50%, #000000 100%)'/
);

// Selection colors
content = content.replace(/selection:bg-purple-200 selection:text-purple-900/g, 'selection:bg-purple-500/30 selection:text-purple-200');

fs.writeFileSync('src/App.jsx', content);

// 2. Update HexagonParticles.jsx directly
let hexContent = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
hexContent = hexContent.replace(/const colors = \[\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},?\s+\];/s, 
`const colors = [
      { r: 139, g: 92, b: 246 }, // Violet #8B5CF6
      { r: 251, g: 113, b: 133 }, // Rose #FB7185
      { r: 56, g: 189, b: 248 }, // Glacier Blue #38BDF8
      { r: 192, g: 132, b: 252 },  // Lighter Purple #C084FC
    ];`);
fs.writeFileSync('src/components/HexagonParticles.jsx', hexContent);

// 3. Optional CSS body background
let cssContent = fs.readFileSync('src/index.css', 'utf8');
if (!cssContent.includes('background-color: #110C1A')) {
  cssContent = cssContent.replace(/body \{/, 'body {\n  background-color: #110C1A;\n  color: #fff;');
  fs.writeFileSync('src/index.css', cssContent);
}

console.log('Quantum Prism theme applied successfully!');
