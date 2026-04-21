const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Core Backgrounds
content = content.replace(
  /'radial-gradient\(ellipse at center, #161614 0%, #1e1e1e 100%\)'/ig,
  "'#141413'"
);
// Replace other stray backgrounds
content = content.replace(/bg-\[#1E1E1E\]\/[0-9]+/g, 'bg-[rgba(255,255,255,0.04)]');
content = content.replace(/bg-\[#1E1E1E\]/g, 'bg-[#141413]');

// 2. Text Colors
content = content.replace(/text-\[#E8EAED\]/gi, 'text-[#EDEAE4]');
content = content.replace(/text-\[#7E8590\]/gi, 'text-[#8A8580]');
content = content.replace(/text-\[#C8CDD4\]/gi, 'text-[#D4A853]'); // accent text
content = content.replace(/text-\[#C4BFB8\]/gi, 'text-[#C4BFB8]'); // safety

// 3. Accents and Hexes
content = content.replace(/#C8CDD4/gi, '#D4A853');
content = content.replace(/linear-gradient\(135deg, #D4A853, #D4A853\)/g, '#D4A853'); // flatten gradients if they exist
content = content.replace(/linear-gradient\(90deg, #D4A853, #D4A853\)/g, '#D4A853');

// 4. Borders Surface and Glass
content = content.replace(/border-\[rgba\(200,205,212,0\.[0-9]+\)\]/g, 'border-[rgba(255,255,255,0.08)]');
content = content.replace(/hover:border-\[rgba\(200,205,212,0\.[0-9]+\)\]/g, 'hover:border-[rgba(212,168,83,0.30)]');

// 5. Destructive Button Fix
// There are no destructive buttons in the original file, but we'll apply hover glows to cards.
content = content.replace(/hover:shadow-\[0_15px_30px_rgba\(124,58,237,0\.15\)\]/g, 'hover:shadow-[0_15px_30px_rgba(212,168,83,0.15)]');
content = content.replace(/hover:shadow-\[0_20px_40px_rgba\([^)]+\)\]/g, 'hover:shadow-[0_20px_40px_rgba(212,168,83,0.15)]');
content = content.replace(/hover:shadow-\[0_15px_30px_rgba\([^)]+\)\]/g, 'hover:shadow-[0_15px_30px_rgba(212,168,83,0.15)]');

// Navbar container update
content = content.replace(
  /className=\{`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-floating-slow \$\{\s*scrolled\s*\?\s*'bg-\[#1E1E1E\]\/60 backdrop-blur-xl border-b border-white\/40 shadow-lg shadow-purple-500\/5'\s*:\s*''\s*\}\`\}/g,
  `className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-floating-slow \${
        scrolled
          ? 'bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] shadow-lg'
          : ''
      }\`}`
);

// Navbar Tabs string replacement
content = content.replace(
  /className=\{`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 \$\{\s*isActive\s*\?\s*'text-\[#e8eaed\] bg-\[rgba\(200,205,212,0.12\)\] border border-\[rgba\(200,205,212,0.28\)\] shadow-\[0_0_15px_rgba\(200,205,212,0.3\)\]'\s*:\s*'text-\[#7e8590\] hover:text-\[#c8cdd4\] border border-transparent hover:border-\[rgba\(200,205,212,0.1\)\]'\s*\}\`\}/,
  `className={\`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 \${
                    isActive 
                      ? 'text-[#D4A853] bg-[rgba(212,168,83,0.12)] border border-[rgba(212,168,83,0.30)] shadow-[0_0_14px_rgba(212,168,83,0.20)]' 
                      : 'text-[#8A8580] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] hover:text-[#C4BFB8]'
                  }\`}`
);

// Button: Primary (View My Work)
// Was: className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8EAED] px-6 py-3 rounded-full shadow-[0_10px_25px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_15px_35px_rgba(124,58,237,0.5)]" style={{ background: 'linear-gradient(135deg, #C8CDD4, #C8CDD4)' }}
content = content.replace(
  /className="inline-flex items-center gap-2 text-sm font-semibold text-\[#EDEAE4\] px-6 py-3 rounded-full shadow-\[0_10px_25px_rgba\(124,58,237,0.4\)\] transition-all hover:shadow-\[0_15px_35px_rgba\(124,58,237,0.5\)\]"\s+style=\{\{\s*background:\s*'#D4A853'\s*\}\}/,
  `className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] px-6 py-3 rounded-full bg-[rgba(212,168,83,0.14)] border border-[rgba(212,168,83,0.40)] transition-all hover:bg-[#D4A853] hover:text-[#141413] shadow-[0_10px_25px_rgba(212,168,83,0.2)] hover:shadow-[0_15px_35px_rgba(212,168,83,0.4)]"`
);

// Button: Glass (Download Resume)
// Was text-[#8A8580] bg-[rgba(255,255,255,0.04)] ... Let's make it match the rule
content = content.replace(
  /className="inline-flex items-center gap-2 text-sm font-semibold text-\[#8A8580\] px-6 py-3 border border-\[rgba\(255,255,255,0\.08\)\] bg-\[rgba\(255,255,255,0\.04\)\] backdrop-blur-sm shadow-\[0_8px_20px_rgba\(0,0,0,0.06\)\] hover:bg-\[rgba\(255,255,255,0\.04\)\] hover:shadow-\[0_15px_30px_rgba\(124,58,237,0.15\)\] transition-all rounded-full"/,
  `className="inline-flex items-center gap-2 text-sm font-semibold text-[#C4BFB8] px-6 py-3 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:border-[rgba(255,255,255,0.20)] hover:text-[#EDEAE4] hover:shadow-[0_15px_30px_rgba(212,168,83,0.15)] transition-all"`
);

// Update HexagonParticles JS
let hexContent = fs.readFileSync('src/components/HexagonParticles.jsx', 'utf8');
hexContent = hexContent.replace(/const colors = \[\s+\{.*?\},\s+\];/s, 
`const colors = [
      { r: 212, g: 168, b: 83 }, // Warm Gold Tint #D4A853
    ];`);
fs.writeFileSync('src/components/HexagonParticles.jsx', hexContent);

// Top-level css index.css background
let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace(/background-color: #[0-9a-fA-F]+;/g, 'background-color: #141413;');
cssContent = cssContent.replace(/color: #[0-9a-fA-F]+;/g, 'color: #EDEAE4;');
fs.writeFileSync('src/index.css', cssContent);

fs.writeFileSync('src/App.jsx', content);

console.log('Olive Warmth theme script written and executed.');
