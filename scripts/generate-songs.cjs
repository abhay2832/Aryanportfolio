```js
const fs = require('node:fs');
const path = require('node:path');

const publicDir = path.join(process.cwd(), 'public');
const outputFile = path.join(process.cwd(), 'src', 'generated-songs.js');

if (!fs.existsSync(publicDir)) {
  throw new Error('Error: public folder nahi mila!');
}

const songs = fs.readdirSync(publicDir)
  .filter(file => /\.mp3$/i.test(file))
  .sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    })
  );

const content =
  '// Automatically generated. Do not edit manually.\n' +
  `export const SONG_FILES = ${JSON.stringify(songs, null, 2)};\n`;

fs.writeFileSync(outputFile, content, 'utf8');

console.log(`Success! ${songs.length} MP3 song(s) found.`);
```
