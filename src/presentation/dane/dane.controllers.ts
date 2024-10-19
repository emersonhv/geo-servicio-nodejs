import { Request, Response } from "express";
import { CustomError, DaneRepository, GetDaneByFlood, SaveDane } from "../../domain";
import Logger from "../../config/logger";
import { RedisInstance } from "../../data/redis/redis-database";

export class DaneController {

    constructor(
        private readonly daneRepository: DaneRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    private setDataCache = (nameSet: string, millisec: number, json: string) => {
        const client = RedisInstance.getInstance();
        if (!client.alreadyOpened()){
            client.connect();
        }
        client.setValue(nameSet, millisec, json)
            .catch(error => console.log(`Error messaje: ${error}`));
    }

    getDaneByFlood = (req: Request, res: Response) => {
        const { floodid } = req.params;

        new GetDaneByFlood(this.daneRepository)
            .execute(floodid)
            .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data))
                res.json(data)
            }).catch(error => this.handleError(error, res));
    }

    saveDane = (req: Request, res: Response) => {
        let daneForm = req.body;
        let { floodId } = req.params;
        const daneGeometry = req.files?.geometry;
        if(daneGeometry) {
            daneForm.geometry = JSON.stringify((daneGeometry as any).data.toString('ascii'))
        }
        new SaveDane(this.daneRepository)
            .execute(daneForm, floodId)
            .then((data) => {
                res.json(data);
            }).catch(error => this.handleError(error, res));
    }
}