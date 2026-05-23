"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DealForm } from "@/components/deal-form";

export default function DealsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад на главную
              </Link>
            </Button>
            
            <div>
              <h1 className="text-2xl font-bold text-foreground">Поиск информации о сделке</h1>
              <p className="text-muted-foreground">
                Введите параметры для получения расчета по кредитной сделке
              </p>
            </div>
          </div>

          <DealForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
