import { DaneRepository } from "../../repositories/dane.repository";
import { Dane } from "./interface/dane.interface";

interface SaveDaneUseCase {
    execute(dane: Dane, floodId: string): Promise<Dane>
}

export class SaveDane implements SaveDaneUseCase {

    constructor(
        private readonly daneRepository: DaneRepository
    ) {}

    async execute(dane: Dane, floodId: string): Promise<Dane> {
        const daneSaved =  await this.daneRepository.saveDate(dane, floodId);

        return daneSaved;
    }

}