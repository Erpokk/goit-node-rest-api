import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { validateBody } from "../helpers/index.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { authenticate } from "../middleware/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContactsController);

contactsRouter.get("/:id", contactsControllers.getOneContactController);

contactsRouter.delete("/:id", contactsControllers.deleteContactController);

contactsRouter.post("/", validateBody(createContactSchema), contactsControllers.createContactController);

contactsRouter.put("/:id", validateBody(updateContactSchema), contactsControllers.updateContactController);

contactsRouter.patch("/:id/favorite", validateBody(updateContactSchema), contactsControllers.updateStatusContactController);


export default contactsRouter;