import { MenuItem, DayOfWeek, MealType } from '../data/menuData';

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedVariant?: string;
  selectedOption?: string;
  unitPrice: number;
  quantity: number;
  customerNote: string;
}

export type OrderMethod = 'pickup' | 'delivery';
export type PaymentMethod = 'qris' | 'tunai';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  method: OrderMethod;
  address: string;
  orderDay: DayOfWeek | 'hari-ini';
  orderTime: string;
  paymentMethod: PaymentMethod;
  additionalNotes: string;
}
