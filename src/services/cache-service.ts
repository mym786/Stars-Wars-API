
import { Injectable } from '@nestjs/common';

/**
 * Abstracts the cache providers 
 */
@Injectable()
export class CacheService {

    // naive cache implementaion 
    private cache = {};

    set(key, value){
        this.cache[key] = value;
    }

    get(key){
        return this.cache[key] || null;
    }

    isKey(key){
        return this.cache[key] !== undefined;
    }

}