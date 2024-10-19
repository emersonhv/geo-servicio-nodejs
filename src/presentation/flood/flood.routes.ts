import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CacheMiddleware } from "../middlewares/cache.middleware";
import { FloodDatasourceImpl } from "../../infrastructure/datasources/flood.datasource.impl";
import { FloodRepositoryImp } from "../../infrastructure/repositories/flood.repository.impl";
import { FloodController } from "./flood.controllers";

export class FloodRoutes {
    static get routes() : Router {

        const router = Router();
        const floofDatasource = new FloodDatasourceImpl();
        const floodRepository = new FloodRepositoryImp(floofDatasource);
        const floodController = new FloodController(floodRepository);

        router.get('/flood/:captainid/:scenaryid', CacheMiddleware.getCache, floodController.getFloodByCaptainAndScenary);
        router.get('/floods/:captainid/:scenaryid', CacheMiddleware.getCache, floodController.getFloodsByCaptainAndScenary);//, AuthMiddleware.validatwJWT
        router.post('/flood', floodController.saveFlood);

        return router;
    }
}