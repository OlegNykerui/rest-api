const { Contact } = require("../models/schema");

const getAll = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
