
import { Injectable } from '@nestjs/common';

import { CacheService } from './../services/cache-service';
import { StarWarsAPI } from './../services';

import { Helper } from './../utils/helper';

import envprovider from './../utils/env-provider';

@Injectable()
export class CharacterManager {
    constructor(private cacheService: CacheService, private starWarsAPI: StarWarsAPI){

    }

    async getCharacters(){
        if( this.cacheService.isKey(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY) ){
            const films = this.cacheService.get(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY);
            return Object.values(films);
        }
        const charactes = await this.starWarsAPI.getCharacters();

        const characterMap = Helper.toSet(charactes, 'episode_id');
        this.cacheService.set(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY, characterMap);
        return charactes;
    }

}