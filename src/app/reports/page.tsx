"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { salesChartData, sampleProducts, dashboardStats } from "@/data/sample-data";
import { SalesChartData, Product, DashboardStats } from "@/lib/types";

export default function ReportsPage() {
  const [chartData] = useState<SalesChartData[]>(salesChartData);
  const [products] = useState<Product[]>(sampleProducts);
  const [stats] = useState<DashboardStats>(dashboardStats);
  const [dateRange, setDateRange] = useState<string>("7days");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Calculate top selling products (simulated)
  const topProducts = products
    .map(product => ({
      ...product,
      soldQuantity: Math.floor(Math.random() * 50) + 10, // Simulated sales
      revenue: product.price * (Math.floor(Math.random() * 50) + 10)
    }))
    .sort((a, b) => b.soldQuantity - a.soldQuantity)
    .slice(0, 10);

  // Calculate category performance
  const categoryPerformance = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    const soldQuantity = Math.floor(Math.random() * 30) + 5;
    const revenue = product.price * soldQuantity;
    
    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        revenue: 0,
        quantity: 0,
        products: 0,
        color: product.category.color
      };
    }
    
    acc[categoryName].revenue += revenue;
    acc[categoryName].quantity += soldQuantity;
    acc[categoryName].products += 1;
    
    return acc;
  }, {} as Record<string, any>);

  const categoryStats = Object.values(categoryPerformance).sort((a: any, b: any) => b.revenue - a.revenue);

  const totalRevenue = chartData.reduce((sum, data) => sum + data.sales, 0);
  const totalProfit = chartData.reduce((sum, data) => sum + data.profit, 0);
  const totalTransactions = chartData.reduce((sum, data) => sum + data.transactions, 0);
  const avgTransactionValue = totalRevenue / totalTransactions;

  const profitMargin = (totalProfit / totalRevenue) * 100;

  const exportReport = (type: string) => {
    // Simulate export functionality
    const reportData = {
      period: dateRange,
      totalRevenue,
      totalProfit,
      totalTransactions,
      profitMargin,
      topProducts: topProducts.slice(0, 5),
      categoryStats,
      generatedAt: new Date().toISOString()
    };
    
    console.log(`Exporting ${type} report:`, reportData);
    alert(`Laporan ${type} berhasil diekspor! (Demo)`);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="text-gray-600">Analisis performa bisnis toko</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('Excel')}>
            📊 Export Excel
          </Button>
          <Button variant="outline" onClick={() => exportReport('PDF')}>
            📄 Export PDF
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Periode Laporan:</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Penjualan</TabsTrigger>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    💰
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(totalRevenue)}
                    </p>
                    <p className="text-xs text-gray-500">Total Penjualan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    📈
                  </div>
                  <div>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency(totalProfit)}
                    </p>
                    <p className="text-xs text-gray-500">Total Profit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    🛒
                  </div>
                  <div>
                    <p className="text-xl font-bold text-purple-600">
                      {formatNumber(totalTransactions)}
                    </p>
                    <p className="text-xs text-gray-500">Transaksi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    📊
                  </div>
                  <div>
                    <p className="text-xl font-bold text-orange-600">
                      {profitMargin.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">Margin Profit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Grafik Performa Harian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData.map((data, index) => {
                  const maxSales = Math.max(...chartData.map(d => d.sales));
                  const maxProfit = Math.max(...chartData.map(d => d.profit));
                  const salesPercentage = (data.sales / maxSales) * 100;
                  const profitPercentage = (data.profit / maxProfit) * 100;
                  
                  return (
                    <div key={data.date} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {new Date(data.date).toLocaleDateString('id-ID', { 
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            {formatCurrency(data.sales)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.transactions} transaksi
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Penjualan</span>
                          <span>{formatCurrency(data.sales)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${salesPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Profit</span>
                          <span>{formatCurrency(data.profit)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${profitPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          {/* Sales Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Penjualan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Rata-rata per Transaksi:</span>
                  <span className="font-semibold">{formatCurrency(avgTransactionValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaksi Terbanyak:</span>
                  <span className="font-semibold">
                    {Math.max(...chartData.map(d => d.transactions))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Penjualan Tertinggi:</span>
                  <span className="font-semibold">
                    {formatCurrency(Math.max(...chartData.map(d => d.sales)))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Growth Rate:</span>
                  <Badge className="bg-green-500">+{stats.monthlyGrowth}%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performa Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryStats.slice(0, 5).map((category: any, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatCurrency(category.revenue)}</p>
                        <p className="text-xs text-gray-500">{category.quantity} terjual</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Produk Terlaris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.slice(0, 10).map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{product.soldQuantity} terjual</p>
                      <p className="text-sm text-green-600">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Produk:</span>
                    <Badge variant="outline">{products.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stok Rendah:</span>
                    <Badge className="bg-yellow-500">
                      {products.filter(p => p.stock <= p.minStock && p.stock > 0).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stok Habis:</span>
                    <Badge className="bg-red-500">
                      {products.filter(p => p.stock === 0).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nilai Total Stok:</span>
                    <span className="font-semibold">
                      {formatCurrency(products.reduce((sum, p) => sum + (p.stock * p.cost), 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produk Butuh Restock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {products
                    .filter(p => p.stock <= p.minStock)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-gray-600">
                              Sisa: {product.stock} | Min: {product.minStock}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={product.stock === 0 ? 'bg-red-500' : 'bg-yellow-500'}
                        >
                          {product.stock === 0 ? 'Habis' : 'Rendah'}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}