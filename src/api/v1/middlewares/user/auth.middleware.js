import jwt from 'jsonwebtoken'
import { config } from '../../../../config'
import { findUserUsingID, findUserUsingIdAndToken } from '../../services/user';

export const userAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization');

    if (!token) {
        return res.status(403).send({ err: "A token is required for authentication" });
    }
    try {
        const verify_token = jwt.verify(token, config.jwt.key);
        const customer = await findUserUsingID({ _id: verify_token._id })
        console.log("customer", customer)
        if (!customer) return res.status(401).send({ err: "Invalid Token" });
        req.user = {...verify_token, isAdmin: customer.isAdmin};
    } catch (err) {
        return res.status(401).send({ err: "Invalid Token" });
    }
    return next();
};