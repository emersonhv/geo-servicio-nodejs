import { DaneRepository } from "../../repositories/dane.repository";
import { Dane } from "./interface/dane.interface";

interface GetDaneUsecase {
    execute(floodId: string): Promise<Dane>
}

export class GetDaneByFlood implements GetDaneUsecase {

    constructor(
        private readonly daneRepository: DaneRepository
    ) {}

    async execute(floodId: string): Promise<Dane> {
        
        const dane = await this.daneRepository.getDaneByFlood(floodId);

        return dane;
    }


}