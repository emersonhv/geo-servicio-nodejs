import { AuthDatasource, AuthRepository, GetScenaryDto, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { FloodDatasource } from "../../domain/datasources/flood.datasource";
import { GetPortCaptaincyDto } from "../../domain/dtos/captain/get-captaincy.dto";
import { FloodLayerEntity } from "../../domain/entities/floodLayer.entity";
import { FloodRepository } from "../../domain/repositories/flood.repository";

export class FloodRepositoryImp implements FloodRepository {

    constructor(
        private readonly floodDatasource: FloodDatasource,
    ){}

    saveFlood(flood: FloodLayerEntity): Promise<FloodLayerEntity> {
        return this.floodDatasource.saveFlood(flood);
    }

    getAllFloods(): Promise<FloodLayerEntity[]> {
        return this.floodDatasource.getAllFloods();
    }

    getFloodsByCaptainAndScenary(portCaptainId: string, scenaryId: string): Promise<FloodLayerEntity[]> {
        return this.floodDatasource.getFloodsByCaptainAndScenary(portCaptainId, scenaryId);
    }

    getFloodByCaptainAndScenary(portCaptainId: string, scenaryId: string): Promise<FloodLayerEntity> {
        return this.floodDatasource.getFloodByCaptainAndScenary(portCaptainId, scenaryId);
    }
}