"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { Separator } from "@/components/ui/separator";
import { sampleProducts, categories, sampleCustomers } from "@/data/sample-data";
import { Product, CartItem, Customer } from "@/lib/types";

export default function POSPage() {
  const [products] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.barcode?.includes(searchQuery)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category.id === selectedCategory);
    }

    // Only show products with stock
    filtered = filtered.filter(product => product.stock > 0);

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: (item.quantity + 1) * item.product.price
                }
              : item
          );
        }
        return prevCart; // Don't add if exceeds stock
      } else {
        return [...prevCart, {
          product,
          quantity: 1,
          subtotal: product.price
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock),
              subtotal: Math.min(quantity, item.product.stock) * item.product.price
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = (subtotal * discount) / 100;
    const tax = (subtotal - discountAmount) * 0.1; // 10% tax
    return {
      subtotal,
      discountAmount,
      tax,
      total: subtotal - discountAmount + tax
    };
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setDiscount(0);
    setCashReceived("");
  };

  const processPayment = () => {
    const { total } = calculateTotal();
    const cash = parseFloat(cashReceived) || 0;
    
    if (paymentMethod === "cash" && cash < total) {
      alert("Uang tidak cukup!");
      return;
    }

    // Simulate payment processing
    alert(`Pembayaran berhasil!\n${paymentMethod === "cash" ? `Kembalian: ${formatCurrency(cash - total)}` : ""}`);
    
    // Generate receipt
    generateReceipt();
    
    // Clear cart
    clearCart();
  };

  const generateReceipt = () => {
    const { subtotal, discountAmount, tax, total } = calculateTotal();
    const receiptData = {
      items: cart,
      customer: selectedCustomer,
      subtotal,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
      timestamp: new Date()
    };
    
    console.log("Receipt generated:", receiptData);
    // In real app, this would generate PDF or print receipt
  };

  const { subtotal, discountAmount, tax, total } = calculateTotal();

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
          <p className="text-gray-600">Sistem kasir toko</p>
        </div>
        {cart.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            🗑️ Kosongkan
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Filters */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <Input
                placeholder="Cari produk atau scan barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
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
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                    {product.stock}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(product.price)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-semibold mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-600">Coba ubah pencarian atau kategori</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cart & Checkout */}
        <div className="space-y-4">
          {/* Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCustomer?.id || ""} onValueChange={(value) => {
                const customer = sampleCustomers.find(c => c.id === value) || null;
                setSelectedCustomer(customer);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Customer (Opsional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tanpa Customer</SelectItem>
                  {sampleCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCustomer && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">{selectedCustomer.name}</p>
                  <p className="text-xs text-gray-600">Poin: {selectedCustomer.loyaltyPoints}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Keranjang
                <Badge variant="secondary">{cart.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-gray-500">Keranjang kosong</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 p-0"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 0)}
                          className="w-12 h-6 text-center text-xs p-0"
                          min="0"
                          max={item.product.stock}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 p-0"
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Checkout */}
          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Discount */}
                <div>
                  <label className="text-sm font-medium">Diskon (%)</label>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                    className="mt-1"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-sm font-medium">Metode Pembayaran</label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">💰 Tunai</SelectItem>
                      <SelectItem value="transfer">🏦 Transfer</SelectItem>
                      <SelectItem value="qris">📱 QRIS</SelectItem>
                      <SelectItem value="debit">💳 Kartu Debit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cash Input */}
                {paymentMethod === "cash" && (
                  <div>
                    <label className="text-sm font-medium">Uang Diterima</label>
                    <Input
                      type="number"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      className="mt-1"
                      placeholder="0"
                    />
                    {cashReceived && parseFloat(cashReceived) >= total && (
                      <p className="text-sm text-green-600 mt-1">
                        Kembalian: {formatCurrency(parseFloat(cashReceived) - total)}
                      </p>
                    )}
                  </div>
                )}

                <Separator />

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Diskon ({discount}%):</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Pajak (10%):</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Process Payment */}
                <Button
                  className="w-full"
                  onClick={processPayment}
                  disabled={paymentMethod === "cash" && (!cashReceived || parseFloat(cashReceived) < total)}
                >
                  🛒 Proses Pembayaran
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}