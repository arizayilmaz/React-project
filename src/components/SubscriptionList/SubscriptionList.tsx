import type { ISubscription } from '../../types/types';

const getSubscriptionStatus = (subscription: ISubscription, today: Date) => {
  const currentCycle = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  if (!subscription.paymentDay) {
    return {
      label: 'Payment Day Not Set',
      colorClass: 'text-gray-500 border-gray-300',
      isPaid: false,
    };
  }

  // FIX: Create a new Date object for this month's payment date.
  const paymentDateThisMonth = new Date(today.getFullYear(), today.getMonth(), subscription.paymentDay);
  const isPaidThisCycle = subscription.lastPaidCycle === currentCycle;

  if (isPaidThisCycle) {
    return { label: 'Paid', colorClass: 'text-green-600 border-green-500', isPaid: true };
  }

  // FIX: Create a new Date object for today to avoid mutation.
  const todayWithoutTime = new Date();
  todayWithoutTime.setHours(0, 0, 0, 0);

  if (todayWithoutTime > paymentDateThisMonth) {
    return { label: 'Overdue', colorClass: 'text-red-600 border-red-500', isPaid: false };
  }

  if (todayWithoutTime.getTime() === paymentDateThisMonth.getTime()) {
    return { label: 'Due Today', colorClass: 'text-yellow-600 border-yellow-500', isPaid: false };
  }

  return { label: 'Pending', colorClass: 'text-gray-800 border-gray-300', isPaid: false };
};

interface SubscriptionListProps {
  subscriptions: ISubscription[];
  onToggleSubscription: (id: string) => void;
}

function SubscriptionList({ subscriptions, onToggleSubscription }: SubscriptionListProps) {
  const today = new Date();

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2 mb-4 inline-block">
        Monthly Subscriptions
      </h3>
      {subscriptions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No subscriptions added yet.</p>
      ) : (
        <div className="space-y-3">
          {subscriptions.map((sub) => {
            const status = getSubscriptionStatus(sub, today);
            return (
              <div
                    key={sub.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${status.colorClass} bg-white hover:shadow-md hover:border-transparent`}
                >
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={status.isPaid}
                            onChange={() => onToggleSubscription(sub.id)}
                            // DÜZENLEME: Checkbox'ı daha belirgin hale getiriyoruz.
                            className="h-5 w-5 rounded border-slate-300 text-green-600 focus:ring-green-500 cursor-pointer"
                        />
                        <div className="ml-4">
                            <p className="font-semibold text-slate-800">{sub.name}</p>
                            <p className={`text-xs font-medium ${status.colorClass}`}>{status.label}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-slate-800">{sub.amount.toFixed(2)} TL</p>
                        <p className="text-xs text-slate-400">Day {sub.paymentDay} of Month</p>
                    </div>
                </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SubscriptionList;