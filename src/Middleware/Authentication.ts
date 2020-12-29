import { NextFunction, Request, Response } from "express";
import { UserModel } from "../Model/User";
import { oauth2Client } from "../Service/Google";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: 'No token given.' })
     }
    try {
        const loginTicket = await oauth2Client.verifyIdToken({
            idToken: authorization,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = loginTicket.getPayload()
        if (payload) {
            const { name, email } = payload
            const user = await UserModel.findOne({ name, email }).exec()
            if (user) {
                req.user = user
            } else {
                return res.status(401).json({ message: 'User not found.' })
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token.' })
    }
    return next()
}