import { PortCaptaincyModel } from "../../data/postgres";
import { CustomError } from "../../domain";
import { PortCaptaincyEntity } from "../../domain/entities/portCaptaincy.entity";


export class PortCaptaincyMapper {

    private static portCaptainsList: PortCaptaincyEntity[] = [];

    static listPortCaptainsEntityFromListObject(object: PortCaptaincyModel[]) {

        this.portCaptainsList.splice(0, this.portCaptainsList.length);

        object.forEach(captain => {
            this.portCaptainsList.push(this.portCaptainsEntityFromObject(captain));
        });

        return this.portCaptainsList;
    }

    static portCaptainsEntityFromObject(object: {[key: string]:any}){

        const {id, _id, name, shortName, description, metadata, color, geometry} = object;

        if (!id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (!shortName) {
            throw CustomError.badRequest('Missing short name');
        }

        if (!description) {
            throw CustomError.badRequest('Missing description');
        }
        /**
         * TODO: agregar informacion a metadata
        */
        if (!metadata) {
            throw CustomError.badRequest('Missing metadata');
        }
        /**
         * TODO: agregar informacion a geometry
        */
        if (!geometry) {
            throw CustomError.badRequest('Missing geometry');
        }
        
        return new PortCaptaincyEntity(
            _id || id,
            name,
            shortName, 
            description, 
            metadata,
            color,
            geometry
        );
    }

}