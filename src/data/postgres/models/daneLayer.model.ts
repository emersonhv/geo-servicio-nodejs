import { DataTypes, Model } from "sequelize";
import * as database from "../postgre-database";
import { FloodLayerModel } from "./floodLayer.model";

const sequelize = database.sequelize;

class DaneLayerModel extends Model {
    declare id: string;
    declare name: string;
    declare description: string;
    declare metadata: string;
    declare color: string;
    declare geometry: JSON;
    declare flood_id: string;
    declare visible: boolean;
}

DaneLayerModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    flood_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: true,
    tableName: 'SZC_DANE'
});

DaneLayerModel.belongsTo(FloodLayerModel, { foreignKey: 'flood_id'});
FloodLayerModel.hasOne(DaneLayerModel, { foreignKey: 'flood_id'});

DaneLayerModel.sync({ alter: true});

export { DaneLayerModel };