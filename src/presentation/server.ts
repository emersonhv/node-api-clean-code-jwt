import express, { Router } from 'express';

interface Options {
    port?: string;
    routes: Router;
}

export class Server {

    public readonly app = express();
    private readonly port: string;
    private readonly routes: Router;

    constructor (option: Options) {
        const { port = '3000', routes } = option
        this.port = port;
        this.routes = routes;
    }

    async start() {

        // Middlewares 
        this.app.use(express.json())

        // Usar las rutas definidas
        this.app.use(this.routes);

        //Escuhar el puerto
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}