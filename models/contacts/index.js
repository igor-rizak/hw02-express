const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");
const nanoId = nanoid()

const contactsPath = path.join("models", "contacts", "contacts.json");

// const updateContact = movies => fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const stringId = String(id);
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === stringId);
  return result || null;
}

async function removeContact(id) {
  const stringId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === stringId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact( name, email, phone ) {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoId,
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


