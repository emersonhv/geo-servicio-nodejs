import { ScenaryModel } from "../../data/postgres";
import { CustomError, ScenaryEntity } from "../../domain";
import { ScenaryDatasource } from "../../domain/datasources/scenary.datasource";
import { ScenaryMapper } from "../mappers/scenary.mappers";
import Logger from "../../config/logger";


export class ScenaryDatasourceImpl implements ScenaryDatasource {

    constructor() {}
    
    async saveScenary(scenary: ScenaryEntity): Promise<ScenaryEntity> {
        try {
            const scenarySaved = await ScenaryModel.create({
                name: scenary.name,
                description: scenary.description,
                autor: null,
                year: null
            })

            return scenarySaved;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

    async getAllScenary(): Promise<ScenaryEntity[]> {
        try {
            const scenaryList = await ScenaryModel.findAll({
                order:[['year', 'ASC'], ['name','ASC']]
            }); 

            return ScenaryMapper.listScennaryEntityFromListObject(scenaryList);
             
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

}