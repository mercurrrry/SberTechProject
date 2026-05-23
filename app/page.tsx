"use client";

import Link from "next/link";
import { Search, History, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 items-center justify-center border-b border-border bg-gradient-to-b from-secondary to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Мониторинг кредитных сделок
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Единый инструмент для быстрого получения информации о состоянии кредитных сделок с автоматическим пересчетом валюты по курсу ЦБ РФ
              </p>
              
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/deals">
                    <Search className="h-5 w-5" />
                    Получение информации о сделке
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link href="/history">
                    <History className="h-5 w-5" />
                    Просмотр истории операций
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
