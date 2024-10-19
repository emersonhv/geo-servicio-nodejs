import { GetPortCaptaincyDto } from "../dtos/captain/get-captaincy.dto";
import { PortCaptaincyEntity } from "../entities/portCaptaincy.entity";

export abstract class PortCaptaincyDatasource {

    abstract getAllCaptaincy(): Promise<PortCaptaincyEntity[]>;

    abstract getCaptaincyByName(portCaptaincyDto: GetPortCaptaincyDto): Promise<PortCaptaincyEntity>;
        
}