import { DaneLayerModel } from "../../data/postgres";
import { CustomError } from "../../domain";
import { DaneLayerEntity } from "../../domain/entities/daneLayer.entity";

export class DaneMapper {

    static daneEntityFromObject(object: {[key: string]:any}) {
        
        const {
            id, _id, name, description, color, metadata, geometry, flood_id, visible
        } = object;
 
        if (!id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (!description) {
            throw CustomError.badRequest('Missing description');
        }

        if (!color) {
            throw CustomError.badRequest('Missing color');
        }
        
        if (!metadata) {
            throw CustomError.badRequest('Missing metadata');
        }
        
        if (!geometry) {
            throw CustomError.badRequest('Missing geometry');
        }

        if (!flood_id) {
            throw CustomError.badRequest('Missing port captain id');
        }

        if (!visible) {
            throw CustomError.badRequest('Missing visible');
        }

        return new DaneLayerEntity(
            _id || id,
            name,
            description,
            color, 
            metadata,
            flood_id,
            geometry,
            visible
        );
    }
}