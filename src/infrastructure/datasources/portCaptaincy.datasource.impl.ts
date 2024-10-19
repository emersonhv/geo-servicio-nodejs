import { PortCaptaincyModel } from "../../data/postgres";
import { CustomError } from "../../domain";
import { PortCaptaincyDatasource } from "../../domain/datasources/portCaptaincy.datasource";
import { PortCaptaincyEntity } from "../../domain/entities/portCaptaincy.entity";
import { PortCaptaincyMapper } from "../mappers/portCaptaincy.mappers";
import Logger from "../../config/logger";
import { GetPortCaptaincyDto } from "../../domain/dtos/captain/get-captaincy.dto";
import { Sequelize } from "sequelize";


export class PortCaptaincyDatasourceImpl implements PortCaptaincyDatasource {

    constructor() { }

    async getAllCaptaincy(): Promise<PortCaptaincyEntity[]> {
        try {
            const captainsList = await PortCaptaincyModel.findAll({
                attributes: [
                    'id',
                    'name',
                    'shortName',
                    'description',
                    'metadata',
                    'color',
                    'geometry'
                ]
            });

            return PortCaptaincyMapper.listPortCaptainsEntityFromListObject(captainsList);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

    async getCaptaincyByName(portCaptaincyDto: GetPortCaptaincyDto): Promise<PortCaptaincyEntity> {
        try {
            const captaincy = await PortCaptaincyModel.findOne({
                where: { shortName: portCaptaincyDto.shortName },
                attributes: [
                    'id',
                    'name',
                    'shortName',
                    'description',
                    'metadata',
                    'color',
                    'geometry'
                ]
            });

            if (!captaincy) throw CustomError.badRequest('Port Captaincy not found');

            return PortCaptaincyMapper.portCaptainsEntityFromObject(captaincy);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            Logger.error(error);
            throw CustomError.internalServer();
        }
    }

}