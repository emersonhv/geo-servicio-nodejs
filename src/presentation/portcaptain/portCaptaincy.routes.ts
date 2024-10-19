import { Router } from "express";
import { PortCaptaincyController } from "./portCaptaincy.controllers";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PortCaptaincyRepositoryImp } from "../../infrastructure/repositories/portCaptaincy.repository.impl";
import { PortCaptaincyDatasourceImpl } from "../../infrastructure/datasources/portCaptaincy.datasource.impl";
import { CacheMiddleware } from "../middlewares/cache.middleware";

export class PortCaptaincyRoutes {
    static get routes(): Router {

        const router = Router();
        const datasource = new PortCaptaincyDatasourceImpl();
        const portCaptainsRepository = new PortCaptaincyRepositoryImp(datasource);
        const controller = new PortCaptaincyController(portCaptainsRepository);

        router.get('/portcaptaincies', controller.getAllPortCaptains);//AuthMiddleware.validatwJWT, CacheMiddleware.getCache

        router.get('/portcaptaincies/:shortName', controller.getPortCaptainsByName);// AuthMiddleware.validatwJWT, 

        return router;
    }
}