export type EquipmentCategory = 
  | 'Synths & FX'
  | 'Studio Monitors'
  | 'DJ Gear'
  | 'Audio Interfaces & MIDI'
  | 'Studio Bundles'
  | 'Accessories & DI';

export interface Equipment {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: EquipmentCategory;
  description: string;
  dailyPriceZar: number;
  weekendPriceZar: number;
  depositZar: number;
  stockQuantity: number;
  availableQuantity: number;
  condition: string;
  imageUrl: string;
  bundleDetails?: string;
  specs: Record<string, string>;
  tags: string[];
  isFeatured?: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  suburb?: string;
  city?: string;
  postalCode?: string;
  streetAddress?: string;
  rewardCredits: number; // ZAR loyalty credits (SoundCoins)
  role: 'USER' | 'STUDIO_MANAGER' | 'ADMIN';
}

export type RentalStatus = 
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'RETURNED'
  | 'CANCELLED';

export interface TrackingStep {
  stage: RentalStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface RentalOrderItem {
  equipmentId: string;
  equipment: Equipment;
  quantity: number;
  dailyPriceZar: number;
  totalPriceZar: number;
}

export interface RentalOrder {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: RentalStatus;
  deliveryType: 'DELIVERY' | 'HUB_COLLECTION';
  startDate: string;
  endDate: string;
  durationDays: number;
  dailySubtotalZar: number;
  deliveryFeeZar: number;
  discountZar: number;
  depositTotalZar: number;
  totalZar: number;
  paymentMethod: 'PAYFAST' | 'OZOW' | 'CREDIT_CARD' | 'SNAPSCAN';
  paymentStatus: 'PAID' | 'PENDING';
  paymentReference: string;
  // Gauteng destination
  deliveryAddress: string;
  deliverySuburb: string;
  deliveryCity: string;
  deliveryPostalCode: string;
  deliveryInstructions?: string;
  hubLocation?: string;
  // Dispatch details
  courierName: string;
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
  currentLocationLat?: number;
  currentLocationLng?: number;
  estimatedDeliveryTime?: string;
  items: RentalOrderItem[];
  timeline: TrackingStep[];
  currentStageIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  equipmentId: string;
  equipment: Equipment;
  addedAt: string;
}

export interface GautengLocationValidation {
  valid: boolean;
  suburb: string;
  city: string;
  postalCode: string;
  deliveryFeeZar: number;
  estimatedTransitTime: string;
  hubSource: string;
  message?: string;
}

export interface DashboardStats {
  activeRentalsCount: number;
  totalRentalsCount: number;
  rewardCreditsZar: number;
  wishlistCount: number;
  nextScheduledReturn?: string;
}
