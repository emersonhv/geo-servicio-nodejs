import { FloodLayerEntity } from "../entities/floodLayer.entity";

export abstract class FloodDatasource {

    abstract getAllFloods(): Promise<FloodLayerEntity[]>;
    
    abstract getFloodsByCaptainAndScenary(portCaptainId: string, scenaryId: string): Promise<FloodLayerEntity[]>;

    abstract getFloodByCaptainAndScenary(portCaptainId: string, scenaryId: string): Promise<FloodLayerEntity>;

    abstract saveFlood(flood: FloodLayerEntity): Promise<FloodLayerEntity>;

}