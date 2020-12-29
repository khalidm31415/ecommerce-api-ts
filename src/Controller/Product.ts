import { Request, Response } from "express";
import { ProductModel } from "../Model/Product";

export class Product {

    public async getAll(_: Request, res: Response) {
        const products = await ProductModel.find().exec()
        return res.send({ products })
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params
        const product = await ProductModel.findById(id).exec()
        return res.send({ product })
    }

    public async create(req: Request, res: Response) {
        const product = await ProductModel.create({ ...req.body, user: req.user})
        return res.send({ product })
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params
        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true }).exec()
        return res.send({ product })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params
        const product = await ProductModel.findByIdAndRemove(id).exec()
        return res.send({ product })
    }
}