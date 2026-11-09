import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io');

async function main() {
  await pb.collection('_superusers').authWithPassword('namaagrowthagency@gmail.com', 'fDTHzV3HhhiaTFy@');
  console.log('Superuser authenticated!');

  try {
    const existing = await pb.collections.getOne('telegram_users');
    console.log('telegram_users collection exists:', existing.id);
  } catch (err) {
    console.log('Creating telegram_users collection...');
    const col = await pb.collections.create({
      name: 'telegram_users',
      type: 'base',
      fields: [
        { name: 'user_id', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'select', values: ['admin', 'manager_alger', 'manager_jijel', 'manager_ouergla', 'sales_agent'] },
        { name: 'branch', type: 'select', values: ['all', 'alger', 'jijel', 'ouergla'] },
        { name: 'is_active', type: 'bool' },
        { name: 'receive_alerts', type: 'bool' },
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
    });
    console.log('Created telegram_users collection:', col.id);
  }

  // Seed user 8209658134
  try {
    const records = await pb.collection('telegram_users').getList(1, 1, {
      filter: 'user_id = "8209658134"',
    });
    if (records.items.length === 0) {
      const rec = await pb.collection('telegram_users').create({
        user_id: '8209658134',
        name: 'Hichem Djouadi (الإدارة العامة)',
        role: 'admin',
        branch: 'all',
        is_active: true,
        receive_alerts: true,
      });
      console.log('Created record for user 8209658134 in PocketBase:', rec.id);
    } else {
      console.log('User 8209658134 already registered in PocketBase.');
    }
  } catch (err) {
    console.error('Error seeding user:', err);
  }
}

main().catch(console.error);
