import { NextRequest, NextResponse } from "next/server";

const mockCredits = [
  {
    id: "1",
    dealNumber: "КД-2024-001",
    clientName: "Иванов Иван Иванович",
    creditAmountRub: 1500000,
    remainingOnDateRub: 1200000,
    remainingAfterYearRub: 800000,
    repaymentMethod: "Аннуитет",
    creditHistory: "Положительная",
  },
  {
    id: "2",
    dealNumber: "КД-2024-002",
    clientName: "Петров Петр Петрович",
    creditAmountRub: 3000000,
    remainingOnDateRub: 2500000,
    remainingAfterYearRub: 1800000,
    repaymentMethod: "Дифференцированный",
    creditHistory: "С негативными эпизодами",
  },
  {
    id: "3",
    dealNumber: "КД-2024-003",
    clientName: "Сидорова Анна Михайловна",
    creditAmountRub: 750000,
    remainingOnDateRub: 600000,
    remainingAfterYearRub: 350000,
    repaymentMethod: "Индивидуальный график",
    creditHistory: "Положительная",
  },
];

const exchangeRates: Record<string, number> = {
  RUB: 1,
  USD: 92.5,
  EUR: 100.75,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dealNumber, date, currency } = body;

    if (!dealNumber || !date || !currency) {
      return NextResponse.json(
        { error: "Не все обязательные поля заполнены" },
        { status: 400 }
      );
    }

    const matchingCredits = mockCredits.filter((credit) =>
      credit.dealNumber.toLowerCase().includes(dealNumber.toLowerCase()) ||
      dealNumber.toLowerCase().includes(credit.id)
    );

    if (matchingCredits.length === 0) {
      return NextResponse.json(
        { error: "Кредитная сделка с таким номером не найдена. Проверьте правильность ввода." },
        { status: 404 }
      );
    }

    const exchangeRate = exchangeRates[currency] || 1;
    const formattedDate = new Date(date).toLocaleDateString("ru-RU");

    const credits = matchingCredits.map((credit) => ({
      id: credit.id,
      clientName: credit.clientName,
      creditAmount: credit.creditAmountRub / exchangeRate,
      remainingOnDate: credit.remainingOnDateRub / exchangeRate,
      remainingAfterYear: credit.remainingAfterYearRub / exchangeRate,
      currency,
      repaymentMethod: credit.repaymentMethod,
      creditHistory: credit.creditHistory,
      exchangeRate,
      exchangeDate: formattedDate,
    }));

    return NextResponse.json({ credits });
  } catch (error) {
    console.error("[v0] Error processing credit request:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке запроса" },
      { status: 500 }
    );
  }
}
