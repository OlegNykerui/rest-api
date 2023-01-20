const mongoose = require("mongoose");

const Contact = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

// const Contact = mongoose.model("Contact", contactSchema);

module.exports = mongoose.model("Contact", Contact);
