const Contact = require("../models/schema");
const { contactSchema, updateFavoriteSchema } = require("../models/validation");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    return res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await Contact.findById(id);
    if (contact === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
  }
};

const add = async (req, res, next) => {
  try {
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const findContact = await Contact.findByIdAndRemove(id);
  if (findContact === null) {
    res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  try {
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const { id } = req.params;
    const contacts = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contacts) {
      res.status(404).json({
        message: "Not found",
      });
    } else {
      res.status(200).json(contacts);
    }
  } catch (error) {
    next(error);
  }
};

const favorite = async (req, res, next) => {
  try {
    const validationResult = updateFavoriteSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Missing field favorite",
      });
    }
    const { id } = req.params;
    const contacts = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contacts) {
      res.status(404).json({
        message: "Not found",
      });
    } else {
      res.status(200).json(contacts);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  favorite,
};
