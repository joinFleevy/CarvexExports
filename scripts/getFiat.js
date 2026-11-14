async function getFiatAssets() {
  const models = ['500', '500x', 'tipo', 'doblo', 'scudo', 'ducato', 'titano'];
  for (const m of models) {
    try {
      const res = await fetch(`https://www.media.stellantis.com/em-en/fiat/models/${m}`);
      console.log('Stellantis Fiat', m, res.status);
    } catch(e) {
      console.log('Stellantis Fiat', m, e.message);
    }
  }
}
getFiatAssets();
