const transactionService = require('./transaction-service');

class TransactionController {
  async postNewTransaction(req, res, next) {
    try {
      const userEmail = req.user.email;
      const transactionData = { ...req.body, email: userEmail };

      const transaction = await transactionService.postNewTransaction(transactionData);
      return res.json(transaction);
    } catch (e) {
      next(e);
    }
  }
    
    async getAll(req, res, nex) {
        try {
            const userEmail = req.user.email;
            const transactions = await transactionService.getAll(userEmail);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TransactionController();
