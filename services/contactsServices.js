import Contact from "../db/Contact.js";

export const listContacts = async (id) => {
  return await Contact.findAll({where: {owner: id}});
}

export const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({where: {id: contactId, owner}});
  return contact;
}

export const deleteContact = async (contactId, owner) => {
  const contact = await Contact.findOne({where: {id: contactId, owner}});
  if (!contact) return null;

  await contact.destroy();
  return contact;
}

export const addContact = async data => {
  return Contact.create(data);
}


export const updateContact = async (id, data, owner) => {
  const contact = await Contact.findOne({where: {id, owner}});
  if (!contact) return null;

  await contact.update(data);
  return contact;
}

export const updateStatusContact = async (id, data, owner) => {
  const contact = await Contact.findOne({where: {id, owner}});
  if (!contact) {
      return null;
  }

  await contact.update(data);
  return contact;
};