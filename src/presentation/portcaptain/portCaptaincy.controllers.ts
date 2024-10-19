import { Request, Response } from "express";
import { PortCaptaincyRepository } from "../../domain/repositories/portCaptaincy.repository";
import { GetAllPortCaptaincy } from "../../domain/use-cases/portcaptain/get-all-captaincy.usecase";
import { CustomError } from "../../domain";
import Logger from "../../config/logger";
import { GetPortCaptaincyByName } from "../../domain/use-cases/portcaptain/get-captaincy-by-name.usecase";
import { GetPortCaptaincyDto } from "../../domain/dtos/captain/get-captaincy.dto";

export class PortCaptaincyController {

    constructor (
        private readonly portCaptainsRepository: PortCaptaincyRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        Logger.error(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getAllPortCaptains = (req: Request, res: Response) => {
        
        new GetAllPortCaptaincy(this.portCaptainsRepository)
            .execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    getPortCaptainsByName = (req: Request, res: Response) => {
        const [error, portCaptaincyDto] = GetPortCaptaincyDto.create(req.params);

        if (error) return res.status(400).json({error});

        new GetPortCaptaincyByName(this.portCaptainsRepository)
            .execute(portCaptaincyDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }
}