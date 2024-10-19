import { DataTypes, Model } from "sequelize";
import * as database from '../postgre-database';

const sequelize = database.sequelize;

class ScenaryModel extends Model {
    declare id: string;
    declare name: string;
    declare description: string;
    declare autor: string;
    declare year: string;
} 

ScenaryModel.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    timestamps: true,
    tableName: 'SZC_SCENARY'
  });

  ScenaryModel.sync({ alter: true });

  export { ScenaryModel };