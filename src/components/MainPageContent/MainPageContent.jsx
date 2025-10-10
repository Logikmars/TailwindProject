import './MainPageContent.scss';
import { useSelector } from 'react-redux';

export default () => {

    const transactions = useSelector((state) => state.transactions.list);

    if (!transactions.length)
        return <p className="text-gray-400 mt-4">Нет транзакций</p>;

    return (
        <main className='MainPageContent w-screen p-10'>
<div className="w-full max-w-xl mt-4">
      <h2 className="text-lg font-semibold mb-3">💰 Твои транзакции</h2>
      <div className="flex flex-col gap-2">
        {transactions.map((tx) => (
          <div
            key={tx._id || tx.id}
            className="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-white font-medium">
                {tx.description || 'Без описания'}
              </p>
              <p className="text-sm text-gray-400">{tx.date}</p>
            </div>
            <div
              className={`text-right font-semibold ${
                tx.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {tx.type === 'income' ? '+' : '-'}
              {tx.amount}₴
            </div>
          </div>
        ))}
      </div>
    </div>
        </main>
    )
}