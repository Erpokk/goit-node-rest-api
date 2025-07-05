import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

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

export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    getCurrentUserController: ctrlWrapper(getCurrentUserController),
}