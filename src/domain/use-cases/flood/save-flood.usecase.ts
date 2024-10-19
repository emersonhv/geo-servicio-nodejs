import { FloodRepository } from "../../repositories/flood.repository";
import { Flood } from "./interface/flood.interface";

interface SaveFloodUseCase {
    execute(flood: Flood) : Promise<Flood>
}

export class SaveFlood implements SaveFloodUseCase {

    constructor(
        private readonly floodRepository: FloodRepository
    ) {}

    async execute(flood: Flood): Promise<Flood> {
        const floodSaved = await this.floodRepository.saveFlood(flood);

        return floodSaved;
    }

}