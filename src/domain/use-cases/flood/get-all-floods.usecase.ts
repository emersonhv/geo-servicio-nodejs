import { FloodRepository } from "../../repositories/flood.repository";

interface Flood {
    id: string,
    name: string,
    shortName: string,
    description: string,
    metadata: string,
    geometry: JSON,
    portCaptain: string,
    scenary: string
}

interface GetAllFloodsUseCase {
    execute() : Promise<Flood[]>
}

export class GetAllFloods implements GetAllFloodsUseCase {

    private listFloods:Flood[] = [];

    constructor(
        private readonly floodRepository: FloodRepository,
    ){}
    
    async execute():Promise<Flood[]> {
        
        const floods = await this.floodRepository.getAllFloods();
        
        floods.forEach(flood => {
            this.listFloods.push({
                id: flood.id,
                name: flood.name,
                shortName: flood.shortName,
                description: flood.description,
                metadata: flood.metadata,
                geometry: flood.geometry,
                portCaptain: flood.portCaptainId,
                scenary: flood.scenaryId
            });
        });

        return this.listFloods;
    }

}