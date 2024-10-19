import { ScenaryRepository } from "../../repositories/scenary.repository";
import { Scenary } from "./interface/Scenary";

interface SaveScenaryUseCase {
    execute(scenary: Scenary) : Promise<Scenary>
}

export class SaveScenary implements SaveScenaryUseCase {

    constructor(
        private readonly scenaryRepository: ScenaryRepository
    ){}

    async execute(scenary: Scenary): Promise<Scenary> {
        const scenarySaved = await this.scenaryRepository.saveScenary(scenary);

        return scenarySaved;
    }

}