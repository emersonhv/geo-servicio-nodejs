import { ScenaryEntity } from "../entities/scenary.entity";

export abstract class ScenaryDatasource {

    abstract getAllScenary(): Promise<ScenaryEntity[]>;
    
    abstract saveScenary(scenary: ScenaryEntity): Promise<ScenaryEntity>;
        
}