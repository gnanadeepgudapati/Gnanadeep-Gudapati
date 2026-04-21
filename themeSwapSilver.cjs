const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Hex code swaps from Void x Lavender -> Silver Slate
content = content.replace(/#A78BFA/ig, '#C8CDD4'); 
content = content.replace(/#C4B5FD/ig, '#C8CDD4'); 
content = content.replace(/#7C3AED/ig, '#C8CDD4'); 

// Text colors
content = content.replace(/text-\[#e2e8f0\]/g, 'text-[#E8EAED]');
content = content.replace(/text-\[#cbd5e1\]/g, 'text-[#C8CDD4]');
content = content.replace(/text-\[#94a3b8\]/g, 'text-[#7E8590]');
content = content.replace(/text-\[#64748b\]/g, 'text-[#7E8590]');

// Background and border dark mode swaps (adjusting to charcoal)
content = content.replace(/bg-\[#0d0e1f\]/g, 'bg-[#1E1E1E]');
content = content.replace(/border-\[rgba\(139,92,246,0\.1\)\]/g, 'border-[rgba(200,205,212,0.15)]');

// Base background gradient replacement
content = content.replace(
  /'radial-gradient\(ellipse at top right, #1a1625 0%, #06070f 50%, #000000 100%\)'/g,
  /'radial-gradient(ellipse at center, #161614 0%, #1e1e1e 100%)'/
);

// Selection colors
content = content.replace(/selection:bg-purple-500\/30 selection:text-\[#e2e8f0\]/g, 'selection:bg-[#c8cdd4]/30 selection:text-[#e8eaed]');

fs.writeFileSync('src/App.jsx', content);

// 2. Update HexagonParticles.jsx
let hexContent = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
hexContent = hexContent.replace(/const colors = \[\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},\s+\{.*?\},?\s+\];/s, 
`const colors = [
      { r: 200, g: 205, b: 212 }, // Silver Slate #C8CDD4
    ];`);
fs.writeFileSync('src/components/HexagonParticles.jsx', hexContent);

// 3. CSS body background reset
let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace('background-color: #06070f;\n  color: #e2e8f0;', 'background-color: #1e1e1e;\n  color: #e8eaed;');
fs.writeFileSync('src/index.css', cssContent);

console.log('Silver Slate theme applied successfully!');
