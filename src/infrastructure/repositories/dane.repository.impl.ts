import { AuthDatasource, AuthRepository, GetDaneDto,  LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { DaneDatasource } from "../../domain/datasources/dane.datasource";
import { DaneLayerEntity } from "../../domain";
import { DaneRepository } from "../../domain";

export class DaneRepositoryImp implements DaneRepository {

    constructor(
        private readonly daneDatasource: DaneDatasource
    ) {}

    saveDate(dane: DaneLayerEntity, floodId: string): Promise<DaneLayerEntity> {
        return this.daneDatasource.saveDane(dane, floodId);
    }

    getDaneByFlood(floodId: string): Promise<DaneLayerEntity> {
        return this.daneDatasource.getDane(floodId);
    }

}