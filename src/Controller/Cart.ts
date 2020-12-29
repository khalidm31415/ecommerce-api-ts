import { Request, Response } from "express";
import { CartModel } from "../Model/Cart";
import { ProductModel } from "../Model/Product";

export class Cart {

    public async get(req: Request, res: Response) {
        const cart = await CartModel.findOne({ user: req.user }).exec()
        return res.send({ cart })
    }

    public async addProduct(req: Request, res: Response) {
        const { productId } = req.body
        let cart = await CartModel.findOne({ user: req.user }).exec()
        if (cart) {
            const product = await ProductModel.findById(productId)
            if (!product) {
                return res.status(404).json({'message': 'Product not found'})
            } else {
                cart.products.push(product)
                await cart.save()
                return res.json(cart)
            }
        } else {
            return res.status(404).json({'message': 'Cart not found'})
        }
    }
}