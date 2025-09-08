"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { sampleProducts } from "@/data/sample-data";
import { Product } from "@/lib/types";

export default function InventoryPage() {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: "Habis", color: "red", severity: "critical" };
    if (product.stock <= product.minStock) return { label: "Rendah", color: "yellow", severity: "warning" };
    return { label: "Aman", color: "green", severity: "good" };
  };

  const getStockPercentage = (product: Product) => {
    const maxStock = product.minStock * 3; // Assume 3x minimum as full stock
    return Math.min((product.stock / maxStock) * 100, 100);
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const status = getStockStatus(product);
      const matchesFilter = filterStatus === "all" || 
                          (filterStatus === "low" && status.severity === "warning") ||
                          (filterStatus === "out" && status.severity === "critical") ||
                          (filterStatus === "good" && status.severity === "good");
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "stock-low":
          return a.stock - b.stock;
        case "stock-high":
          return b.stock - a.stock;
        case "category":
          return a.category.name.localeCompare(b.category.name);
        default:
          return 0;
      }
    });

  const stockStats = {
    total: products.length,
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
    goodStock: products.filter(p => p.stock > p.minStock).length,
    totalValue: products.reduce((sum, p) => sum + (p.stock * p.cost), 0)
  };

  const criticalProducts = products.filter(p => p.stock <= p.minStock).slice(0, 5);

  const handleStockAdjustment = (productId: string, newStock: number) => {
    // In real app, this would update the database
    console.log(`Adjusting stock for ${productId} to ${newStock}`);
    alert(`Stok berhasil diperbarui! (Demo)`);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Kelola stok dan persediaan toko</p>
        </div>
        <Button>
          📥 Stock In
        </Button>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📦
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stockStats.total}</p>
                <p className="text-xs text-gray-500">Total Produk</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                ✅
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stockStats.goodStock}</p>
                <p className="text-xs text-gray-500">Stok Aman</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                ⚠️
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stockStats.lowStock}</p>
                <p className="text-xs text-gray-500">Stok Rendah</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                🚫
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stockStats.outOfStock}</p>
                <p className="text-xs text-gray-500">Stok Habis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Inventory Value */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Nilai Inventory</h3>
              <p className="text-sm text-gray-600">Berdasarkan harga modal</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(stockStats.totalValue)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Stock Alerts */}
      {criticalProducts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTitle className="text-red-800 flex items-center space-x-2">
            <span>🚨</span>
            <span>Peringatan Stok Kritis!</span>
          </AlertTitle>
          <AlertDescription className="text-red-700">
            <div className="mt-2 space-y-2">
              {criticalProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-white p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">Sisa: {product.stock} | Min: {product.minStock}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Cari produk atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="good">Stok Aman</SelectItem>
                <SelectItem value="low">Stok Rendah</SelectItem>
                <SelectItem value="out">Stok Habis</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama A-Z</SelectItem>
                <SelectItem value="stock-low">Stok Terendah</SelectItem>
                <SelectItem value="stock-high">Stok Tertinggi</SelectItem>
                <SelectItem value="category">Kategori</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Product Inventory List */}
      <div className="space-y-3">
        {filteredProducts.map((product) => {
          const status = getStockStatus(product);
          const percentage = getStockPercentage(product);
          
          return (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <Badge 
                          variant="outline"
                          style={{ backgroundColor: product.category.color + '20' }}
                        >
                          {product.category.name}
                        </Badge>
                      </div>
                      <Badge 
                        className={`${
                          status.color === 'red' ? 'bg-red-500' :
                          status.color === 'yellow' ? 'bg-yellow-500' :
                          'bg-green-500'
                        } text-white`}
                      >
                        {status.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Stok Saat Ini</p>
                        <p className="font-semibold text-lg">{product.stock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stok Minimum</p>
                        <p className="font-medium">{product.minStock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Harga Modal</p>
                        <p className="font-medium">{formatCurrency(product.cost)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Nilai Total</p>
                        <p className="font-medium">{formatCurrency(product.stock * product.cost)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Level Stok</span>
                        <span>{Math.round(percentage)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newStock = prompt(`Masukkan stok baru untuk ${product.name}:`, product.stock.toString());
                        if (newStock && !isNaN(parseInt(newStock))) {
                          handleStockAdjustment(product.id, parseInt(newStock));
                        }
                      }}
                    >
                      📝 Adjust
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const additionalStock = prompt(`Tambah stok untuk ${product.name}:`, "10");
                        if (additionalStock && !isNaN(parseInt(additionalStock))) {
                          handleStockAdjustment(product.id, product.stock + parseInt(additionalStock));
                        }
                      }}
                    >
                      ➕ Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada produk</h3>
            <p className="text-gray-600">Coba ubah filter atau pencarian</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}