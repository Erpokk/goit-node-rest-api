import { listContacts, getContactById, removeContact, addContact, updateContact } from "../services/contactsServices.js";

export const getAllContactsController = async (req, res) => {
    const contacts = await listContacts(); 
    res.status(200).json({
        message: "Contacts fetched successfully",
        status: "success",
        data: {
            contacts
        }
    });
};

export const getOneContactController = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);
    const message = contact ? `Contact with id: ${id} fetched successfully` : `Contact with id: ${id} not found`;

    if (!contact) {
        return res.status(404).json({
            message,
            status: "error",
        });
    }
    res.status(200).json({
        message,
        status: "success",
        data: {
            contact
        }
    });
};

export const deleteContactController = async (req, res) => {
    const {id } = req.params;
    const contact = await removeContact(id);
    const message = contact ? `Contact with id: ${id} deleted successfully` : `Contact with id: ${id} not found`;
    if (!contact) {
        return res.status(404).json({
            message,
            status: "error",
        });
    }
    res.status(200).json({
        message,
        status: "success",
        data: {
            contact
        }
    });
};

export const createContactController = async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);
    res.status(201).json({
        message: "Contact created successfully",
        status: "success",
        data: {
            contact
        }
    });
};

export const updateContactController = async (req, res) => {
    const { id } = req.params;
    const updatedContact = req.body;

    const contact = await updateContact(id, updatedContact);
    const message = contact ? `Contact with id: ${id} updated successfully` : `Contact with id: ${id} not found`;
    if (!contact) {
        return res.status(404).json({
            message,
            status: "error",
        });
    }
    res.status(200).json({
        message,
        status: "success",
        data: {
            contact
        }
    });
};