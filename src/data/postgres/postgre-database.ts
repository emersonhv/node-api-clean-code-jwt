import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRE_URL!);
try {
    sequelize.authenticate();
    console.log('Postgres connected');
} catch (error) {
    console.log('Postgres connection error');
    throw error;
}

export { sequelize };