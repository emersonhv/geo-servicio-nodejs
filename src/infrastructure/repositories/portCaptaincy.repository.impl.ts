import { PortCaptaincyDatasource } from "../../domain/datasources/portCaptaincy.datasource";
import { GetPortCaptaincyDto } from "../../domain/dtos/captain/get-captaincy.dto";
import { PortCaptaincyEntity } from "../../domain/entities/portCaptaincy.entity";
import { PortCaptaincyRepository } from "../../domain/repositories/portCaptaincy.repository";

export class PortCaptaincyRepositoryImp implements PortCaptaincyRepository {

    constructor(
        private readonly portCaptainsDatasource: PortCaptaincyDatasource,
    ){}

    getAllCaptaincy(): Promise<PortCaptaincyEntity[]> {
        return this.portCaptainsDatasource.getAllCaptaincy();
    }

    getCaptaincyByName(portCaptaincyDto: GetPortCaptaincyDto): Promise<PortCaptaincyEntity> {
        return this.portCaptainsDatasource.getCaptaincyByName(portCaptaincyDto);
    }

}