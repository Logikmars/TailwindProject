const transactionModel = require('./transaction-model');

class TransactionService {
  async postNewTransaction(data) {
    const { amount, date, description, type, email } = data;

    const transaction = await transactionModel.create({
      amount,
      date,
      description,
      type,
      email,
    });
    // тут при добавлении по вебсокету отправлять её на фронт
    return transaction;
  }
    
    async getAll(userEmail) {
        // тут получать все транзакции у которых email === userEmail и отдавать по вебскету
  }
}

module.exports = new TransactionService();
