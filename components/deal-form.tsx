"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CreditCard } from "./credit-card";

interface CreditData {
  id: string;
  clientName: string;
  creditAmount: number;
  remainingOnDate: number;
  remainingAfterYear: number;
  currency: string;
  repaymentMethod: string;
  creditHistory: string;
  exchangeRate: number;
  exchangeDate: string;
}

export function DealForm() {
  const [dealNumber, setDealNumber] = useState("");
  const [date, setDate] = useState<Date>();
  const [currency, setCurrency] = useState("RUB");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creditData, setCreditData] = useState<CreditData[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dealNumber.trim()) {
      setError("Введите номер сделки");
      return;
    }
    
    if (!date) {
      setError("Выберите дату расчета");
      return;
    }

    setLoading(true);
    setError(null);
    setCreditData(null);

    try {
      const response = await fetch("/api/credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dealNumber,
          date: format(date, "yyyy-MM-dd"),
          currency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Произошла ошибка при получении данных");
        return;
      }

      setCreditData(data.credits);
    } catch {
      setError("Не удалось подключиться к серверу. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="dealNumber">Номер сделки</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="dealNumber"
                placeholder="Введите номер..."
                value={dealNumber}
                onChange={(e) => setDealNumber(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Дата расчета</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Валюта</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите валюту" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RUB">RUB (Рубль)</SelectItem>
                <SelectItem value="USD">USD (Доллар)</SelectItem>
                <SelectItem value="EUR">EUR (Евро)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Загрузка...
            </>
          ) : (
            "Получить расчет"
          )}
        </Button>
      </form>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {creditData && creditData.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Результаты поиска
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {creditData.map((credit) => (
              <CreditCard key={credit.id} credit={credit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
