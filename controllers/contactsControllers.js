import { listContacts, getContactById, removeContact, addContact, updateContact } from "../services/contactsServices.js";
import { ctrlWrapper, HttpError } from "../helpers/index.js";

export const getAllContactsController = async (req, res) => {
    const result = await listContacts();
    res.status(200).json(result);
};

export const getOneContactController = async (req, res) => {
    const { id } = req.params;
    const result = await getContactById(id);

    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
};

export const createContactController = async (req, res) => {
    if (!req.body) {
        throw HttpError(400, `Body can't be empty`);
    }
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
};

export const updateContactController = async (req, res) => {
    const { id } = req.params;
    if (!req.body) {
        throw HttpError(400, `Body can't be empty`);
    }
    const updatedContact = req.body;

    const result = await updateContact(id, updatedContact);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
};


export default {
    getAllContactsController: ctrlWrapper(getAllContactsController),
    getOneContactController: ctrlWrapper(getOneContactController),
    deleteContactController: ctrlWrapper(deleteContactController),
    createContactController: ctrlWrapper(createContactController),
    updateContactController: ctrlWrapper(updateContactController),
}