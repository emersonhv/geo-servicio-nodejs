import { GetPortCaptaincyDto } from "../dtos/captain/get-captaincy.dto";
import { PortCaptaincyEntity } from "../entities/portCaptaincy.entity";

export abstract class PortCaptaincyRepository {

    abstract getAllCaptaincy(): Promise<PortCaptaincyEntity[]>;

    abstract getCaptaincyByName(portCaptaincyDto: GetPortCaptaincyDto): Promise<PortCaptaincyEntity>;

}