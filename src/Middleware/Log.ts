import { NextFunction, Request, Response } from "express";

export async function log(req: Request, res: Response, next: NextFunction) {
    console.log(`[${Date()}] [${req.path}] ${JSON.stringify(req.body)}`)
    return next()
}