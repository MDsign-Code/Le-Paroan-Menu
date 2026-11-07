import { MenuItem, MealTime } from '../data/menuData';

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedVariant?: string;
  selectedOption?: string;
  unitPrice: number;
  quantity: number;
  customerNote: string;
}

export type OrderMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'qris' | 'tunai';
export type DeliveryTimingType = 'hari-ini' | 'h-min-1';

export interface OrderCustomerInfo {
  name: string;
  affiliatorId?: string;
  affiliatorName: string;
  affiliatorPhone?: string;
  phone: string;
  method: OrderMethod;
  deliveryTiming: DeliveryTimingType; // 'hari-ini' atau 'h-min-1' (Pesan Antar H-1)
  deliveryDateH1?: string; // Tanggal / hari H-1 yang diinginkan
  address: string;
  orderMealTime: MealTime | 'semua';
  orderTime: string;
  paymentMethod: PaymentMethod;
  additionalNotes: string;
}
