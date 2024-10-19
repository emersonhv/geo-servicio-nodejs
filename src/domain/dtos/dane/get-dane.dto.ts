import { FloodLayerEntity } from "../../entities/floodLayer.entity";

export class GetDaneDto {
    
    private constructor(
        public name: string,
        public description: string,
        public metadata: string,
        public color: string,
        public geometry: JSON,
        public flood: FloodLayerEntity,
        public visible: boolean
    ) {}

    static create(object: {[key: string]: any}) : [string?, GetDaneDto?]{

        const { 
            name,
            description,
            metadata,
            color,
            geometry,
            flood,
            visible
        } = object;

        if ( !name ) return ['Missing name'];
        if ( !description ) return ['Missing description'];
        if ( !metadata ) return ['Missing metadata'];
        if ( !color ) return ['Missing color'];
        if ( !geometry ) return ['Missing geometry'];
        if ( !flood ) return ['Missing flood'];

        return [
            undefined,
            new GetDaneDto(
                name,
                description,
                metadata,
                color,
                geometry,
                flood,
                visible
            )
        ];
    }
}