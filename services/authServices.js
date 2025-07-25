import bcrypt from "bcrypt";
import User from "../db/User.js";
import {createToken} from "../helpers/jwt.js";
import HttpError from "../helpers/HttpError.js";

export const findUser = query => User.findOne({
    where: query,
})

export const registerUser = async payload => {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const checkUser = await findUser({email: payload.email});
    if (checkUser) throw HttpError(409, "Email in use");
    const user = await User.create({...payload, password: hashPassword});
    return {
        email: user.email,
        subscription: user.subscription
    };
}

export const loginUser = async ({email, password}) => {
    const user = await findUser({email});
    if (!user) throw HttpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {id: user.id};

    const token = createToken(payload);

    user.token = token;
    await user.save();

    return {
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    };
}

export const logoutUser = async ({id}) => {
    const user = await findUser({id});
    if (!user) throw HttpError(401, "User not found");
    user.token = "";
    await user.save();
}

export const getCurrentUser = async ({id}) => {
    const user = await findUser({id});
    if (!user) throw HttpError(401, "User not found");
    return {
        email: user.email,
        subscription: user.subscription
    };
}
