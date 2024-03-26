import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt-adapter";
import { UserModel } from "../../data/postgres";


export class AuthMiddleware {


    static validatwJWT = async (req: Request, res: Response, next: NextFunction) => {
        
        const authorization = req.header('Authorization');

        if(!authorization) return res.status(401).json({error: 'No token provided'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try {
            // todo: 
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({error: 'Invalid token'});

            const user = await UserModel.findByPk(payload.id);

            if (!user) return res.status(401).json({error: 'Invalid token - user not found'});

            req.body.user = user;

            next();  
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        } 

    }
}