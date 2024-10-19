import { FloodRepository } from "../../repositories/flood.repository";
import { Flood } from "./interface/flood.interface";

interface GetFloodByCaptainAndScenaryUseCase {
    execute(portCaptainId: string, scenaryId: string) : Promise<Flood>
}

export class GetFloodByCaptainAndScenary implements GetFloodByCaptainAndScenaryUseCase {

    constructor(
        private readonly floodRepository: FloodRepository,
    ){}
    
    async execute(portCaptainId: string, scenaryId: string):Promise<Flood> {
        
        const flood = await this.floodRepository.getFloodByCaptainAndScenary(portCaptainId, scenaryId);

        return flood;
    }

}