"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpDown, Calendar, Clock, Banknote, Percent, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type OperationType = "payment" | "interest" | "commission";

interface Operation {
  id: string;
  type: OperationType;
  date: string;
  time: string;
  amount: number;
  description: string;
}

const operationTypeLabels: Record<OperationType, string> = {
  payment: "Платеж по кредиту",
  interest: "Начисление процентов",
  commission: "Комиссия",
};

const operationTypeIcons: Record<OperationType, React.ReactNode> = {
  payment: <Banknote className="h-5 w-5" />,
  interest: <Percent className="h-5 w-5" />,
  commission: <Receipt className="h-5 w-5" />,
};

const operationTypeColors: Record<OperationType, string> = {
  payment: "bg-primary text-primary-foreground",
  interest: "bg-amber-500 text-white",
  commission: "bg-slate-500 text-white",
};

function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function HistoryPage() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await fetch("/api/operations");
        const data = await response.json();
        setOperations(data.operations);
      } catch (error) {
        console.error("[v0] Error fetching operations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOperations();
  }, []);

  const sortedOperations = [...operations].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const handleSort = (newSortBy: "date" | "amount") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

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
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">История операций</h1>
                <p className="text-muted-foreground">
                  Все операции по кредитным сделкам
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSort("date")}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  По дате
                  {sortBy === "date" && (
                    <ArrowUpDown className={`h-3 w-3 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
                <Button
                  variant={sortBy === "amount" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSort("amount")}
                  className="gap-2"
                >
                  <Banknote className="h-4 w-4" />
                  По сумме
                  {sortBy === "amount" && (
                    <ArrowUpDown className={`h-3 w-3 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 rounded bg-muted" />
                      <div className="h-3 w-1/4 rounded bg-muted" />
                    </div>
                    <div className="h-6 w-24 rounded bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {sortedOperations.map((operation) => (
                <Card key={operation.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${operationTypeColors[operation.type]}`}>
                      {operationTypeIcons[operation.type]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {operationTypeLabels[operation.type]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(operation.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {operation.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`text-lg font-semibold ${operation.type === "interest" ? "text-amber-600" : "text-foreground"}`}>
                        {operation.type === "interest" ? "+" : "−"} {formatCurrency(operation.amount)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {sortedOperations.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Receipt className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium text-foreground">Операций не найдено</h3>
                    <p className="mt-2 text-muted-foreground">
                      История операций пуста
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
