const fs = require("fs").promises;
const { v4 } = require("uuid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    console.log(contacts);
    console.log(contactId);
    const contact = contacts.find((item) => item.id === contactId);
    console.log(contact);
    if (!contact) {
      throw new Error(`Контакт с id=${contactId} не найден`);
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      throw newError(`Контакт с id=${contactId} не найден`);
    }
    const newContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
  } catch (error) {}
};

const addContact = async (name, email, phone) => {
  const newContact = { name, email, phone, id: v4() };
  try {
    const contacts = await listContacts();
    const newContacts = JSON.stringify([...contacts, newContact]);
    await fs.writeFile(contactsPath, newContacts);
    return newContacts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
