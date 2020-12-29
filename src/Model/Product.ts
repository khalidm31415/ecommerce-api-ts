import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from '../Model/User'

export class Product {

    @prop({ required: true })
    public title!: string

    @prop({ required: true })
    public description!: string

    @prop({ required: true })
    public price!: number

    @prop({ required: true, ref: User })
    public user!: Ref<User>
}

export const ProductModel = getModelForClass(Product)
