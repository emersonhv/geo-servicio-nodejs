
export class GetPortCaptaincyDto {

    private constructor(
        public id?: string,
        public name?: string,
        public shortName?: string,
        public description?: string,
        public metadata?: string,
        public color?: string,
        public geometry?: JSON
    ) {}

    static create(object: {[key: string]: any}) : [string?, GetPortCaptaincyDto?]{

        const {
            id,
            name,
            shortName,
            description,
            metadata,
            color,
            geometry
        } = object;

        //if ( !name ) return ['Missing name'];
        if ( !shortName ) return ['Missing short name'];
        //if ( !description ) return ['Missing description'];
        //if ( !metadata ) return ['Missing metadata'];
        //if ( !geometry ) return ['Missing geometry'];

        return [
            undefined,
            new GetPortCaptaincyDto(
                id,
                name,
                shortName,
                description,
                metadata,
                color,
                geometry
            )
        ];
    }
}