
import { Injectable } from '@nestjs/common';
import envProvider from './../utils/env-provider';
/**
 * Abstracts the cache providers 
 */
@Injectable()
export class CacheService {

    // naive cache implementaion 
    private cacheProivder = new RedisCacheProvider({
        host: envProvider.REDIS_ENV.HOST,
        port: envProvider.REDIS_ENV.PORT,
    });

    /**
     * 
     * @param key 
     * @param value value should be of type an object
     */
    async set(key, value){
        if(!value || typeof value !== 'object')
            throw new Error('Cache Service set accepts an object')
        return await this.cacheProivder.set(key, JSON.stringify(value));
    }

    async get(key){
        return await this.cacheProivder.get(key);
    }

    async isKey(key){
        return await this.cacheProivder.hasKey(key);
    }

}

interface CacheProvider{
    set(key, value): Promise<any>;
    get(key): Promise<any>;
    hasKey(key): Promise<any>;
}
class LocalCacheProvider implements CacheProvider{
    private cache = {};

    async set(key: any, value: any) {
        this.cache[key] = value;
    }
    async get(key: any) {
        return this.cache[key] || null;
    }
    async hasKey(key: any) {
        return this.cache[key] !== undefined;
    }

}

import * as redis from 'redis';
import * as bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
class RedisCacheProvider implements CacheProvider{
    private client;
    constructor(opts){
        this.client = redis.createClient(opts);
    }
    async set(key: any, value: any): Promise<any> {
        return await this.client.set(key, value.toString());
    }
    async get(key: any): Promise<any> {
        const value = await this.client.getAsync(key);
        return JSON.parse(value);
    }
    async hasKey(key: any): Promise<any> {
        return (await this.client.getAsync(key)) != null; 
    }

    
}