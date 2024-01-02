import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const nanoId = nanoid();

const contactsPath = path.join("models", "contacts", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const stringId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === stringId);
  return result || null;
};

export const addContact = async (data) => {
  console.log(data)
  const contacts = await listContacts();
  const newContacts = {
    id: nanoId,
    ...data,
  };
  contacts.push(newContacts);
  await updateContact(contacts);
  return newContacts;
};

export const updateContactById = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await updateContact(contacts);
    return contacts[index];
}

export const removeContact = async (id) => {
  const stringId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === stringId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
