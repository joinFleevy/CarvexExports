// setup_pocketbase.mjs
import fs from 'fs';
import path from 'path';

const PB_URL = 'http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io';
const ADMIN_EMAIL = 'namaagrowthagency@gmail.com';
const ADMIN_PASS = 'fDTHzV3HhhiaTFy@';

async function main() {
  console.log('🔄 Authenticating with PocketBase as Superuser...');
  const authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASS }),
  });

  if (!authRes.ok) {
    throw new Error(`Auth failed with status ${authRes.status}: ${await authRes.text()}`);
  }

  const { token } = await authRes.json();
  console.log('✅ Authenticated successfully!');

  const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
  };

  // Helper to get all collections
  const getCollections = async () => {
    const res = await fetch(`${PB_URL}/api/collections?perPage=100`, { headers });
    const data = await res.json();
    return data.items || [];
  };

  const existingCollections = await getCollections();
  const existingNames = new Set(existingCollections.map(c => c.name));
  console.log('Existing collections:', Array.from(existingNames));

  // 1. Create 'branches'
  let branchCol = existingCollections.find(c => c.name === 'branches');
  if (!branchCol) {
    console.log('📦 Creating collection: branches...');
    const res = await fetch(`${PB_URL}/api/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'branches',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        fields: [
          { name: 'code', type: 'text', required: true },
          { name: 'name_ar', type: 'text', required: true },
          { name: 'name_fr', type: 'text' },
          { name: 'phone_commercial_1', type: 'text' },
          { name: 'phone_commercial_2', type: 'text' },
          { name: 'phone_whatsapp', type: 'text' },
          { name: 'address_text', type: 'text' },
          { name: 'google_maps_url', type: 'url' },
          { name: 'is_active', type: 'bool' },
        ],
      }),
    });
    branchCol = await res.json();
    if (!res.ok) throw new Error(`Failed to create branches: ${JSON.stringify(branchCol)}`);
    console.log('✅ Created collection: branches');
  }

  // 2. Create 'shipments'
  let shipmentCol = existingCollections.find(c => c.name === 'shipments');
  if (!shipmentCol) {
    console.log('📦 Creating collection: shipments...');
    const res = await fetch(`${PB_URL}/api/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'shipments',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        fields: [
          { name: 'container_number', type: 'text', required: true },
          {
            name: 'shipping_company',
            type: 'select',
            values: ['COSCO', 'CMA CGM', 'Maersk', 'MSC', 'Other'],
          },
          { name: 'vessel_name', type: 'text' },
          { name: 'departure_port', type: 'text' },
          { name: 'arrival_port', type: 'text' },
          { name: 'departure_date', type: 'date' },
          { name: 'estimated_arrival', type: 'date' },
          {
            name: 'current_status',
            type: 'select',
            values: ['loaded_china', 'sailing', 'arrived_port', 'cleared'],
          },
        ],
      }),
    });
    shipmentCol = await res.json();
    if (!res.ok) throw new Error(`Failed to create shipments: ${JSON.stringify(shipmentCol)}`);
    console.log('✅ Created collection: shipments');
  }

  // 3. Create 'vehicles'
  let vehicleCol = existingCollections.find(c => c.name === 'vehicles');
  if (!vehicleCol) {
    console.log('📦 Creating collection: vehicles...');
    const res = await fetch(`${PB_URL}/api/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'vehicles',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'brand', type: 'text', required: true },
          { name: 'model', type: 'text', required: true },
          { name: 'year', type: 'number', required: true },
          {
            name: 'mileage_status',
            type: 'select',
            values: ['zero_km', 'under_3_years'],
          },
          { name: 'origin_country', type: 'text' },
          {
            name: 'status',
            type: 'select',
            values: ['in_stock', 'in_transit', 'on_order', 'reserved', 'sold'],
          },
          {
            name: 'branch',
            type: 'relation',
            collectionId: branchCol.id,
            maxSelect: 1,
          },
          { name: 'price_total_dzd_centimes', type: 'number' },
          { name: 'price_fob_dzd_centimes', type: 'number' },
          {
            name: 'engine_type',
            type: 'select',
            values: ['essence', 'hybrid', 'electric'],
          },
          { name: 'engine_displacement_cc', type: 'number' },
          {
            name: 'transmission',
            type: 'select',
            values: ['automatique', 'manuelle'],
          },
          { name: 'color', type: 'text' },
          {
            name: 'images',
            type: 'file',
            maxSelect: 10,
            mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          },
          {
            name: 'spec_sheet_pdf',
            type: 'file',
            maxSelect: 1,
            mimeTypes: ['application/pdf'],
          },
          { name: 'is_featured', type: 'bool' },
        ],
      }),
    });
    vehicleCol = await res.json();
    if (!res.ok) throw new Error(`Failed to create vehicles: ${JSON.stringify(vehicleCol)}`);
    console.log('✅ Created collection: vehicles');
  }

  // 4. Create 'orders'
  let orderCol = existingCollections.find(c => c.name === 'orders');
  if (!orderCol) {
    console.log('📦 Creating collection: orders...');
    const res = await fetch(`${PB_URL}/api/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'orders',
        type: 'base',
        listRule: '@request.auth.id != "" || (client_phone = @request.headers.x_client_phone && client_pin = @request.headers.x_client_pin)',
        viewRule: '@request.auth.id != "" || (client_phone = @request.headers.x_client_phone && client_pin = @request.headers.x_client_pin)',
        createRule: '', // public lead creation allowed
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        fields: [
          { name: 'order_number', type: 'text', required: true },
          { name: 'client_name', type: 'text', required: true },
          { name: 'client_phone', type: 'text', required: true },
          { name: 'client_pin', type: 'text', required: true },
          {
            name: 'vehicle',
            type: 'relation',
            collectionId: vehicleCol.id,
            maxSelect: 1,
          },
          {
            name: 'shipment',
            type: 'relation',
            collectionId: shipmentCol.id,
            maxSelect: 1,
          },
          {
            name: 'selected_branch',
            type: 'relation',
            collectionId: branchCol.id,
            maxSelect: 1,
          },
          {
            name: 'customs_regime',
            type: 'select',
            values: ['licence_moudjahidine', 'individual_under_3_years'],
          },
          { name: 'agreed_price_centimes', type: 'number' },
          { name: 'deposit_paid_centimes', type: 'number' },
          { name: 'current_step', type: 'number' }, // 1 to 4
        ],
      }),
    });
    orderCol = await res.json();
    if (!res.ok) throw new Error(`Failed to create orders: ${JSON.stringify(orderCol)}`);
    console.log('✅ Created collection: orders');
  }

  // 5. Create 'documents'
  let docCol = existingCollections.find(c => c.name === 'documents');
  if (!docCol) {
    console.log('📦 Creating collection: documents...');
    const res = await fetch(`${PB_URL}/api/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'documents',
        type: 'base',
        listRule: '@request.auth.id != ""',
        viewRule: '@request.auth.id != "" || (order.client_phone = @request.headers.x_client_phone && order.client_pin = @request.headers.x_client_pin)',
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
        fields: [
          {
            name: 'order',
            type: 'relation',
            collectionId: orderCol.id,
            maxSelect: 1,
          },
          {
            name: 'doc_type',
            type: 'select',
            values: ['recu_arbon', 'recu_paiement', 'bon_commande', 'fiche_technique'],
          },
          { name: 'doc_number', type: 'text', required: true },
          { name: 'amount_numeric', type: 'number' },
          { name: 'amount_in_words', type: 'text' },
          {
            name: 'pdf_file',
            type: 'file',
            maxSelect: 1,
            protected: true,
            mimeTypes: ['application/pdf'],
          },
        ],
      }),
    });
    docCol = await res.json();
    if (!res.ok) throw new Error(`Failed to create documents: ${JSON.stringify(docCol)}`);
    console.log('✅ Created collection: documents');
  }

  // 6. Populate Seed Branches if empty
  const branchesListRes = await fetch(`${PB_URL}/api/collections/branches/records`, { headers });
  const branchesList = await branchesListRes.json();
  let branchMap = {};

  if (branchesList.totalItems === 0) {
    console.log('🌱 Seeding branches...');
    const seedBranches = [
      {
        code: 'alger',
        name_ar: 'الجزائر العاصمة (المحمدية)',
        name_fr: 'Alger - Mohammadia',
        phone_commercial_1: '0779055489',
        phone_commercial_2: '0557053814',
        phone_whatsapp: '213779055489',
        address_text: 'المحمدية / الصنوبر البحري (قرب قصر المعارض SAFEX)، الجزائر العاصمة',
        is_active: true,
      },
      {
        code: 'jijel',
        name_ar: 'جيجل (بوالرمل)',
        name_fr: 'Jijel - Boulrimal',
        phone_commercial_1: '0660656274',
        phone_commercial_2: '0554154163',
        phone_whatsapp: '213660656274',
        address_text: 'بوالرمل (المنطقة الصناعية قرب ميناء جن جن)، ولاية جيجل',
        is_active: true,
      },
      {
        code: 'ouergla',
        name_ar: 'ورقلة (وسط المدينة)',
        name_fr: 'Ouargla - Centre',
        phone_commercial_1: '0660414034',
        phone_commercial_2: '0661466727',
        phone_whatsapp: '213660414034',
        address_text: 'حي النصر / وسط المدينة، ولاية ورقلة',
        is_active: true,
      },
    ];

    for (const b of seedBranches) {
      const res = await fetch(`${PB_URL}/api/collections/branches/records`, {
        method: 'POST',
        headers,
        body: JSON.stringify(b),
      });
      const created = await res.json();
      branchMap[b.code] = created.id;
      console.log(`   + Added branch: ${b.name_ar}`);
    }
  } else {
    branchesList.items.forEach(b => { branchMap[b.code] = b.id; });
    console.log('ℹ️ Branches already exist.');
  }

  // 7. Populate Seed Vehicles if empty
  const vehiclesListRes = await fetch(`${PB_URL}/api/collections/vehicles/records`, { headers });
  const vehiclesList = await vehiclesListRes.json();

  if (vehiclesList.totalItems === 0) {
    console.log('🌱 Seeding initial vehicles from verified 2026 inventory...');
    const seedVehicles = [
      {
        title: 'Geely Coolray Battle 2026',
        brand: 'Geely',
        model: 'Coolray Battle',
        year: 2026,
        mileage_status: 'zero_km',
        origin_country: 'China',
        status: 'in_stock',
        branch: branchMap['alger'],
        price_total_dzd_centimes: 399,
        price_fob_dzd_centimes: 280,
        engine_type: 'essence',
        engine_displacement_cc: 1498,
        transmission: 'automatique',
        color: 'أبيض لؤلؤي / سقف أسود',
        is_featured: true,
      },
      {
        title: 'Geely Coolray Full 2026',
        brand: 'Geely',
        model: 'Coolray Full Option',
        year: 2026,
        mileage_status: 'zero_km',
        origin_country: 'China',
        status: 'in_stock',
        branch: branchMap['jijel'],
        price_total_dzd_centimes: 388,
        price_fob_dzd_centimes: 270,
        engine_type: 'essence',
        engine_displacement_cc: 1498,
        transmission: 'automatique',
        color: 'رمادي تيتانيوم',
        is_featured: true,
      },
      {
        title: 'Geely Coolray Manuelle 2026',
        brand: 'Geely',
        model: 'Coolray Manuelle',
        year: 2026,
        mileage_status: 'zero_km',
        origin_country: 'China',
        status: 'in_transit',
        branch: branchMap['jijel'],
        price_total_dzd_centimes: 307,
        price_fob_dzd_centimes: 215,
        engine_type: 'essence',
        engine_displacement_cc: 1498,
        transmission: 'manuelle',
        color: 'رمادي معدني',
        is_featured: true,
      },
      {
        title: 'MG5 Global (MX) 2026',
        brand: 'MG',
        model: 'MG5 Global',
        year: 2026,
        mileage_status: 'zero_km',
        origin_country: 'China',
        status: 'in_stock',
        branch: branchMap['ouergla'],
        price_total_dzd_centimes: 268,
        price_fob_dzd_centimes: 185,
        engine_type: 'essence',
        engine_displacement_cc: 1498,
        transmission: 'automatique',
        color: 'أبيض ناصع',
        is_featured: true,
      },
      {
        title: 'Jetour Dashing 1.5T 2026',
        brand: 'Jetour',
        model: 'Dashing Luxury',
        year: 2026,
        mileage_status: 'zero_km',
        origin_country: 'China',
        status: 'on_order',
        branch: branchMap['alger'],
        price_total_dzd_centimes: 415,
        price_fob_dzd_centimes: 295,
        engine_type: 'essence',
        engine_displacement_cc: 1498,
        transmission: 'automatique',
        color: 'أسود ملكي',
        is_featured: true,
      },
    ];

    for (const v of seedVehicles) {
      const res = await fetch(`${PB_URL}/api/collections/vehicles/records`, {
        method: 'POST',
        headers,
        body: JSON.stringify(v),
      });
      const created = await res.json();
      console.log(`   + Added vehicle: ${v.title} (${v.price_total_dzd_centimes}M)`);
    }
  } else {
    console.log('ℹ️ Vehicles already exist.');
  }

  console.log('\n🎉 PocketBase Database Setup Completed Successfully!');
}

main().catch(err => {
  console.error('❌ Error during setup:', err);
  process.exit(1);
});
