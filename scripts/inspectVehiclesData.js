const fs = require('fs');
const content = fs.readFileSync('lib/vehiclesData.ts', 'utf8');
const ids = [...content.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Total vehicle IDs with double quotes:', ids.length);
console.log(ids);
