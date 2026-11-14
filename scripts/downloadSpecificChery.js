const fs = require('fs');

const specificCheryInteriors = [
  { id: 'chery-arrizo-5-dashboard.jpg', url: 'https://cheryalgerie.com/media/intDesignImages/Arrizo%205%20dashboard.jpg' },
  { id: 'chery-tiggo-7-pro-interior.jpg', url: 'https://cheryalgerie.com/media/intDesignImages/7pro_Interior-1720x600.jpg' },
  { id: 'chery-tiggo-8-pro-interior.jpg', url: 'https://cheryalgerie.com/media/intDesignImages/Interior---1720x600.jpg' },
  { id: 'chery-tiggo-8-pro-touchscreen.jpg', url: 'https://cheryalgerie.com/media/intDesignImages/T1D-Studio-shot-Local-interior-Touch-screen.jpg' },
  { id: 'chery-arrizo-8-interior-cockpit.png', url: 'https://cheryalgerie.com/media/intDesignImages/arrizo8_sec2_tab3.png' },
  { id: 'chery-arrizo-8-interior-seats.jpg', url: 'https://cheryalgerie.com/media/intDesignImages/interior1.jpg' },
  { id: 'chery-arrizo-8-interior-console.jpg', url: 'https://cheryalgerie.com/media/intDesignImages/interior2.jpg' }
];

async function run() {
  for (const item of specificCheryInteriors) {
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(`public/images/cars/${item.id}`, buf);
        console.log(`Saved public/images/cars/${item.id} (${buf.length} bytes)`);
      } else {
        console.log(`Failed ${item.id}: status ${res.status}`);
      }
    } catch(e) {
      console.log(`Error ${item.id}:`, e.message);
    }
  }
}

run();
