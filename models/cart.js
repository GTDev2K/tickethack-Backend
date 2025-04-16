const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "trips" },
  // total: Number
});

const Cart = mongoose.model("cart", CartSchema);

module.exports = Cart;
