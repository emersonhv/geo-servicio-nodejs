import { ScenaryModel } from "../../data/postgres";
import { CustomError, ScenaryEntity } from "../../domain";


export class ScenaryMapper {

    private static scenaryList: ScenaryEntity[] = [];

    static listScennaryEntityFromListObject(object: ScenaryModel[]) {

        this.scenaryList.splice(0, this.scenaryList.length);

        object.forEach(scene => {
            this.scenaryList.push(this.scenaryEntityFromObject(scene));
        });

        return this.scenaryList;
    }

    static scenaryEntityFromObject(object: {[key: string]:any}) {

        const {id, _id, name, description, autor, year} = object;

        if (!id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (!description) {
            throw CustomError.badRequest('Missing description');
        }

        return new ScenaryEntity(
            _id || id,
            name,
            description,
            autor,
            year
        );
    }

}