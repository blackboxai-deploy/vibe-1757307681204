"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo & Store Name */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TK</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">Toko Kelontong</h1>
            <p className="text-xs text-gray-500">Warung Bu Sari</p>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <Input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Search Button - Mobile only */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => {
              // Toggle search modal on mobile
            }}
          >
            🔍
          </Button>

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Notifikasi</SheetTitle>
                <SheetDescription>
                  Pemberitahuan terbaru dari toko Anda
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Stok Rendah!</p>
                  <p className="text-xs text-red-600">Minyak Goreng Bimoli tersisa 3 pcs</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Penjualan Hari Ini</p>
                  <p className="text-xs text-blue-600">Target tercapai 85%</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Pelanggan Baru</p>
                  <p className="text-xs text-green-600">5 pelanggan baru hari ini</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Profile Menu */}
          <Button variant="ghost" size="sm" className="p-2">
            👤
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      <div className="md:hidden px-4 pb-3">
        <Input
          type="text"
          placeholder="Cari produk, kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
    </header>
  );
}