const transactionModel = require('./transaction-model');

class TransactionService {
  async postNewTransaction(data) {
    const transaction = await transactionModel.create(data);

    // Отправляем новую транзакцию по WebSocket
    const ws = global.WS_CLIENTS.get(data.email);
    if (ws && ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'NEW_TRANSACTION', payload: transaction }));
    }

    return transaction;
  }

  async getAll(userEmail) {
    const transactions = await transactionModel
      .find({ email: userEmail })
      .sort({ date: -1 });

    return transactions;
  }
}

module.exports = new TransactionService();
