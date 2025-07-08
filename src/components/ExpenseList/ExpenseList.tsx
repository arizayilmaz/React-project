import type { IExpense } from '../../types/types';

interface ExpenseListProps {
  expenses: IExpense[];
  onDeleteExpense: (id: string) => void;
}

function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4 inline-block">
        One-Time Expenses
      </h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No one-time expenses added yet.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <span className="text-gray-800">{expense.description}</span>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">
                  {expense.amount.toFixed(2)} TL
                </span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;