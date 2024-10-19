import { LayerEntity } from "./layer.entity";

export class PortCaptaincyEntity extends LayerEntity {

    constructor(
        public id: string,
        public name: string,
        public shortName: string,
        public description: string,
        public metadata: string,
        public color: string,
        public geometry: JSON
    ) {
        super(name, description, metadata);
    }
}