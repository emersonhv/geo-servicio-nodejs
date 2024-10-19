import { ScenaryRepository } from "../../repositories/scenary.repository";
import { Scenary } from "./interface/Scenary";


interface GetAllScenaryUseCase {
    execute() : Promise<Scenary[]>
}

export class GetAllScenary implements GetAllScenaryUseCase {

    private listScenaris:Scenary[] = [];

    constructor(
        private readonly scenaryRepository: ScenaryRepository,
    ){}
    
    async execute():Promise<Scenary[]> {
        
        const scenaris = await this.scenaryRepository.getAllScenary();
        
        scenaris.forEach(scene => {
            this.listScenaris.push({
                id: scene.id,
                name: scene.name,
                description: scene.description,
                autor: scene.autor,
                year: scene.year
            });
        });

        return this.listScenaris;
    }

}