const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const walletSchema = new mongooseSchema({
  user_id: { 
    type: mongooseSchema.Types.ObjectId, 
    ref: 'User',},
  current_balance: {
    type: Number, 
    default: 100},
  currency: {
    type: String, 
    default: "Rupees"}
});

module.exports = mongoose.model('Wallet',walletSchema);