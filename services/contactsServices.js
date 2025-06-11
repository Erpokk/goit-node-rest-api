// src/contacts.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const contactsPath = path.join(process.cwd(), 'db', 'contacts.json');


export async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(c => c.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();

  let removedContact = null;
  const updatedContacts = [];

  for (const contact of contacts) {
    if (contact.id === contactId) {
      removedContact = contact;
    } else {
      updatedContacts.push(contact);
    }
  }

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return removedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export async function updateContact(id, updatedContact) {
  const contacts = await listContacts();

  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) {
    return null;
  }

  const newContact = {
    ...contacts[idx],
    ...Object.fromEntries(Object.entries(updatedContact).filter(([_, value]) => value !== undefined))
  };


  const index = contacts.findIndex(c => c.id === id);
  contacts[index] = newContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}