import express from "express";
import {
  getAllContactsController,
  getOneContactController,
  deleteContactController,
  createContactController,
  updateContactController,
  updateStatusContactController,
} from "../controllers/contactsControllers.js";
import { validateBody } from "../helpers/index.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsController);

contactsRouter.get("/:id", getOneContactController);

contactsRouter.delete("/:id", deleteContactController);

contactsRouter.post("/", validateBody(createContactSchema), createContactController);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContactController);

contactsRouter.patch("/:id/favorite", validateBody(updateContactSchema), updateStatusContactController);


export default contactsRouter;