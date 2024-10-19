import { Request, Response } from "express";
import { CustomError } from "../../domain";
import Logger from "../../config/logger";
import { FloodRepository } from "../../domain/repositories/flood.repository";
import { GetFloodsByCaptainAndScenary } from "../../domain/use-cases/flood/get-floods-by-captain-scenary.usecase";
import { GetFloodByCaptainAndScenary } from "../../domain/use-cases/flood/get-flood-by-captain-scenary.usecase";
import { RedisInstance } from "../../data/redis/redis-database";
import { SaveFlood } from "../../domain/use-cases/flood/save-flood.usecase";

export class FloodController {

    constructor(
        private readonly floodRepository: FloodRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    getFloodsByCaptainAndScenary = (req: Request, res: Response) => {

        const { captainid, scenaryid } = req.params;

        new GetFloodsByCaptainAndScenary(this.floodRepository)
            .execute(captainid, scenaryid)
            .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data));
                res.json(data);
            })
            .catch(error => this.handleError(error, res));
    }

    getFloodByCaptainAndScenary = (req: Request, res: Response) => {

        const { captainid, scenaryid } = req.params;

        new GetFloodByCaptainAndScenary(this.floodRepository)
            .execute(captainid, scenaryid)
            .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data));
                res.json(data);
            }).catch(error => this.handleError(error, res));
    }

    private setDataCache = (nameSet: string, millisec: number, json: string) => {
        const client = RedisInstance.getInstance();
        if (!client.alreadyOpened()){
            client.connect();
        }
        client.setValue(nameSet, millisec, json)
            .catch(error => console.log(`Error messaje: ${error}`));
    }

    saveFlood = (req: Request, res: Response) => {
        let floodForm = req.body;
        const floodGeometry = req.files?.geometry;
        if(floodGeometry) {
            floodForm.geometry = JSON.stringify((floodGeometry as any).data.toString('ascii'))
        }
        new SaveFlood(this.floodRepository)
            .execute(floodForm)
            .then((data) => {
                res.json(data);
            }).catch(error => this.handleError(error, res));
    }
}