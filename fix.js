const fs = require('fs');

let file = 'i:\\My Drive\\2_IslandGIS\\index.html';
let content = fs.readFileSync(file, 'utf8');

const fixes = [
  [/â€”/g, '—'],
  [/Â·/g, '·'],
  [/ðŸ—º/g, '🗺'],
  [/ðŸ§ /g, '🧠'],
  [/ðŸ”¬/g, '🔬'],
  [/ðŸ¤–/g, '🤖'],
  [/ðŸŽ“/g, '🎓'],
  [/ðŸŒ¿/g, '🌿'],
  [/ðŸ Ÿ/g, '🏛'],
  [/ðŸ”.?/g, '🔭'], // wildcard for following invisible char
  [/ðŸ›°/g, '🛰'],
  [/ðŸ“Š/g, '📊'],
  [/ðŸ“ /g, '📁'],
  [/ðŸ‘¥/g, '👥'],
  [/ðŸ“…/g, '📅'],
  [/ðŸ’¼/g, '💼'],
  [/ðŸ“˜/g, '📘'],
  [/ðŸ ˆ/g, '🏝'],
  [/âœ‰/g, '✉'],
  [/ðŸ’¬/g, '💬']
];

for (let [bad, good] of fixes) {
    content = content.replace(bad, good);
}

// Special case for language dropdown which got severely mangled
content = content.replace(/alt="KH">\s*[^<]+?<\/a>/g, 'alt="KH">\n      ខ្មែរ</a>');
// Special case for hero eyebrow flag
content = content.replace(/<div class="hero-eyebrow"(.*?)>.*?Geospatial Education/g, '<div class="hero-eyebrow"$1>🇰🇭 Geospatial Education');
// Special case for the coming soon icons where some characters might have collapsed
content = content.replace(/<div class="coming-icon">.*?<\/div>/g, '<div class="coming-icon">🛰</div>');

fs.writeFileSync(file, content, 'utf8');
console.log("Fixes applied.");
