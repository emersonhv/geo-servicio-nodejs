import { FloodRepository } from "../../repositories/flood.repository";
import { Flood } from "./interface/flood.interface";

interface GetFloodsByCaptainAndScenaryUseCase {
    execute(portCaptainId: string, scenaryId: string) : Promise<Flood[]>
}

export class GetFloodsByCaptainAndScenary implements GetFloodsByCaptainAndScenaryUseCase {

    private listFloods:Flood[] = [];

    constructor(
        private readonly floodRepository: FloodRepository,
    ){}
    
    async execute(portCaptainId: string, scenaryId: string):Promise<Flood[]> {
        
        const floods = await this.floodRepository.getFloodsByCaptainAndScenary(portCaptainId, scenaryId);
        
        floods.forEach(flood => {
            this.listFloods.push({
                id: flood.id,
                name: flood.name,
                shortName: flood.shortName,
                description: flood.description,
                area_km2: flood.area_km2,
                color: flood.color,
                metadata: flood.metadata,
                geometry: flood.geometry,
                portCaptainId: flood.portCaptainId,
                scenaryId: flood.scenaryId
            });
        });

        return this.listFloods;
    }

}