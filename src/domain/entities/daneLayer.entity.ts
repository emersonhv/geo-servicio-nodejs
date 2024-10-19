import { LayerEntity } from "./layer.entity";

export class DaneLayerEntity extends LayerEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public color: string,
        public metadata: string,
        public floodId: string,
        public geometry: JSON,
        public visible: boolean
    ) {
        super(name, description, metadata);
    }
}