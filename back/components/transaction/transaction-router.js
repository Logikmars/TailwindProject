const Router = require('express').Router;
const transactionController = require('./transaction-controller');
const authMiddleware = require('../../authMiddleware'); // путь к middleware

const router = new Router();

router.post('/newTransaction', authMiddleware, transactionController.postNewTransaction);
router.get('/all', authMiddleware, transactionController.getAll);

module.exports = router;
