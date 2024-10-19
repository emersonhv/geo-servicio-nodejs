
export class GetScenaryDto {

    private constructor(
        public id: string,
        public name: string,
        public description: string,
        public autor: string,
        public year: string
    ) {}

    static create(object: {[key: string]: any}) : [string?, GetScenaryDto?]{

        const {
            id,
            name,
            description,
            autor,
            year
        } = object;

        if ( !name ) return ['Missing name'];
        if ( !description ) return ['Missing description'];
        //if ( !year ) return ['Missing year'];

        return [
            undefined,
            new GetScenaryDto(
                id,
                name,
                description,
                autor,
                year
            )
        ];
    }
}