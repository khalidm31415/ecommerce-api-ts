import { Request, Response } from "express";
import { CartItem, CartModel } from "../Model/Cart";
import { ProductModel } from "../Model/Product";

export class Cart {

    public async get(req: Request, res: Response) {
        const cart = await CartModel.findOne({ user: req.user }).exec()
        return res.send({ cart })
    }

    public async addItem(req: Request, res: Response) {
        const { productId, quantity } = req.body
        let cart = await CartModel.findOne({ user: req.user }).exec()
        if (cart) {
            const product = await ProductModel.findById(productId)
            if (!product) {
                return res.status(404).json({'message': 'Product not found'})
            } else {
                let cartItem = cart.items.find(item => item.productId === productId)
                if(cartItem) {
                    cartItem.quantity += quantity
                } else {
                    cartItem = { productId, quantity }
                    cart.items.push(cartItem)
                }
                await cart.save()
                return res.json(cart)
            }
        } else {
            return res.status(404).json({'message': 'Cart not found'})
        }
    }

    public async update(req: Request, res: Response) {
        const { items } = req.body
        const cart = await CartModel.findOne({ user: req.user }).exec()
        if (cart) {
            cart.items = items
            cart.items = cart.items.filter(item => item.quantity > 0)
            await cart.save()
            return res.json(cart)
        } else {
            return res.status(404).json({'message': 'Cart not found'})
        }
    }
}
