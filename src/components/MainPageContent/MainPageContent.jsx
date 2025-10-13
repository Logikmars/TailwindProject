import './MainPageContent.scss';
import { useSelector } from 'react-redux';

export default () => {

    const transactions = useSelector((state) => state.transactions.list);

    if (!transactions.length)
        return <p className="text-gray-400 mt-4">None transaction</p>;

    return (
        <main className='MainPageContent w-screen p-10 flex justify-center'>
          <div className="w-full max-w-xl mt-4 flex flex-wrap justify-center content-start">
            <h2 className="text-4xl font-bold mb-3 text-black text-center w-full">Your transaction</h2>
            <div className="flex flex-col gap-2 w-full pt-2 pb-10 MainPageContent_content">
              {transactions.map((tx) => (
                <div
                  key={tx._id || tx.id}
                  className="bg-black p-3 rounded-lg flex justify-between items-center w-full"
                >
                  <div>
                    <p className="text-white font-medium">
                      {tx.description || 'Без описания'}
                    </p>
                    <p className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString('en-CA')}</p>
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      tx.type === 'Credit' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {tx.type === 'Credit' ? '+' : '-'}
                    {tx.amount}₴
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
    )
}