import Contact from "../db/Contact.js";

export const listContacts = async () => {
  return await Contact.findAll();
}

export const getContactById = async contactId => {
  const contact = await Contact.findByPk(contactId);
  return contact;
}

export const deleteContact = async contactId => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
}

export const addContact = async data => {
  return Contact.create(data);
}


export const updateContact = async (id, data) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;

  await contact.update(data);
  return contact;
}

export const updateStatusContact = async (id, data) => {
  const contact = await Contact.findByPk(id);
  if (!contact) {
      return null;
  }

  await contact.update(data);
  return contact;
};