import { MetadataRoute } from 'next';
import { pb, Vehicle } from '@/lib/pocketbase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://carvexexport.com';

  // 1. Static Core Pages with SEO Priority Ranking (Re-ranked by conversion impact)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Primary landing & brand presence
    },
    {
      url: `${baseUrl}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9, // High intent vehicle search & catalog
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85, // Lead generation & customs calculator
    },
    {
      url: `${baseUrl}/showrooms`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8, // Physical showrooms trust & GPS
    },
    {
      url: `${baseUrl}/track`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.75, // Order & container tracking
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6, // Official receipt & contract studio
    },
  ];

  // 2. Dynamic Vehicle Pages (Ranked by active status: in_stock > in_transit > on_order)
  let dynamicVehiclePages: MetadataRoute.Sitemap = [];
  try {
    const vehicles = await pb.collection('vehicles').getFullList<Vehicle>({
      filter: 'is_deleted != true',
      sort: '-year',
      requestKey: null,
    });

    dynamicVehiclePages = vehicles.map((car) => {
      // Prioritize in-stock cars higher for immediate purchase intent
      const priority = car.status === 'in_stock' ? 0.85 : 0.75;

      return {
        url: `${baseUrl}/inventory/${car.id}`,
        lastModified: new Date(car.updated || new Date()),
        changeFrequency: 'daily',
        priority,
      };
    });
  } catch (err) {
    console.error('Failed to fetch dynamic vehicle pages for sitemap:', err);
  }

  return [...staticPages, ...dynamicVehiclePages];
}
