import { prop, getModelForClass, Ref } from "@typegoose/typegoose"
import { User } from '../Model/User'
import { ObjectId } from "mongoose"

export type CartItem = {
    productId: ObjectId,
    quantity: number
}

export class Cart {
    public _id

    @prop({ required: true, ref: User })
    public user!: Ref<User>

    @prop({ required: true, _id: false })
    public items!: CartItem[]
}

export const CartModel = getModelForClass(Cart)
