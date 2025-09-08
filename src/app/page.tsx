"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, salesChartData, sampleProducts } from "@/data/sample-data";
import { DashboardStats, SalesChartData, Product } from "@/lib/types";

export default function DashboardPage() {
  const [stats] = useState<DashboardStats>(dashboardStats);
  const [chartData] = useState<SalesChartData[]>(salesChartData);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulasi load data
    const lowStock = sampleProducts.filter(product => product.stock <= product.minStock);
    setLowStockProducts(lowStock);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const todayData = chartData[chartData.length - 1];
  const salesTarget = 3000000;
  const salesProgress = (todayData.sales / salesTarget) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2">Selamat Datang! 👋</h2>
        <p className="text-blue-100 mb-4">
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{formatCurrency(todayData.sales)}</p>
            <p className="text-blue-100 text-sm">Penjualan Hari Ini</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{todayData.transactions}</p>
            <p className="text-blue-100 text-sm">Transaksi</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress Target</span>
            <span>{Math.round(salesProgress)}%</span>
          </div>
          <Progress value={salesProgress} className="bg-blue-500" />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                💰
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(todayData.profit)}
                </p>
                <p className="text-xs text-gray-500">Profit Hari Ini</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📦
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalProducts}
                </p>
                <p className="text-xs text-gray-500">Total Produk</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                👥
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalCustomers}
                </p>
                <p className="text-xs text-gray-500">Total Customer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                ⚠️
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {lowStockProducts.length}
                </p>
                <p className="text-xs text-gray-500">Stok Rendah</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aksi Cepat</CardTitle>
          <CardDescription>Operasi yang sering digunakan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-16 flex-col space-y-1" variant="outline">
              <span className="text-2xl">💳</span>
              <span className="text-sm">Buka Kasir</span>
            </Button>
            <Button className="h-16 flex-col space-y-1" variant="outline">
              <span className="text-2xl">➕</span>
              <span className="text-sm">Tambah Produk</span>
            </Button>
            <Button className="h-16 flex-col space-y-1" variant="outline">
              <span className="text-2xl">📊</span>
              <span className="text-sm">Cek Stok</span>
            </Button>
            <Button className="h-16 flex-col space-y-1" variant="outline">
              <span className="text-2xl">📈</span>
              <span className="text-sm">Lihat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-red-800 flex items-center space-x-2">
              <span>⚠️</span>
              <span>Peringatan Stok Rendah</span>
            </CardTitle>
            <CardDescription className="text-red-600">
              {lowStockProducts.length} produk memerlukan restock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Sisa: {product.stock} pcs</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Restock
                  </Button>
                </div>
              ))}
              {lowStockProducts.length > 3 && (
                <Button variant="link" className="w-full text-red-600">
                  Lihat {lowStockProducts.length - 3} produk lainnya
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Chart Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performa 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData.slice(-7).map((data, index) => {
              const maxSales = Math.max(...chartData.map(d => d.sales));
              const percentage = (data.sales / maxSales) * 100;
              
              return (
                <div key={data.date} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>
                      {new Date(data.date).toLocaleDateString('id-ID', { 
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="font-medium">{formatCurrency(data.sales)}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Lihat Laporan Lengkap
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}