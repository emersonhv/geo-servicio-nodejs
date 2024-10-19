import Logger from "../../config/logger";
import { FloodLayerModel, sequelize } from "../../data/postgres";
import { CustomError, GetScenaryDto } from "../../domain";
import { FloodDatasource } from "../../domain/datasources/flood.datasource";
import { FloodLayerEntity } from "../../domain/entities/floodLayer.entity";
import { FloodMapper } from "../mappers/flood.mappers";

export class FloodDatasourceImpl implements FloodDatasource {

    constructor() {}

    async saveFlood(flood: FloodLayerEntity): Promise<FloodLayerEntity> {
        try {
            const floodSaved = await FloodLayerModel.create({
                name: flood.name,
                shortName: flood.shortName,
                description: flood.description,
                area_km2: flood.area_km2,
                color: flood.color,
                geometry: flood.geometry,
                metadata: flood.metadata,
                port_captaincy_id: flood.portCaptainId,
                scenary_id: flood.scenaryId
            });

            return FloodMapper.floodsEntityFromObject(floodSaved);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

    async getAllFloods(): Promise<FloodLayerEntity[]> {
        throw CustomError.badRequest("Method not implemented.");
    }

    async getFloodsByCaptainAndScenary(portCaptainId: string, scenaryId: string): Promise<FloodLayerEntity[]> {
        try {
            const floodsList = await FloodLayerModel.findAll({
                where: { port_captaincy_id: portCaptainId, scenary_id: scenaryId },
                attributes: [
                    'id',
                    'name',
                    'shortName',
                    'area_km2',
                    'description',
                    'metadata',
                    'color',
                    'port_captaincy_id',
                    'scenary_id',
                    'geometry'
                ]
            });

            return FloodMapper.listFloodsEntityFromListObject(floodsList);
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

    async getFloodByCaptainAndScenary(portCaptainId: string, scenaryId: string): Promise<FloodLayerEntity> {
        try {
            const flood = await FloodLayerModel.findOne({
                where: { port_captaincy_id: portCaptainId, scenary_id: scenaryId },
                attributes: [
                    'id',
                    'name',
                    'shortName',
                    'area_km2',
                    'description',
                    'metadata',
                    'color',
                    'port_captaincy_id',
                    'scenary_id',
                    'geometry'
                ]
            });

            if (!flood) throw CustomError.badRequest('Flood not found');

            return FloodMapper.floodsEntityFromObject(flood);
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

}