async function checkOtherBrands() {
  const sites = [
    'https://www.opel.dz/',
    'https://jetour.dz/',
    'https://jetour-algerie.com/',
    'https://jetour-dz.com/',
    'https://baic.dz/',
    'https://baic-algerie.com/'
  ];
  for (const s of sites) {
    try {
      const res = await fetch(s, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(s, res.status);
    } catch(e) {
      console.log(s, e.message);
    }
  }
}
checkOtherBrands();
