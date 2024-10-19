import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { ScenaryRepository } from "../../domain/repositories/scenary.repository";
import Logger from "../../config/logger";
import { GetAllScenary } from "../../domain/use-cases/scenary/get-all-scenary.usecase";
import { SaveScenary } from "../../domain/use-cases/scenary/save-scenary.usecase";

export class ScenaryController {

    constructor (
        private readonly scenaryRepository: ScenaryRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        Logger.error(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getAllScenary = (req: Request, res: Response) => {
        
        new GetAllScenary(this.scenaryRepository)
            .execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    saveScenary = (req: Request, res: Response) => {
        const scenaryForm = req.body;

        new SaveScenary(this.scenaryRepository)
        .execute(scenaryForm)
        .then((data) => {
            res.json(data);
        }).catch(error => this.handleError(error, res));
    }
}