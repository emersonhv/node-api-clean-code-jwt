//import { MongoDatabase } from './data/mongodb';
import * as database from './data/postgres';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
    main()
})()

async function main() {
    
    /*await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,// La exclamacion 
        //indica que aunque algo aparezca nulo puede confiar que no lo es
        mongoUrl: process.env.MONGO_URL!
    });*/

    const sequelize = database.sequelize;

    new Server({
        port: process.env.PORT!,
        routes: AppRoutes.routes
    }).start();
}