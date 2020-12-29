import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../Model/Product";

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const product = await ProductModel.findById(id).exec()
    const isAuthorized = product?.user._id == req.user._id
    if (isAuthorized) {
        return next()
    } else {
        return res.status(401).json({'message': 'Unauthorized'})
    }
}