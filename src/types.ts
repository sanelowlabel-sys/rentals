export type GearCategory = 
  | 'all' 
  | 'synthesizers' 
  | 'dj' 
  | 'monitors' 
  | 'interfaces' 
  | 'hardware'
  | 'microphones' 
  | 'pa_sound';

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: GearCategory;
  categoryLabel: string;
  image: string;
  dailyRate: number; // in ZAR
  weekendRate: number; // in ZAR
  weeklyRate: number; // in ZAR
  deposit: number; // in ZAR
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  popular?: boolean;
  tagline: string;
  description: string;
  specs: string[];
  includedAccessories: string[];
  powerRequirement: string;
  idealFor: string;
}

export interface PackageBundle {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  dailyRate: number;
  weekendRate: number;
  regularValue: number;
  savings: number;
  includedItems: string[];
  targetAudience: string;
  features: string[];
}

export interface CartItem {
  gear: GearItem;
  quantity: number;
}

export interface GautengDeliveryZone {
  id: string;
  name: string;
  area: string;
  dispatchTimeMins: string;
  deliveryFee: number; // in ZAR
  isExpressEligible: boolean;
  popularLocations: string[];
}

export interface RentalBookingRequest {
  id: string;
  items: CartItem[];
  startDate: string;
  returnDate: string;
  totalDays: number;
  deliveryType: 'delivery' | 'pickup';
  deliveryZoneId: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  identificationType: 'sa_id' | 'passport';
  idNumber: string;
  productionNameOrCompany?: string;
  requiresLoadSheddingPack: boolean;
  notes?: string;
  subtotal: number;
  deliveryFee: number;
  depositTotal: number;
  grandTotal: number;
  status: 'draft' | 'submitted' | 'confirmed';
}
