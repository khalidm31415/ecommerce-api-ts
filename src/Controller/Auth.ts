import { Request, Response } from 'express'
import { google } from 'googleapis'
import { Credentials } from 'google-auth-library'
import { UserModel } from '../Model/User'
import { oauth2Client } from '../Service/Google';
import { CartModel } from '../Model/Cart';

export class Auth {
    public async url(_: Request, res: Response) {
        const url = oauth2Client.generateAuthUrl({
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ]
        })
        return res.json({ url })
    }

    public async callback(req: Request, res: Response) {
        const { code } = req.query
        const tokens = await oauth2Client.getToken(code as string)
        oauth2Client.setCredentials(tokens.tokens as Credentials)
        const { data } = await google.oauth2('v2').userinfo.get({ auth: oauth2Client })
        if (data.name && data.email) {
            let user = await UserModel.findOne({ name: data.name as string, email: data.email as string }).exec()
            if (!user) {
                user = await UserModel.create({
                    name: data.name,
                    email: data.email
                })
                const cart = await CartModel.create({ user: user, items: [] })
            }
            return res.json({ token: tokens.tokens.id_token, user: user })
        }
    }

    public async me(req: Request, res: Response) {
        return res.json(req.user)
    }
}