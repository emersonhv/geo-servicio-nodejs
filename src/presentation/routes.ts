import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { PortCaptaincyRoutes } from "./portcaptain/portCaptaincy.routes";
import { ScenaryRoutes } from "./scenary/scenary.routes";
import { FloodRoutes } from "./flood/flood.routes";
import { DaneRoutes } from "./dane/dane.routes";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        // Definir todas mis rutas principales
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/v1/', [
            PortCaptaincyRoutes.routes,
            ScenaryRoutes.routes,
            FloodRoutes.routes,
            DaneRoutes.routes
        ]);

        return router;
    }
}