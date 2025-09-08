// Types untuk aplikasi toko kelontong

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  category: ProductCategory;
  barcode?: string;
  image: string;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastVisit: Date;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  cashierId: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email?: string;
  address: string;
  products: string[]; // Product IDs
  createdAt: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  reference?: string; // Transaction ID atau Purchase Order ID
  createdAt: Date;
  userId: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  status: PurchaseOrderStatus;
  totalAmount: number;
  orderDate: Date;
  expectedDate?: Date;
  receivedDate?: Date;
  notes?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface DailySales {
  date: string;
  totalSales: number;
  totalTransactions: number;
  totalProfit: number;
  topProducts: {
    productId: string;
    productName: string;
    quantitySold: number;
    revenue: number;
  }[];
}

export interface StoreSettings {
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeEmail: string;
  taxRate: number;
  currency: string;
  receiptFooter: string;
  loyaltyPointsRate: number; // points per rupiah spent
}

// Enums
export type PaymentMethod = 'cash' | 'transfer' | 'qris' | 'debit' | 'credit';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PurchaseOrderStatus = 'draft' | 'sent' | 'confirmed' | 'received' | 'cancelled';

// Dashboard Stats
export interface DashboardStats {
  todaySales: number;
  todayTransactions: number;
  todayProfit: number;
  lowStockItems: number;
  totalProducts: number;
  totalCustomers: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
}

// Chart data types
export interface SalesChartData {
  date: string;
  sales: number;
  profit: number;
  transactions: number;
}

export interface CategorySalesData {
  category: string;
  sales: number;
  percentage: number;
}

export interface TopProductData {
  name: string;
  quantity: number;
  revenue: number;
}