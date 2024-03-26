import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDatasourceImpl, AuthRepositoryImp } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes() : Router {

        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImp(datasource);
        const controller = new AuthController(authRepository);

        // Definir todas mis rutas principales
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/', AuthMiddleware.validatwJWT, controller.getUser)

        return router;
    }
}