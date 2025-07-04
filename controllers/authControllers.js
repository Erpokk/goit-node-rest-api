import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import {resolve, join} from "node:path";
import {rename, unlink} from "node:fs/promises";
import HttpError from "../helpers/HttpError.js";

const avatarsDir = resolve("public", "avatars");

const registerController = async (req, res) => {
    const user = await authServices.registerUser(req.body);

    res.status(201).json(user)
}

const loginController = async (req, res) => {
    const {token, user} = await authServices.loginUser(req.body);

    res.json({
        token,
        user: user
    });
}

const logoutController = async (req, res) => {
    await authServices.logoutUser(req.user);

    res.status(204).json()
}

const getCurrentUserController = async (req, res) => {
   const user = await authServices.getCurrentUser(req.user);
   res.json(user);
}

export const updateAvatar = async (req, res) => {
    const {id} = req.user;

    if (!req.file) {
        throw HttpError(404, "No file uploaded");
    }


    try {
        let avatarURL = null;
        const {path: oldPath, filename} = req.file;
        const newPath = join(avatarsDir, filename);
        await rename(oldPath, newPath);
        avatarURL = join("avatars", filename);

        await authServices.updateAvatar(id, avatarURL);

        res.json({
            avatarURL,
            fullAvatarURL: `http://localhost:${process.env.PORT}/avatars/${filename}`
        });
    } catch (error) {
        await unlink(oldPath);
        throw HttpError(500);
    }
};


export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    getCurrentUserController: ctrlWrapper(getCurrentUserController),
    updateAvatar: ctrlWrapper(updateAvatar),
}