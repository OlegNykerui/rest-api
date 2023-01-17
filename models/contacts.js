const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./contacts.json");
// const service = require("../routes/api/controllers/getAll");

const updateContactsFile = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async (req, res, next) => {
  // try {
  //   const contact = await service.getAll();
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: { contact },
  //   });
  // } catch (err) {
  //   console.error(err);
  //   next(err);
  // }
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((elem) => elem.id === contactId);
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const deleteContact = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
  return deleteContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactsFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const contactToChange = contacts.find((elem) => elem.id === contactId);

  if (!contactToChange) {
    return null;
  }

  contactToChange.name = name;
  contactToChange.email = email;
  contactToChange.phone = phone;

  await updateContactsFile(contacts);
  return contactToChange;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
