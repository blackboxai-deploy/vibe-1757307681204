"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleProducts, categories } from "@/data/sample-data";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category.id === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: "Habis", color: "red" };
    if (product.stock <= product.minStock) return { label: "Rendah", color: "yellow" };
    return { label: "Tersedia", color: "green" };
  };

  const calculateProfit = (product: Product) => {
    return product.price - product.cost;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
          <p className="text-gray-600">Kelola katalog produk toko</p>
        </div>
        <Link href="/products/add">
          <Button>
            ➕ Tambah Produk
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Search */}
          <Input
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama A-Z</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="stock">Stok Terbanyak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            <p className="text-sm text-gray-600">Total Produk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{categories.length}</p>
            <p className="text-sm text-gray-600">Kategori</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.stock <= p.minStock && p.stock > 0).length}
            </p>
            <p className="text-sm text-gray-600">Stok Rendah</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </p>
            <p className="text-sm text-gray-600">Habis</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product);
          const profit = calculateProfit(product);
          
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    stockStatus.color === 'red' ? 'bg-red-500' :
                    stockStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-green-500'
                  } text-white`}
                >
                  {stockStatus.label}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      style={{ backgroundColor: product.category.color + '20', 
                              borderColor: product.category.color }}
                    >
                      {product.category.name}
                    </Badge>
                    <span className="text-sm text-gray-500">Stok: {product.stock}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Harga Jual:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Modal:</span>
                      <span className="text-sm text-gray-700">
                        {formatCurrency(product.cost)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profit:</span>
                      <span className="font-medium text-blue-600">
                        {formatCurrency(profit)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      ✏️ Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="flex-1">
                    📊 Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-6xl">📦</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tidak ada produk</h3>
                <p className="text-gray-600">
                  {searchQuery || selectedCategory !== "all" 
                    ? "Coba ubah kriteria pencarian atau filter"
                    : "Mulai dengan menambahkan produk pertama"
                  }
                </p>
              </div>
              <Link href="/products/add">
                <Button>
                  ➕ Tambah Produk
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}