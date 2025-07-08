import { useState, type FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { IExpense } from "../../types/types";

interface ExpenseFormProps {
    onAddExpense: (expense: IExpense) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!description || !amount) {
            alert("Please fill in all fields!");
            return;
        }
        onAddExpense({
            id: uuidv4(),
            description,
            amount: parseFloat(amount),
            date: new Date().toISOString(),
        });
        setDescription("");
        setAmount("");
    };
  return (
    <form onSubmit={handleSubmit} className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4 inline-block">
           Add New Expense
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
            <input 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Expense Description"
                className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
            <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Expense Amount"
                className="w-full sm:w-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
                Add Expense
            </button>
        </div>
    </form>
  );
}

export default ExpenseForm;