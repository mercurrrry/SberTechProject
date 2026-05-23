import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Wallet, Calendar, TrendingDown, CreditCard as CreditCardIcon, History } from "lucide-react";

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

interface CreditCardProps {
  credit: CreditData;
}

function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const symbols: Record<string, string> = {
    RUB: "₽",
    USD: "$",
    EUR: "€",
  };
  
  return `${formatter.format(amount)} ${symbols[currency] || currency}`;
}

export function CreditCard({ credit }: CreditCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 pb-3">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{credit.clientName}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CreditCardIcon className="h-4 w-4" />
            Параметры кредита
          </h4>
          
          <div className="space-y-2 rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                Сумма кредита:
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(credit.creditAmount, credit.currency)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Остаток на {credit.exchangeDate}:
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(credit.remainingOnDate, credit.currency)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="h-4 w-4" />
                Остаток через год:
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(credit.remainingAfterYear, credit.currency)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <History className="h-4 w-4" />
            Доп. информация
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Способ погашения:</span>
              <Badge variant="secondary">{credit.repaymentMethod}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Кредитная история:</span>
              <Badge 
                variant={credit.creditHistory === "Положительная" ? "default" : "destructive"}
                className={credit.creditHistory === "Положительная" ? "bg-primary" : ""}
              >
                {credit.creditHistory}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/30 text-xs text-muted-foreground">
        {credit.currency !== "RUB" ? (
          <p>
            Расчет выполнен по курсу ЦБ РФ на {credit.exchangeDate}: 1 {credit.currency} = {credit.exchangeRate.toFixed(4)} RUB
          </p>
        ) : (
          <p>Расчет выполнен в рублях РФ</p>
        )}
      </CardFooter>
    </Card>
  );
}
