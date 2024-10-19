import { DataTypes, Model } from "sequelize";
import * as database from '../postgre-database';

const sequelize = database.sequelize;

class PortCaptaincyModel extends Model {
    declare id: string;
    declare name: string;
    declare shortName: string;
    declare description: string;
    declare metadata: string;
    declare color: string;
    declare geometry: JSON;
} 

PortCaptaincyModel.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    metadata: {
        type: DataTypes.STRING,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    geometry: {
        type: DataTypes.JSON,
        allowNull: true
    }
  }, {
    sequelize,
    timestamps: true,
    tableName: 'SZC_PORT_CAPTAINS'
  });

  PortCaptaincyModel.sync({ alter: true });

  export { PortCaptaincyModel };