const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crc32table = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = crc32table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function writePng(file, width, height, getPixel) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = getPixel(x, y);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, png);
}

function svgArt({ title, subtitle, accent, motif }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1C1612"/>
      <stop offset="100%" stop-color="#2A221C"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#C4A35A" stroke-opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#grid)"/>
  <circle cx="980" cy="140" r="180" fill="${accent}" fill-opacity="0.12"/>
  <circle cx="160" cy="680" r="140" fill="#2F4A32" fill-opacity="0.25"/>
  ${motif}
  <rect x="64" y="64" width="1072" height="672" fill="none" stroke="#C4A35A" stroke-opacity="0.35"/>
  <text x="80" y="680" fill="#F6F1E8" font-family="Georgia, serif" font-size="42">${title}</text>
  <text x="80" y="720" fill="#C4A35A" font-family="system-ui, sans-serif" font-size="18" letter-spacing="3">${subtitle}</text>
  <text x="1040" y="84" fill="#C4A35A" font-size="18" opacity="0.7">PLACEHOLDER</text>
</svg>`;
}

const motifs = {
  circus: '<path d="M360 620 C420 280 780 280 840 620" fill="none" stroke="#C4A35A" stroke-width="8"/><circle cx="600" cy="250" r="36" fill="#7A3A36"/><path d="M520 430h160M600 300v260" stroke="#F6F1E8" stroke-width="5"/>',
  music: '<ellipse cx="600" cy="360" rx="90" ry="140" fill="none" stroke="#C4A35A" stroke-width="8"/><path d="M690 250v280M520 320h80M520 400h80" stroke="#F6F1E8" stroke-width="5"/>',
  coffee: '<path d="M600 180v90M560 180h80" stroke="#C4A35A" stroke-width="8"/><path d="M520 280c-60 10-90 90-70 180 20 90 90 140 150 140s130-50 150-140c20-90-10-170-70-180z" fill="#7A3A36" fill-opacity=".35" stroke="#C4A35A" stroke-width="6"/><path d="M760 320c70 10 80 110 10 170" fill="none" stroke="#F6F1E8" stroke-width="6"/>',
  people: '<circle cx="540" cy="300" r="40" fill="#C4A35A"/><circle cx="660" cy="300" r="40" fill="#F6F1E8" fill-opacity=".8"/><path d="M470 560c10-120 90-150 170-150s160 30 170 150" fill="#2F4A32"/>',
  night: '<rect x="280" y="220" width="640" height="320" fill="#0f0c0a" stroke="#C4A35A"/><path d="M280 540 L920 360" stroke="#7A3A36" stroke-width="18"/>',
  drum: '<ellipse cx="600" cy="240" rx="120" ry="40" fill="none" stroke="#C4A35A" stroke-width="8"/><path d="M480 240l40 280h160l40-280" fill="none" stroke="#F6F1E8" stroke-width="6"/>',
  portrait: '<rect width="1200" height="800" fill="#241c16"/><circle cx="600" cy="310" r="120" fill="#C4A35A" fill-opacity=".25"/><circle cx="600" cy="300" r="78" fill="#E8D7B5"/><path d="M380 760c20-200 140-260 220-260s200 60 220 260" fill="#2F4A32"/>',
};

const files = [
  ['public/images/hero/ensemble.svg', 'KIN Ensemble', 'LIVE PERFORMANCE PLACEHOLDER', '#C4A35A', motifs.circus],
  ['public/images/hero/texture.svg', 'Studio Light', 'ADD PHOTOGRAPHY HERE', '#7A3A36', motifs.night],
  ['public/images/events/echoes.svg', 'Echoes of the Ridge', 'EVENT IMAGE', '#C4A35A', motifs.circus],
  ['public/images/events/buna.svg', 'Buna Rhythms', 'EVENT IMAGE', '#7A3A36', motifs.coffee],
  ['public/images/events/youth.svg', 'Youth Open Rehearsal', 'EVENT IMAGE', '#2F4A32', motifs.people],
  ['public/images/events/retrospective.svg', 'Fire & Clay', 'ARCHIVE IMAGE', '#C4A35A', motifs.night],
  ['public/images/events/gondar.svg', 'Night Songs', 'ARCHIVE IMAGE', '#7A3A36', motifs.music],
  ['public/images/blog/kebero.svg', 'Kebero', 'JOURNAL IMAGE', '#C4A35A', motifs.drum],
  ['public/images/blog/eskista.svg', 'Eskista in the Air', 'JOURNAL IMAGE', '#2F4A32', motifs.circus],
  ['public/images/blog/coffee.svg', 'Coffee Is a Rehearsal', 'JOURNAL IMAGE', '#7A3A36', motifs.coffee],
  ['public/images/blog/studio.svg', 'Open Studio', 'JOURNAL IMAGE', '#C4A35A', motifs.people],
  ['public/images/blog/tour.svg', 'Why We Tour Slowly', 'JOURNAL IMAGE', '#2F4A32', motifs.night],
  ['public/images/gallery/circus-pyramid.svg', 'Pyramid', 'GALLERY', '#C4A35A', motifs.circus],
  ['public/images/gallery/krar.svg', 'Krar', 'GALLERY', '#C4A35A', motifs.music],
  ['public/images/gallery/coffee.svg', 'Jebena', 'GALLERY', '#7A3A36', motifs.coffee],
  ['public/images/gallery/youth.svg', 'Workshop', 'GALLERY', '#2F4A32', motifs.people],
  ['public/images/gallery/aerial.svg', 'Straps', 'GALLERY', '#C4A35A', motifs.circus],
  ['public/images/gallery/night-stage.svg', 'Night Stage', 'GALLERY', '#7A3A36', motifs.night],
  ['public/images/gallery/drums.svg', 'Drums', 'GALLERY', '#C4A35A', motifs.drum],
  ['public/images/gallery/crowd.svg', 'Audience', 'GALLERY', '#2F4A32', motifs.people],
  ['public/images/announcements/fellowship.svg', 'Fellowship', 'NOTICE IMAGE', '#C4A35A', motifs.people],
  ['public/images/announcements/workshop.svg', 'Workshops', 'NOTICE IMAGE', '#2F4A32', motifs.drum],
  ['public/images/announcements/instruments.svg', 'Makers Call', 'NOTICE IMAGE', '#7A3A36', motifs.music],
  ['public/images/culture/intro.svg', 'Rooted in Tradition', 'STUDIO PLACEHOLDER', '#C4A35A', motifs.coffee],
  ['public/images/branding/mark.svg', 'KIN', 'MARK', '#C4A35A', ''],
];

for (const name of ['dawit','selamawit','yared','hiwot','mekdes','nahom','rahel','abesolom']) {
  files.push([`public/images/team/${name}.svg`, name[0].toUpperCase() + name.slice(1), 'TEAM PORTRAIT PLACEHOLDER', '#C4A35A', motifs.portrait]);
}

for (const [file, title, subtitle, accent, motif] of files) {
  const abs = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, svgArt({ title, subtitle, accent, motif }));
}

const modules = [
  [2,2,2,2,2,2,2,0,1,0,1,0,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,2,0,0,1,0,1,2,1,1,1,1,1,2],
  [2,1,0,0,0,1,2,0,1,1,1,0,2,1,0,0,0,1,2],
  [2,1,0,0,0,1,2,0,0,0,1,1,2,1,0,0,0,1,2],
  [2,1,0,0,0,1,2,0,1,0,0,0,2,1,0,0,0,1,2],
  [2,1,1,1,1,1,2,0,1,1,0,1,2,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,0,2,0,2,0,2,2,2,2,2,2,2],
  [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
  [1,0,1,1,0,1,2,1,0,1,0,1,1,0,1,1,0,1,1],
  [0,1,1,0,1,0,0,0,1,0,1,0,0,1,0,1,1,0,1],
  [1,0,0,1,0,1,2,1,0,1,0,1,1,0,1,0,0,1,0],
  [0,1,1,0,1,1,0,0,1,0,1,0,0,1,1,1,0,0,1],
  [2,2,2,2,2,2,2,0,1,0,1,1,0,1,0,1,1,0,1],
  [2,1,1,1,1,1,2,0,0,1,0,0,1,0,1,0,1,1,0],
  [2,1,0,0,0,1,2,0,1,0,1,1,0,1,0,1,0,0,1],
  [2,1,0,0,0,1,2,0,0,1,0,1,1,0,1,0,1,1,0],
  [2,1,0,0,0,1,2,0,1,0,1,0,0,1,0,1,0,1,1],
  [2,1,1,1,1,1,2,0,1,1,0,1,1,0,1,1,0,0,1],
  [2,2,2,2,2,2,2,0,1,0,1,0,1,1,0,1,1,0,1],
];

const scale = 10;
const quiet = 16;
const size = modules.length * scale + quiet * 2;
writePng(path.join(process.cwd(), 'public/images/qr/qr-code-placeholder.png'), size, size, (x, y) => {
  const gx = Math.floor((x - quiet) / scale);
  const gy = Math.floor((y - quiet) / scale);
  if (gx < 0 || gy < 0 || gx >= modules.length || gy >= modules.length) return [246, 241, 232];
  return modules[gy][gx] ? [28, 22, 18] : [246, 241, 232];
});

fs.copyFileSync(
  path.join(process.cwd(), 'public/images/qr/qr-code-placeholder.png'),
  path.join(process.cwd(), 'public/images/qr-code-placeholder.png')
);

console.log('placeholder assets written');
