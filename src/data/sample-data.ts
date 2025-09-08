import { Product, ProductCategory, Customer, Supplier, DashboardStats, SalesChartData } from '@/lib/types';

export const categories: ProductCategory[] = [
  {
    id: 'makanan',
    name: 'Makanan',
    description: 'Makanan ringan, mi instan, biskuit',
    color: '#ef4444'
  },
  {
    id: 'minuman',
    name: 'Minuman',
    description: 'Minuman kemasan, jus, kopi',
    color: '#3b82f6'
  },
  {
    id: 'kebutuhan-harian',
    name: 'Kebutuhan Harian',
    description: 'Sabun, shampoo, pasta gigi',
    color: '#10b981'
  },
  {
    id: 'bumbu-dapur',
    name: 'Bumbu Dapur',
    description: 'Garam, gula, minyak goreng',
    color: '#f59e0b'
  },
  {
    id: 'rokok',
    name: 'Rokok',
    description: 'Berbagai merk rokok',
    color: '#6b7280'
  }
];

export const sampleProducts: Product[] = [
  // Makanan
  {
    id: 'p001',
    name: 'Indomie Goreng',
    description: 'Mi instan rasa ayam goreng 85g',
    price: 3500,
    cost: 2800,
    stock: 150,
    minStock: 20,
    category: categories[0],
    barcode: '8992388888881',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6827a052-1843-4a41-b329-e91dbc70212f.png',
    supplier: 'PT Indofood',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p002',
    name: 'Chitato Sapi Panggang',
    description: 'Keripik kentang rasa sapi panggang 68g',
    price: 8500,
    cost: 6800,
    stock: 80,
    minStock: 15,
    category: categories[0],
    barcode: '8992388123456',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e9411d9-8448-4b2b-894f-ad6422aa65ea.png',
    supplier: 'PT Indofood',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p003',
    name: 'Biskuit Roma Kelapa',
    description: 'Biskuit kelapa 300g',
    price: 12000,
    cost: 9500,
    stock: 45,
    minStock: 10,
    category: categories[0],
    barcode: '8992761234567',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7689abb5-5341-450d-9ca0-bff8a7f64d63.png',
    supplier: 'PT Mayora',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  // Minuman
  {
    id: 'p004',
    name: 'Aqua Botol 600ml',
    description: 'Air mineral dalam kemasan botol 600ml',
    price: 3000,
    cost: 2200,
    stock: 200,
    minStock: 50,
    category: categories[1],
    barcode: '8992761111111',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/63c0fc85-f72b-4f4d-896b-20192e8c8c26.png',
    supplier: 'PT Aqua Golden Mississippi',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p005',
    name: 'Teh Botol Sosro',
    description: 'Teh dalam kemasan botol 450ml',
    price: 4500,
    cost: 3400,
    stock: 120,
    minStock: 25,
    category: categories[1],
    barcode: '8992822222222',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf8dfe9b-8602-41ce-9448-15325d254331.png',
    supplier: 'PT Sinar Sosro',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p006',
    name: 'Kopi Kapal Api Mix',
    description: 'Kopi instan 3in1 per sachet',
    price: 1500,
    cost: 1100,
    stock: 300,
    minStock: 50,
    category: categories[1],
    barcode: '8992833333333',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/96ad63ef-a1fa-4987-8df4-8669fdb019f4.png',
    supplier: 'PT Santos Jaya Abadi',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  // Kebutuhan Harian
  {
    id: 'p007',
    name: 'Sabun Lifebuoy',
    description: 'Sabun mandi batangan 110g',
    price: 5500,
    cost: 4200,
    stock: 60,
    minStock: 12,
    category: categories[2],
    barcode: '8992844444444',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cecc3348-2331-499e-b39f-b3f067c6ad4f.png',
    supplier: 'PT Unilever Indonesia',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p008',
    name: 'Shampoo Pantene 170ml',
    description: 'Shampoo rambut anti rontok 170ml',
    price: 18500,
    cost: 15000,
    stock: 35,
    minStock: 8,
    category: categories[2],
    barcode: '8992855555555',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f140c513-3cf3-4208-aa8f-9a46e01a81c9.png',
    supplier: 'PT Procter & Gamble',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  // Bumbu Dapur
  {
    id: 'p009',
    name: 'Minyak Goreng Bimoli 1L',
    description: 'Minyak goreng kelapa sawit 1 liter',
    price: 16000,
    cost: 13500,
    stock: 25,
    minStock: 5,
    category: categories[3],
    barcode: '8992866666666',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f32415dd-2383-406e-af38-68fa054b0109.png',
    supplier: 'PT Salim Ivomas Pratama',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p010',
    name: 'Gula Pasir Gulaku 1kg',
    description: 'Gula pasir putih premium 1kg',
    price: 15000,
    cost: 12800,
    stock: 40,
    minStock: 8,
    category: categories[3],
    barcode: '8992877777777',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6ab7d85d-89c3-4f2c-bce4-a5904a5039ed.png',
    supplier: 'PT Sugar Group Companies',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  // Rokok
  {
    id: 'p011',
    name: 'Gudang Garam Filter',
    description: 'Rokok kretek filter isi 12 batang',
    price: 22000,
    cost: 19500,
    stock: 80,
    minStock: 15,
    category: categories[4],
    barcode: '8992888888888',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/205c4e8f-3af0-4be7-a583-390486594659.png',
    supplier: 'PT Gudang Garam',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'p012',
    name: 'Djarum Super',
    description: 'Rokok kretek isi 12 batang',
    price: 20500,
    cost: 18200,
    stock: 65,
    minStock: 12,
    category: categories[4],
    barcode: '8992899999999',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/234222cb-9573-4ba4-8f17-99d76d9b1132.png',
    supplier: 'PT Djarum',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
];

export const sampleCustomers: Customer[] = [
  {
    id: 'c001',
    name: 'Bu Sari',
    phone: '08123456789',
    email: 'sari@email.com',
    address: 'Jl. Mawar No. 15',
    loyaltyPoints: 150,
    totalSpent: 1500000,
    lastVisit: new Date('2024-01-20'),
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'c002',
    name: 'Pak Budi',
    phone: '08234567890',
    address: 'Jl. Melati No. 8',
    loyaltyPoints: 89,
    totalSpent: 890000,
    lastVisit: new Date('2024-01-19'),
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'c003',
    name: 'Ibu Rina',
    phone: '08345678901',
    email: 'rina@email.com',
    address: 'Jl. Kenanga No. 22',
    loyaltyPoints: 234,
    totalSpent: 2340000,
    lastVisit: new Date('2024-01-21'),
    createdAt: new Date('2024-01-03')
  }
];

export const sampleSuppliers: Supplier[] = [
  {
    id: 's001',
    name: 'PT Indofood Sukses Makmur',
    contact: 'Bapak Ahmad',
    phone: '021-5555-1234',
    email: 'ahmad@indofood.co.id',
    address: 'Jakarta Utara',
    products: ['p001', 'p002'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: 's002',
    name: 'PT Unilever Indonesia',
    contact: 'Ibu Sinta',
    phone: '021-5555-5678',
    email: 'sinta@unilever.co.id',
    address: 'Jakarta Barat',
    products: ['p007'],
    createdAt: new Date('2024-01-01')
  }
];

export const dashboardStats: DashboardStats = {
  todaySales: 2450000,
  todayTransactions: 89,
  todayProfit: 567000,
  lowStockItems: 3,
  totalProducts: 12,
  totalCustomers: 156,
  monthlyRevenue: 45600000,
  monthlyGrowth: 12.5
};

export const salesChartData: SalesChartData[] = [
  { date: '2024-01-15', sales: 1800000, profit: 420000, transactions: 65 },
  { date: '2024-01-16', sales: 2100000, profit: 487000, transactions: 72 },
  { date: '2024-01-17', sales: 1950000, profit: 453000, transactions: 68 },
  { date: '2024-01-18', sales: 2300000, profit: 534000, transactions: 81 },
  { date: '2024-01-19', sales: 2200000, profit: 511000, transactions: 76 },
  { date: '2024-01-20', sales: 2450000, profit: 567000, transactions: 89 },
  { date: '2024-01-21', sales: 2350000, profit: 546000, transactions: 84 }
];