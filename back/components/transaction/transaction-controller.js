const transactionService = require('./transaction-service');

class TransactionController {
  async getAll(req, res, next) {
    try {
      const userEmail = req.user.email;
      const transactions = await transactionService.getAll(userEmail);
      res.json(transactions); // возвращаем транзакции через REST
    } catch (e) {
      next(e);
    }
  }

  async postNewTransaction(req, res, next) {
    try {
      const userEmail = req.user.email;
      const transactionData = { ...req.body, email: userEmail };

      const transaction = await transactionService.postNewTransaction(transactionData);
      res.json(transaction);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TransactionController();
