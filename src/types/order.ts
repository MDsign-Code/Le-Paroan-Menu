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

export interface OrderCustomerInfo {
  name: string;
  affiliatorId?: string;
  affiliatorName: string;
  affiliatorPhone?: string;
  phone: string;
  method: OrderMethod;
  address: string;
  orderMealTime: MealTime | 'semua';
  orderTime: string;
  paymentMethod: PaymentMethod;
  additionalNotes: string;
}
