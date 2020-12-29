import { prop, getModelForClass, Ref } from "@typegoose/typegoose"
import { User } from '../Model/User'
import { Product } from '../Model/Product'

export class Cart {
    public _id

    @prop({ required: true, ref: User })
    public user!: Ref<User>

    @prop({ ref: Product })
    public products!: Ref<Product>[]
}

export const CartModel = getModelForClass(Cart)
