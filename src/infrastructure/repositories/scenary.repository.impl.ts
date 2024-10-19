import { ScenaryEntity } from "../../domain";
import { ScenaryDatasource } from "../../domain/datasources/scenary.datasource";
import { ScenaryRepository } from "../../domain/repositories/scenary.repository";

export class ScenaryRepositoryImp implements ScenaryRepository{

    constructor(
        private readonly scenaryDatasource: ScenaryDatasource,
    ){}

    saveScenary(scenary: ScenaryEntity): Promise<ScenaryEntity> {
        return this.scenaryDatasource.saveScenary(scenary);
    }

    getAllScenary(): Promise<ScenaryEntity[]> {
        return this.scenaryDatasource.getAllScenary();
    }

}