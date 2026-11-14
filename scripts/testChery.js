async function testChery() {
  const sites = [
    'https://www.cheryinternational.com/',
    'https://cheryalgerie.com/',
    'https://chery.ae/'
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
testChery();
