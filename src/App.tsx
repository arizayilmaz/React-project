import React, { useCallback, useState  } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import type { IExpense, ISubscription } from './types/types';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import SubscriptionForm from './components/SubscriptionForm/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList/SubscriptionList';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard/Dashboard'; // Ensure this import is present
import './index.css';

const buttonBaseStyle = "w-full py-3 px-5 text-left font-semibold rounded-lg transition-all duration-300";
const buttonInactiveStyle = "bg-white text-slate-700 shadow-sm hover:bg-slate-50";
const buttonActiveStyle = "text-white shadow-lg";

function App() {
  const [expenses, setExpenses] = useLocalStorage<IExpense[]>('expenses', []);
  const [subscriptions, setSubscriptions] = useLocalStorage<ISubscription[]>('subscriptions', []);

  const [visibleForm, setVisibleForm] = useState<'subscription' | 'expense' | null>(null);

  const addExpenseHandler = useCallback((expense: IExpense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  }, []);

  const deleteExpenseHandler = useCallback((expenseId: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((exp) => exp.id !== expenseId)
    );
  }, []);

  const addSubscriptionHandler = useCallback((subscription: ISubscription) => {
    setSubscriptions((prevSubs) => [subscription, ...prevSubs]);
    setVisibleForm(null);
  }, []);

  const toggleSubscriptionHandler = useCallback((subscriptionId: string) => {
    const today = new Date();
    const currentCycle = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    setSubscriptions((prevSubs) =>
      prevSubs.map((sub) => {
        if (sub.id === subscriptionId) {
          if (sub.lastPaidCycle === currentCycle) {
            return { ...sub, lastPaidCycle: undefined };
          }
          return { ...sub, lastPaidCycle: currentCycle };
        }
        return sub;
      })
    );
  }, []);

 return (
    <div className="bg-slate-100 min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:grid md:grid-cols-4">
        <div className="p-6 md:p-10 md:col-span-3 border-b md:border-b-0 md:border-r border-slate-200">
          <header className="text-center md:text-left border-b border-slate-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-slate-800">ExpenseFlow</h1>
            <p className="text-md text-slate-500 mt-2">
              Personal Expense and Subscription Tracker
            </p>
          </header>
          <main>
            {/* YENİ: Formları açmak için butonlar ve animasyonlu alan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setVisibleForm(visibleForm === 'subscription' ? null : 'subscription')}
                className={`${buttonBaseStyle} ${visibleForm === 'subscription' ? `${buttonActiveStyle} bg-green-600` : buttonInactiveStyle}`}
              >
                + Add New Subscription
              </button>
              <button
                onClick={() => setVisibleForm(visibleForm === 'expense' ? null : 'expense')}
                className={`${buttonBaseStyle} ${visibleForm === 'expense' ? `${buttonActiveStyle} bg-blue-600` : buttonInactiveStyle}`}
              >
                + Add New Expense
              </button>
            </div>

            <AnimatePresence>
              {visibleForm === 'subscription' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <SubscriptionForm onAddSubscription={addSubscriptionHandler} />
                </motion.div>
              )}
              {visibleForm === 'expense' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ExpenseForm onAddExpense={addExpenseHandler} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Listeler artık formların altında ve her zaman görünür */}
            <hr className="my-8 border-t-2 border-slate-200" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
              <SubscriptionList subscriptions={subscriptions} onToggleSubscription={toggleSubscriptionHandler} />
              <ExpenseList expenses={expenses} onDeleteExpense={deleteExpenseHandler} />
            </div>
          </main>
        </div>

        <aside className="p-6 md:p-10 md:col-span-1 bg-white border-t md:border-t-0 md:border-l border-slate-200">
          <Dashboard subscriptions={subscriptions} expenses={expenses} />
        </aside>
      </div>
    </div>
  );
}

export default App;
