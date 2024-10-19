import { ScenaryEntity } from "../entities/scenary.entity";

export abstract class ScenaryRepository {

    abstract getAllScenary(): Promise<ScenaryEntity[]>;

    abstract saveScenary(scenary: ScenaryEntity): Promise<ScenaryEntity>;
}