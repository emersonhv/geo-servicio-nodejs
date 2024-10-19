import { DaneLayerEntity } from "../entities/daneLayer.entity";

export abstract class DaneRepository {

    abstract getDaneByFlood(floodId: string): Promise<DaneLayerEntity>;

    abstract saveDate(dane: DaneLayerEntity, floodId: string): Promise<DaneLayerEntity>;

}