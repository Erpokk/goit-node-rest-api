import { ctrlWrapper, HttpError } from "../helpers/index.js";
import { updateContact, updateStatusContact, listContacts, getContactById, deleteContact, addContact } from "../services/contactsServices.js";

export const getAllContactsController = async (req, res) => {
    const result = await listContacts();
    res.status(200).json(result);
};

export const getOneContactController = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const contact = await deleteContact(id);
    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
};

export const createContactController = async (req, res) => {
    if (!req.body) {
        throw HttpError(400, `Body can't be empty`);
    }
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
};

export const updateContactController = async (req, res) => {

    const {id} = req.params;
    const result = await updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
};


export const updateStatusContactController = async (req, res) => {
    const {id} = req.params;
    const {favorite} = req.body;
    const result = await updateStatusContact(id, {favorite});
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};


export default {
    getAllContactsController: ctrlWrapper(getAllContactsController),
    getOneContactController: ctrlWrapper(getOneContactController),
    deleteContactController: ctrlWrapper(deleteContactController),
    createContactController: ctrlWrapper(createContactController),
    updateContactController: ctrlWrapper(updateContactController),
    updateStatusContactController: ctrlWrapper(updateStatusContactController),
}