import { FloodLayerModel } from "../../data/postgres";
import { CustomError } from "../../domain";
import { FloodLayerEntity } from "../../domain/entities/floodLayer.entity";


export class FloodMapper {

    private static floodsList: FloodLayerEntity[] = [];

    static listFloodsEntityFromListObject(object: FloodLayerModel[]) {

        //this.floodsList.splice(0, this.floodsList.length);

        object.forEach(flood => {
            this.floodsList.push(this.floodsEntityFromObject(flood));
        });

        return this.floodsList;
    }

    static floodsEntityFromObject(object: {[key: string]:any}){

        const {id, _id, name, shortName, description, color, metadata, geometry, area_km2,
            port_captaincy_id, scenary_id
        } = object;

        if (!id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (!shortName) {
            throw CustomError.badRequest('Missing short name');
        }

        if (!area_km2) {
            throw CustomError.badRequest('Missing short area_km2');
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

        if (!port_captaincy_id) {
            throw CustomError.badRequest('Missing port captain id');
        }

        if (!scenary_id) {
            throw CustomError.badRequest('Missing scenary id');
        }

        return new FloodLayerEntity(
            _id || id,
            name,
            shortName, 
            description,
            area_km2,
            color, 
            metadata,
            port_captaincy_id,
            scenary_id,
            geometry
        );
    }

}