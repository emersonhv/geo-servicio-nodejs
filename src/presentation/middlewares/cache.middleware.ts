import { NextFunction, Request, Response } from "express";
import { RedisInstance } from "../../data/redis/redis-database";
import { error } from "console";

export class CacheMiddleware {

    static getCache = async (req: Request, res: Response, next: NextFunction) => {

        let client = RedisInstance.getInstance();
        if (!client.alreadyOpened()){
            client.connect();
        }
        client.getValue(req.originalUrl)
            .then((data) => {
                if (data) {
                    res.status(200).send(JSON.parse(data));
                } else {
                    next();
                }
            }).catch((error) => {
                console.log(`Error on cache: ${error}`)
            });
    }
}