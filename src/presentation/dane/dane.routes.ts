import { Router } from "express";
import { DaneDataourceImpl } from "../../infrastructure/datasources/dane.datasource.impl";
import { DaneRepositoryImp } from "../../infrastructure/repositories/dane.repository.impl";
import { DaneController } from "./dane.controllers";
import { CacheMiddleware } from "../middlewares/cache.middleware";

export class DaneRoutes {

    static get routes() : Router {

        const router = Router();
        const daneDatasource = new DaneDataourceImpl();
        const daneRepository = new DaneRepositoryImp(daneDatasource);
        const daneController = new DaneController(daneRepository);

        router.get('/dane/:floodid', CacheMiddleware.getCache, daneController.getDaneByFlood);
        router.post('/dane', daneController.saveDane);

        return router;
    }
}