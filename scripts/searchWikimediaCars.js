const fs = require('fs');

const carQueries = [
  { id: 'fiat-500-hybrid', query: 'Fiat 500 Hybrid white background OR studio OR front' },
  { id: 'fiat-500x', query: 'Fiat 500X front' },
  { id: 'fiat-tipo', query: 'Fiat Tipo front' },
  { id: 'fiat-titano', query: 'Fiat Titano OR Peugeot Landtrek' },
  { id: 'fiat-doblo', query: 'Fiat Doblo front' },
  { id: 'fiat-scudo', query: 'Fiat Scudo front' },
  { id: 'fiat-ducato', query: 'Fiat Ducato front' },
  { id: 'chery-tiggo-2-pro', query: 'Chery Tiggo 2 Pro OR Chery Tiggo 3x' },
  { id: 'chery-arrizo-5', query: 'Chery Arrizo 5 front' },
  { id: 'chery-tiggo-4-pro', query: 'Chery Tiggo 4 Pro OR Chery Tiggo 5x' },
  { id: 'chery-tiggo-7-pro', query: 'Chery Tiggo 7 Pro' },
  { id: 'chery-arrizo-8', query: 'Chery Arrizo 8' },
  { id: 'chery-tiggo-8-pro', query: 'Chery Tiggo 8 Pro' },
  { id: 'geely-emgrand', query: 'Geely Emgrand 4th generation front' },
  { id: 'geely-coolray', query: 'Geely Coolray OR Geely Binyue front' },
  { id: 'geely-starray', query: 'Geely Boyue L OR Geely Starray' },
  { id: 'opel-mokka', query: 'Opel Mokka B front' },
  { id: 'opel-astra', query: 'Opel Astra L front' },
  { id: 'opel-grandland', query: 'Opel Grandland front' },
  { id: 'jetour-x70', query: 'Jetour X70 front' },
  { id: 'jetour-x70-plus', query: 'Jetour X70 Plus' },
  { id: 'jetour-dashing', query: 'Jetour Dashing front' },
  { id: 'jetour-x90-plus', query: 'Jetour X90 Plus' },
  { id: 'jetour-t2', query: 'Jetour Traveller OR Jetour T2' },
  { id: 'baic-u5-plus', query: 'Beijing U5 Plus OR BAIC U5' },
  { id: 'baic-x35', query: 'Beijing X3 OR BAIC X35' },
  { id: 'baic-x55', query: 'Beijing X55 OR BAIC X55' },
  { id: 'baic-x7', query: 'Beijing X7 OR BAIC X7' },
  { id: 'baic-bj40-plus', query: 'BAIC BJ40 Plus OR Beijing BJ40' },
  { id: 'dongfeng-shine', query: 'Aeolus Yixuan OR Dongfeng Shine' },
  { id: 'dongfeng-sx5', query: 'Forthing Jingyi X5 OR Forthing SX5' },
  { id: 'dongfeng-rich-6', query: 'Dongfeng Rich 6' },
  { id: 'joyear-s50', query: 'Forthing Jingyi S50 OR Joyear S50' },
  { id: 'joyear-t5-evo', query: 'Forthing T5 EVO' },
  { id: 'dfsk-glory-500', query: 'Fengon 500 OR DFSK Glory 500' },
  { id: 'dfsk-k01s', query: 'DFSK K01 OR Sokon mini truck' },
  { id: 'sokon-c01', query: 'Sokon C31 OR Sokon C32' },
  { id: 'jmc-vigus', query: 'JMC Yuhu OR JMC Vigus' },
  { id: 'jmc-carrying', query: 'JMC Carrying Plus OR JMC light truck' }
];

async function searchCommons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=3&prop=imageinfo&iiprop=url|size&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages).map(p => ({
      title: p.title,
      url: p.imageinfo?.[0]?.url,
      width: p.imageinfo?.[0]?.width,
      height: p.imageinfo?.[0]?.height
    })).filter(x => x.url && /\.(jpe?g|png|webp)$/i.test(x.url));
  } catch (e) {
    return [];
  }
}

async function run() {
  const results = {};
  for (const item of carQueries.slice(0, 5)) {
    console.log(`Searching for: ${item.id}...`);
    const found = await searchCommons(item.query);
    console.log(item.id, found);
    results[item.id] = found;
  }
}

run();
