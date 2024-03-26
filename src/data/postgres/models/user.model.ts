import { DataTypes, Model } from "sequelize";
import * as database from '../postgre-database';

const sequelize = database.sequelize;

class UserModel extends Model {
    declare id: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: string;
} 

UserModel.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER_ROLE',
    }
  }, {
    sequelize,
    timestamps: true,
    tableName: 'SZC_USERS'
  });

  UserModel.sync({ alter: true });

  export { UserModel };