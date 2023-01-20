const Contact = require("./schema");
const validation = require("./validation");

class ContactController {
  async getAll(req, res, next) {
    try {
      const contacts = await Contact.find();
      return res.status(200).json(contacts);
    } catch (err) {
      console.log(err);
    }
  }

  async getById(req, res, next) {
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
  }

  async add(req, res, next) {
    try {
      const validationResult = validation.validate(req.body);
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
  }

  async removeById(req, res, next) {
    const { id } = req.params;
    const findContact = await Contact.findByIdAndRemove(id);
    if (findContact === null) {
      res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json({ message: "contact deleted" });
  }

  async updateById(req, res, next) {
    try {
      const validationResult = validation.validate(req.body);
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
  }

  async favorite(req, res, next) {
    try {
      const validationResult = validation.validate(req.body);
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
  }
}

module.exports = new ContactController();
