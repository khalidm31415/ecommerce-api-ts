import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
    public _id

    @prop({ required: true })
    public name!: string

    @prop({ required: true })
    public email!: string
}

export const UserModel = getModelForClass(User)
