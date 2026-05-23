import { NextResponse } from "next/server";

const mockOperations = [
  {
    id: "op-001",
    type: "payment" as const,
    date: "2026-05-20",
    time: "14:30",
    amount: 25000,
    description: "Ежемесячный платеж",
  },
  {
    id: "op-002",
    type: "interest" as const,
    date: "2026-05-19",
    time: "00:00",
    amount: 3500,
    description: "Начисление процентов за май",
  },
  {
    id: "op-003",
    type: "commission" as const,
    date: "2026-05-15",
    time: "10:15",
    amount: 500,
    description: "Комиссия за обслуживание",
  },
  {
    id: "op-004",
    type: "payment" as const,
    date: "2026-04-20",
    time: "16:45",
    amount: 25000,
    description: "Ежемесячный платеж",
  },
  {
    id: "op-005",
    type: "interest" as const,
    date: "2026-04-19",
    time: "00:00",
    amount: 3800,
    description: "Начисление процентов за апрель",
  },
  {
    id: "op-006",
    type: "payment" as const,
    date: "2026-03-20",
    time: "11:20",
    amount: 25000,
    description: "Ежемесячный платеж",
  },
  {
    id: "op-007",
    type: "interest" as const,
    date: "2026-03-19",
    time: "00:00",
    amount: 4100,
    description: "Начисление процентов за март",
  },
  {
    id: "op-008",
    type: "commission" as const,
    date: "2026-03-01",
    time: "09:00",
    amount: 1000,
    description: "Комиссия за досрочное погашение",
  },
  {
    id: "op-009",
    type: "payment" as const,
    date: "2026-02-20",
    time: "13:55",
    amount: 50000,
    description: "Частичное досрочное погашение",
  },
  {
    id: "op-010",
    type: "payment" as const,
    date: "2026-02-20",
    time: "13:50",
    amount: 25000,
    description: "Ежемесячный платеж",
  },
  {
    id: "op-011",
    type: "interest" as const,
    date: "2026-02-19",
    time: "00:00",
    amount: 4400,
    description: "Начисление процентов за февраль",
  },
  {
    id: "op-012",
    type: "payment" as const,
    date: "2026-01-20",
    time: "15:30",
    amount: 25000,
    description: "Ежемесячный платеж",
  },
];

export async function GET() {
  try {
    return NextResponse.json({ operations: mockOperations });
  } catch (error) {
    console.error("[v0] Error fetching operations:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при получении операций" },
      { status: 500 }
    );
  }
}
