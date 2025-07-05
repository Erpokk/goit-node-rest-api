import { ctrlWrapper, HttpError } from "../helpers/index.js";
import { updateContact, updateStatusContact, listContacts, getContactById, deleteContact, addContact } from "../services/contactsServices.js";

const getAllContactsController = async (req, res) => {
    const {id} = req.user;
    const result = await listContacts(id);
    res.status(200).json(result);
};

const getOneContactController = async (req, res) => {
    const { id } = req.params;
    const {id: owner} = req.user;
    const contact = await getContactById(id, owner);

    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
};

const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const {id: owner} = req.user;
    const contact = await deleteContact(id, owner);
    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
};

const createContactController = async (req, res) => {
    const {id} = req.user;
    if (!req.body) {
        throw HttpError(400, `Body can't be empty`);
    }
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone, owner: id });
    res.status(201).json(newContact);
};

const updateContactController = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const result = await updateContact(id, req.body, owner);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
};


const updateStatusContactController = async (req, res) => {
    const {id} = req.params;
    const {favorite} = req.body;
    const {id: owner} = req.user;
    const result = await updateStatusContact(id, {favorite}, owner);
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