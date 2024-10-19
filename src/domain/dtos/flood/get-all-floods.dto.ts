import { PortCaptaincyEntity } from "../../entities/portCaptaincy.entity";
import { ScenaryEntity } from "../../entities/scenary.entity";

export class GetAllFloodsDto {

    private constructor(
        public name: string,
        public shortName: string,
        public description: string,
        public metadata: string,
        public geometry: string,
        public portCaptain: PortCaptaincyEntity,
        public scenary: ScenaryEntity,
    ) {}

    static create(object: {[key: string]: any}) : [string?, GetAllFloodsDto?]{

        const { 
            name,
            shortName,
            description,
            metadata,
            geometry,
            portCaptain,
            scenary
        } = object;

        if ( !name ) return ['Missing name'];
        if ( !shortName ) return ['Missing short name'];
        if ( !description ) return ['Missing description'];
        if ( !metadata ) return ['Missing metadata'];
        if ( !geometry ) return ['Missing geometry'];
        if ( !portCaptain ) return ['Missing port captain'];
        if ( !scenary ) return ['Missing scenary'];

        return [
            undefined,
            new GetAllFloodsDto(
                name,
                shortName,
                description,
                metadata,
                geometry,
                portCaptain,
                scenary
            )
        ];
    }
}