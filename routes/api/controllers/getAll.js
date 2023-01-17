const { Contact } = require("../../../models/schema");

const getAll = async (req, res, next) => {
  // return Contact.find({});
  try {
    const allContacts = await Contact.find({});
    return res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
