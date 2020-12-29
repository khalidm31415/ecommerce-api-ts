import { User } from './Model/User'

export {}

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}
