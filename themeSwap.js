const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Hex code swaps
content = content.replace(/#7C3AED/g, '#2563EB');
content = content.replace(/#EC4899/g, '#1D4ED8');
content = content.replace(/#10B981/g, '#059669');
content = content.replace(/#F472B6/g, '#60A5FA');
content = content.replace(/#A78BFA/g, '#3B82F6');
content = content.replace(/#8B5CF6/g, '#2563EB');
content = content.replace(/#06B6D4/g, '#0EA5E9');

// Tailwind class swaps
content = content.replace(/purple-/g, 'blue-');
content = content.replace(/pink-/g, 'sky-');
content = content.replace(/emerald-/g, 'teal-');

fs.writeFileSync('src/App.jsx', content);
console.log('Theme applied successfully!');
