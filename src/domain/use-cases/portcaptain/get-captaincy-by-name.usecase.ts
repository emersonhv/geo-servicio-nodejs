import { GetPortCaptaincyDto } from "../../dtos/captain/get-captaincy.dto";
import { PortCaptaincyRepository } from "../../repositories/portCaptaincy.repository";

interface PortCaptaincy {
    id: string,
    name: string,
    shortName: string,
    description: string,
    metadata: string,
    color: string,
    geometry: JSON
}

interface GetPortCaptaincyByNameUseCase {
    execute(portCaptaincyDto: GetPortCaptaincyDto) : Promise<PortCaptaincy>
}

export class GetPortCaptaincyByName implements GetPortCaptaincyByNameUseCase {

    constructor(
        private readonly portCaptainsRepository: PortCaptaincyRepository,
    ){}
    
    async execute(portCaptaincyDto: GetPortCaptaincyDto):Promise<PortCaptaincy> {
        
        const captainsPort = await this.portCaptainsRepository.getCaptaincyByName(portCaptaincyDto);

        return captainsPort;
    }

}