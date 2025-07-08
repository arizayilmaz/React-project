import type { IExpense, ISubscription } from '../../types/types';
import { FaFileInvoiceDollar, FaReceipt, FaCoins } from 'react-icons/fa';

interface DashboardProps {
  subscriptions: ISubscription[];
  expenses: IExpense[];
}

const formatCurrency = (amount: number) => {
  return amount.toFixed(2) + ' TL';
};

function Dashboard({ subscriptions, expenses }: DashboardProps) {
  const totalSubscriptionCost = subscriptions.reduce(
    (sum, sub) => sum + sub.amount,
    0
  );

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const totalMonthlyExpense = monthlyExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const grandTotal = totalSubscriptionCost + totalMonthlyExpense;

  return (
    // DÜZENLEME: Arka planı ve genel yapıyı güncelliyoruz.
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm h-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Summary</h3>
      <div className="flex flex-col space-y-4">

        {/* Stat Card 1: Abonelikler */}
        <div className="flex items-start p-4 bg-slate-50 rounded-lg">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaFileInvoiceDollar className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">Subscriptions</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {formatCurrency(totalSubscriptionCost)}
            </p>
          </div>
        </div>

        {/* Stat Card 2: Bu Ayki Harcamalar */}
        <div className="flex items-start p-4 bg-slate-50 rounded-lg">
          <div className="p-3 bg-orange-100 rounded-full">
            <FaReceipt className="h-5 w-5 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">This Month's Expenses</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {formatCurrency(totalMonthlyExpense)}
            </p>
          </div>
        </div>

        {/* Stat Card 3: Toplam Gider */}
        <div className="flex items-start p-4 bg-slate-50 rounded-lg">
          <div className="p-3 bg-red-100 rounded-full">
            <FaCoins className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">Total Spending</p>
            <p className="text-2xl font-bold text-red-700 mt-1">
              {formatCurrency(grandTotal)}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;