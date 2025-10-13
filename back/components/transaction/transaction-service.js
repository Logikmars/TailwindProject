const transactionModel = require('./transaction-model');
const userModel = require('../user/user-model');

class TransactionService {
  async postNewTransaction(data) {
    const transaction = await transactionModel.create(data);

    const user = await userModel.findOne({ username: data.email });
    if (!user) throw new Error('User not found');
    
    const amount = Number(data.amount);

    if (data.type === 'Credit') {
        user.balance += amount;
    } else if (data.type === 'Debit') {
        user.balance -= amount;
    }

    await user.save();
    
    const ws = global.WS_CLIENTS.get(data.email);
    if (ws && ws.readyState === 1) {
        ws.send(JSON.stringify({
            type: 'NEW_TRANSACTION',
            payload: {
                transaction,
                balance: user.balance 
            }
        }));
    }

    return transaction;
}

  async getAll(userEmail) {
    const transactions = await transactionModel
      .find({ email: userEmail })
      .sort({ date: -1 });
    console.log('All transaction' + transactions);
    
    return transactions;
  }
}

module.exports = new TransactionService();
