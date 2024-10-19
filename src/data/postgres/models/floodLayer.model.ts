import { DataTypes, Model } from "sequelize";
import * as database from '../postgre-database';
import { PortCaptaincyModel } from "./portCaptaincy.model";
import { ScenaryModel } from "./scenary.model";

const sequelize = database.sequelize;

class FloodLayerModel extends Model {
    declare id: string;
    declare name: string;
    declare shortName: string;
    declare description: string;
    declare area_km2: string;
    declare color: string;
    declare geometry: JSON;
    declare metadata: string;
    declare scenary_id: string;
    declare port_captaincy_id: string;
}

FloodLayerModel.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area_km2: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    geometry: {
        type: DataTypes.JSON,
        allowNull: true
    },
    metadata: {
        type: DataTypes.STRING,
        allowNull: true
    },
    scenary_id: {
        type: DataTypes.UUID,
        allowNull:false
    },
    port_captaincy_id: {
        type: DataTypes.UUID,
        allowNull:false
    }
  }, {
    sequelize,
    timestamps: true,
    tableName: 'SZC_FLOOD'
  });

  FloodLayerModel.belongsTo(ScenaryModel, { foreignKey: 'scenary_id'});
  ScenaryModel.hasOne(FloodLayerModel, { foreignKey: 'scenary_id'});

  FloodLayerModel.belongsTo(PortCaptaincyModel, { foreignKey: 'port_captaincy_id'});
  PortCaptaincyModel.hasOne(FloodLayerModel, { foreignKey: 'port_captaincy_id'});

  FloodLayerModel.sync({ alter: true });

  export { FloodLayerModel };