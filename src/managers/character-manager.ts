
import { Injectable } from '@nestjs/common';

import { CacheService } from './../services/cache-service';
import { StarWarsAPI } from './../services';

import { Helper } from './../utils/helper';

import envprovider from './../utils/env-provider';
import { CharacterInterface } from '../interfaces/character.interface';

@Injectable()
export class CharacterManager {
    constructor(private cacheService: CacheService, private starWarsAPI: StarWarsAPI){

    }
    /**
     * 
     * @param filter filter is a key-value pair. ex age=35
     * @param sortBy the attribtube name for sorting
     * @param order the order for the sort, default is descending
     */
    async getCharactersByFilterAndSorted(filter, sortBy, order): Promise<Array<CharacterInterface>>{
        if(sortBy && !envprovider.SYSTEM_CONSTANTS.CHARACTERS_SORTBALES.includes(sortBy))
            throw new Error('Invalid Sortby attributes provided');
        let characters = await this.getCharacters();
        
        filter && filter.map((f) => {
            // FIXME: Implement a robust logic using regex to support all operands
            const [key, value ] = f.split('=');
            if(!key || !value)
                throw new Error('UnSupported Operand');

            characters = characters.filter(c => c[key] = value);
        })
        
        return characters.sort(Helper.sorter(sortBy, {
            type: 'date',
            typeFormat: 'YYYY-MM-DD',
            asc: order === 'asc' ? true : false,
        }));


    }

    async getCharacters(): Promise<Array<CharacterInterface>>{
        if( this.cacheService.isKey(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY) ){
            const charactes = this.cacheService.get(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY);
            return Object.values(charactes);
        }
        const charactes = await this.starWarsAPI.getCharacters();

        const characterMap = Helper.toSet(charactes, 'id');
        this.cacheService.set(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY, characterMap);
        return charactes;
    }

}