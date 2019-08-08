
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

        const filterAttributes = Object.keys(filter);
        
        filterAttributes && filterAttributes.map((attribute) => {
            // filter out null values
            if(attribute){
                const value = filter[attribute];
                if(value) 
                    characters = characters.filter(c => c[attribute] == value);
            }
        })
        return characters.sort(Helper.sorter(sortBy, {
            ...CharacterHelper.getCharacterAttributeType(sortBy),
            asc: order === 'asc' ? true : false,
        }));


    }

    async getCharacters(): Promise<Array<CharacterInterface>>{
        if( await this.cacheService.isKey(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY, null) ){
            const charactes = await this.cacheService.get(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY, null);
            return Object.values(charactes);
        }
        const charactes = await this.starWarsAPI.getCharacters();

        const characterMap = Helper.toSet(charactes, 'id');
        this.cacheService.set(envprovider.SYSTEM_CONSTANTS.CHARACTER_CACHE_KEY, characterMap, null);
        return charactes;
    }

    async getCharacter(id): Promise<CharacterInterface>{
        const characters = await this.getCharacters();
        return characters && characters.filter(c => c.id == id).shift();
    }

    async getCharactersByIds(ids){
        let characterIds = Array.isArray(ids) ? ids : [ids];
        
        const characters = await this.getCharacters();

        return characters && characters.filter(c => characterIds.includes(c.id));

    }

}

class CharacterHelper{
    static getCharacterAttributeType(attribute){
        switch(attribute){
            case 'name':
                return {
                    type: 'string',
                }
            case 'gender':
                return {
                    type: 'string'
                }
            case 'height':
                return {
                    type: 'number'
                }
            default:
                return {
                    type: 'string',
                }
        }
    }
}