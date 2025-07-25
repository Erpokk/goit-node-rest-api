import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = payload => jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
export const verifyToken = token => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return {payload};
    }
    catch(error) {
        return {error};
    }
}