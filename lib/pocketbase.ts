import PocketBase from 'pocketbase';

export const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  'http://pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io';

export const pb = new PocketBase(POCKETBASE_URL);

// Prevent auto-cancellation when multiple requests are triggered
pb.autoCancellation(false);

export interface Branch {
  id: string;
  code: 'alger' | 'jijel' | 'ouergla';
  name_ar: string;
  name_fr: string;
  phone_commercial_1: string;
  phone_commercial_2: string;
  phone_whatsapp: string;
  address_text: string;
  google_maps_url?: string;
  is_active: boolean;
}

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage_status: 'zero_km' | 'under_3_years';
  origin_country: string;
  status: 'in_stock' | 'in_transit' | 'on_order' | 'reserved' | 'sold';
  branch?: string;
  expand?: {
    branch?: Branch;
  };
  price_total_dzd_centimes: number; // e.g. 388 = 388 Million centimes
  price_fob_dzd_centimes?: number; // e.g. 270 = 270 Million centimes
  engine_type: 'essence' | 'hybrid' | 'electric';
  engine_displacement_cc: number;
  transmission: 'automatique' | 'manuelle';
  color: string;
  images: string[];
  spec_sheet_pdf?: string;
  is_featured: boolean;
  hide_price?: boolean; // If true, hides numeric price and shows "السعر عند الطلب / تواصل للمناقشة"
  is_deleted?: boolean;
  deleted_at?: string; // ISO Date string when moved to trash
  created?: string;
  updated?: string;
}

export interface TelegramUser {
  id: string;
  user_id: string;
  name: string;
  role: 'admin' | 'manager_alger' | 'manager_jijel' | 'manager_ouergla' | 'sales_agent';
  branch: 'all' | 'alger' | 'jijel' | 'ouergla';
  is_active: boolean;
  receive_alerts: boolean;
}

export interface Shipment {
  id: string;
  container_number: string;
  shipping_company: string;
  vessel_name: string;
  departure_port: string;
  arrival_port: string;
  departure_date: string;
  estimated_arrival: string;
  current_status: 'loaded_china' | 'sailing' | 'arrived_port' | 'cleared';
}

export interface Order {
  id: string;
  order_number: string;
  client_name: string;
  client_phone: string;
  client_pin: string;
  vehicle: string;
  expand?: {
    vehicle?: Vehicle;
    shipment?: Shipment;
    selected_branch?: Branch;
  };
  customs_regime: 'licence_moudjahidine' | 'individual_under_3_years';
  agreed_price_centimes: number;
  deposit_paid_centimes: number;
  current_step: 1 | 2 | 3 | 4; // 1: Contrat, 2: Conteneur, 3: Port, 4: Livraison
}

export function getVehicleImageUrl(record: Vehicle, filename: string): string {
  if (!filename) return '/images/car-placeholder.jpg';
  return `${POCKETBASE_URL}/api/files/vehicles/${record.id}/${filename}`;
}
