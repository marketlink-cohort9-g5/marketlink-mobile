//USER ROLES
export type UserRole = "retailer" | "wholesaler";

//ORDER STATUS
export type OrderStatus =
  | "Placed"
  | "Accepted"
  | "Adjusted"
  | "Confirmed"
  | "Ready"
  | "Dispatched"
  | "Collected"
  | "Completed"
  | "Declined"
  | "Cancelled"
  | "Expired";

//PAYMENT STATUS
export type PaymentStatus =
  | "Unpaid"
  | "ReceiptUploaded"
  | "PaymentConfirmed"
  | "ReceiptRejected";

//FULFILMENT
export type Fulfilment = "pickup" | "delivery";

//USER
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  isVerified: boolean;
}

//RETAILER PROFILE
export interface RetailerProfile {
  id: string;
  userId: string;
  shopName: string;
  marketLocation: string;
}

//WHOLESALER PROFILE
export interface WholsalerProfile {
  id: string;
  userId: string;
  storeName: string;
  marketLocation: string;
  deliveryZones: string[];
  verified: boolean;
  rating: number;
}

//PRODUCT
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl?: string;
  updatedAt: string;
}

// PACK SIZE
export type PackUnit =
  | "bag"
  | "kg"
  | "litre"
  | "paintBucket"
  | "carton"
  | "crate";

export interface PackSize {
  id: string;
  productId: string;
  unit: PackUnit;
  quantity: number;
  label: string;
}

// WHOLESALER
export interface Wholesaler {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  location: string;
  distanceKm: number;
  deliveryZones: string[];
}

// STORE PRODUCT
export interface StoreProduct {
  id: string;
  wholesalerId: string;
  productId: string;
  packSizeId: string;
  price: number;
  pricePerUnit: number;
  moq: number;
  stock: "In Stock" | "Low Stock" | "Out of Stock";
  updatedAt: string;
}

// CART ITEM
export interface CartItem {
  id: string;
  wholesalerId: string;
  storeProductId: string;
  productName: string;
  packLabel: string;
  quantity: number;
  unitPrice: number;
}

// ORDER ITEM
export interface OrderItem {
  id: string;
  storeProductId: string;
  name: string;
  packLabel: string;
  quantity: number;
  adjustedQuantity?: number;
  unitPrice: number;
}

// ORDER HISTORY
export interface OrderHistory {
  status: OrderStatus;
  note?: string;
  timestamp: string;
}

// ORDER
export interface Order {
  id: string;
  wholesalerId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  fulfilment: Fulfilment;
  adjustedItems?: OrderItem[];
  deliveryFee: number;
  eta?: string;
  timeSlot?: string;
  history: OrderHistory[];
  createdAt: string;
  updatedAt: string;
}

// REVIEW
export interface Review {
  id: string;
  retailerId: string;
  wholesalerId: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// NOTIFICATION
export interface AppNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  route?: string;
  read: boolean;
  createdAt: string;
}
