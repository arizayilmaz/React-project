import { useState, type FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ISubscription } from '../../types/types';

interface SubscriptionFormProps {
  onAddSubscription: (subscription: ISubscription) => void;
}

function SubscriptionForm({ onAddSubscription }: SubscriptionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDay, setPaymentDay] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !paymentDay) {
      alert('Please fill in all fields!');
      return;
    }
    onAddSubscription({
      id: uuidv4(),
      name,
      amount: parseFloat(amount),
      paymentDay: parseInt(paymentDay),
    });
    setName('');
    setAmount('');
    setPaymentDay('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2 mb-4 inline-block">
        Add New Subscription
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subscription Name (e.g., Netflix)"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monthly Amount"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <input
          type="number"
          value={paymentDay}
          min="1"
          max="31"
          onChange={(e) => setPaymentDay(e.target.value)}
          placeholder="Payment Day (1-31)"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
      >
        Add Subscription
      </button>
    </form>
  );
}

export default SubscriptionForm;