import { LayerEntity } from "./layer.entity";

export class FloodLayerEntity extends LayerEntity {

    constructor(
        public id: string,
        public name: string,
        public shortName: string,
        public description: string,
        public area_km2: string,
        public color: string,
        public metadata: string,
        public portCaptainId: string,
        public scenaryId: string,
        public geometry: JSON
    ) {
        super(name, description, metadata);
    }
}