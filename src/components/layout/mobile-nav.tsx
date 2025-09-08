"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: "🏠",
    description: "Ringkasan"
  },
  {
    href: "/products",
    label: "Produk",
    icon: "📦",
    description: "Katalog"
  },
  {
    href: "/pos",
    label: "Kasir",
    icon: "💳",
    description: "POS"
  },
  {
    href: "/inventory",
    label: "Stok",
    icon: "📊",
    description: "Inventory"
  },
  {
    href: "/reports",
    label: "Laporan",
    icon: "📈",
    description: "Analytics"
  }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors",
                "hover:bg-gray-50 active:bg-gray-100",
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600"
              )}
            >
              <span className="text-lg" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}