const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  type: { type: String, required: true },
  email: {type: String, required: true},
}, { timestamps: false });

module.exports = model('Transaction', TransactionSchema);
