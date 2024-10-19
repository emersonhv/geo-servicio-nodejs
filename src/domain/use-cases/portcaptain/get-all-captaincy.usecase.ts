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

interface GetAllPortCaptaincyUseCase {
    execute() : Promise<PortCaptaincy[]>
}

export class GetAllPortCaptaincy implements GetAllPortCaptaincyUseCase {

    constructor(
        private readonly portCaptainsRepository: PortCaptaincyRepository,
    ){}
    
    async execute():Promise<PortCaptaincy[]> {
        
        const listCaptains = await this.portCaptainsRepository.getAllCaptaincy();
    
        return listCaptains;
    }

}