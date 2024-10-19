import { createClient, RedisClientType } from 'redis';

export class RedisInstance {

    private static instance: RedisInstance;
    private redisClient: RedisClientType;

    private constructor() {
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:7001';
        this.redisClient = createClient({
            socket:{
                connectTimeout: 4000000
            },
            url: redisUrl
        });

        this.redisClient.on('error', (err) => {
            console.error('Error en Redis:', err);
        });
        this.redisClient.on('ready', () => {
            console.log('Redis is ready');
        });
        this.redisClient.on('end', () => {
            console.log('Redis connection ended');
        });
        this.redisClient.on('connect', () => {
            console.log('Connected to Redis');
        });
    }

    public static getInstance(): RedisInstance {
        if (!RedisInstance.instance) {
            RedisInstance.instance = new RedisInstance();
        }
        return RedisInstance.instance;
    }

    async getValue(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async setValue(key: string, seg: number, json: string): Promise<string | null> {
        return this.redisClient.setEx(key, seg, json);
    }

    async connect(): Promise<RedisClientType> {
        return this.redisClient.connect();
    }

    alreadyOpened(): boolean {
        return this.redisClient.isOpen;
    }
}