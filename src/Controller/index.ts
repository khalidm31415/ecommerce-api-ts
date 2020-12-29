import { Router } from "express";
import { authenticate } from "../Middleware/Authentication";
import { authorize } from "../Middleware/Authorization";
import { Cart } from "../Controller/Cart";
import { Auth } from "./Auth";
import { Product } from "./Product";

export function Controller() {
    const router = Router()

    router.get('/products', authenticate, new Product().getAll)
    router.get('/product/:id', authenticate, new Product().getOne)
    router.post('/product', authenticate, new Product().create)
    router.patch('/product/:id', authenticate, authorize, new Product().update)
    router.delete('/product/:id', authenticate, authorize, new Product().delete)

    router.get('/cart', authenticate, new Cart().get)
    router.post('/cart', authenticate, new Cart().addProduct)

    router.get('/auth/url', new Auth().url)
    router.get('/auth/callback', new Auth().callback)
    router.get('/auth/me', authenticate, new Auth().me)

    return router
}