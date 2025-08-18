"use client";
import { useEffect, useState } from "react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.name} - ${exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}