import React, { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./components/expenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [expense, setExpense] = useLocalStorage('expense', {
    title: "",
    category: "",
    amount: "",
  })
  const [expenses, setExpenses] = useLocalStorage('expenses', expenseData);
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId', '');


  return (
    <div>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} setExpense={setExpense} setEditingRowId={setEditingRowId} />
        </div>
      </main>
    </div>
  );
}
