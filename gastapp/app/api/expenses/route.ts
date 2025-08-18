import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching expenses from the database");   
    
    const expenses = await prisma.expense.findMany();

    const serializableExpenses = expenses.map((expense) => ({
      ...expense,
      ID: expense.ID.toString(),
      ID_ExpenseType: expense.ID_ExpenseType?.toString() ?? null,
    }));

    return NextResponse.json(serializableExpenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Error fetching expenses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newExpense = await prisma.expense.create({
      data: data,
    });

    const serializableExpense = {
        ...newExpense,
        ID: newExpense.ID.toString(),
        ID_ExpenseType: newExpense.ID_ExpenseType?.toString() ?? null,
      };
    return NextResponse.json(serializableExpense, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Error creating expense" }, { status: 500 });
  }
}