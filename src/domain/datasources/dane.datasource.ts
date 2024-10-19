import { DaneLayerEntity } from "../entities/daneLayer.entity";

export abstract class DaneDatasource {
    
    abstract getDane(floodId: string): Promise<DaneLayerEntity>;

    abstract saveDane(dane: DaneLayerEntity, floodId: string): Promise<DaneLayerEntity>;

}