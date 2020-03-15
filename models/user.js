const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const userSchema = new mongooseSchema({
  name: String,
  email: String,
  password: String,
  phone_no: String,
  wallets: [{type: mongooseSchema.Types.ObjectId, ref: 'Wallet'}]
});

module.exports = mongoose.model('User',userSchema);

userSchema.methods.addNewWallet = function() {
  this.cart = { items: [] };
  return this.save();
};
