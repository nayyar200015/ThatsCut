const mongoose = require("mongoose");
const validator = require("validator");

//Define mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },

  phone: { type: Number, required: true, min: 11 },
  service: Array,
});

//   we need a collectiopn

const User = mongoose.model("User", userSchema);
module.exports = User;
