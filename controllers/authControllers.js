import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import {resolve, join} from "node:path";
import {rename, unlink} from "node:fs/promises";
import HttpError from "../helpers/HttpError.js";
import { sendEmail } from "../helpers/sendEmail.js";
import User from "../db/User.js";


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

export const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ where: { verificationToken } });


    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
};

export const resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "missing required field email" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verify) {
            return res.status(400).json({ message: "Verification has already been passed" });
        }

        const verifyLink = `http://localhost:3000/api/auth/verify/${user.verificationToken}`;
        await sendEmail(
            email,
            "Verify your email",
            `<a href="${verifyLink}">Click to verify your email</a>`
        );

        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        next(error);
    }
};

export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    getCurrentUserController: ctrlWrapper(getCurrentUserController),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerification: ctrlWrapper(resendVerification),
}