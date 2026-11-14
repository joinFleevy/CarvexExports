async function getCheryHrefs() {
  const res = await fetch('https://cheryalgerie.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log([...new Set(hrefs)].filter(h => !h.startsWith('#') && !h.includes('javascript')));
}
getCheryHrefs();
