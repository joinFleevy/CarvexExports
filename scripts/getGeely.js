async function getGeelyModels() {
  const res = await fetch('https://geelylb.com/coolray/');
  const html = await res.text();
  const imgs = [...new Set([...html.matchAll(/(https?:\/\/[^"'\s)]+\.(?:png|webp|jpg))/gi)].map(m => m[1]))];
  imgs.forEach(u => console.log(u));
}
getGeelyModels();
