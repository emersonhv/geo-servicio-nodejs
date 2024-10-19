import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ScenaryDatasourceImpl } from "../../infrastructure/datasources/scenary.datasource.impl";
import { ScenaryRepositoryImp } from "../../infrastructure/repositories/scenary.repository.impl";
import { ScenaryController } from "./scenary.controllers";

export class ScenaryRoutes {
    static get routes() : Router {

        const router = Router();
        const datasource = new ScenaryDatasourceImpl();
        const scenaryRepository = new ScenaryRepositoryImp(datasource);
        const controller = new ScenaryController(scenaryRepository);

        router.get('/scenary', controller.getAllScenary); //AuthMiddleware.validatwJWT
        router.post('/scenary', controller.saveScenary);

        return router;
    }
}