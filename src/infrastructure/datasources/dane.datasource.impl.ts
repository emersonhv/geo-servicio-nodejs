import Logger from "../../config/logger";
import { DaneLayerModel } from "../../data/postgres";
import { CustomError, DaneLayerEntity } from "../../domain";
import { DaneDatasource } from "../../domain/datasources/dane.datasource";
import { DaneMapper } from "../mappers/dane.mappers";

export class DaneDataourceImpl implements DaneDatasource {

    constructor() {}

    async getDane(floodId: string): Promise<DaneLayerEntity> {
        try {
            const daneFound = await DaneLayerModel.findOne({
                where: { flood_id: floodId }
            });

            if (!daneFound) throw CustomError.badRequest('Dane not found');

            return DaneMapper.daneEntityFromObject(daneFound);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

    async saveDane(dane: DaneLayerEntity, floodId: string): Promise<DaneLayerEntity> {
        try {
            const daneSaved = await DaneLayerModel.create({
                name: dane.name,
                desciption: dane.description,
                metadata: dane.metadata,
                color: dane.color,
                geometry: dane.geometry,
                flood_id: floodId
            });

            return DaneMapper.daneEntityFromObject(daneSaved);

        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }
}