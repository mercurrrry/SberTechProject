"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <CreditCard className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Мониторинг кредитных сделок
              </h1>
              <p className="text-sm text-muted-foreground">
                Информационная система
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Главная
            </Link>
            <Link
              href="/history"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              История операций
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
