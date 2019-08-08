import { Controller, Get, Post, Param, Body, Query, UseFilters, Req } from '@nestjs/common';
import * as md5 from 'md5';

import { CharacterManager } from './../../managers/character-manager';
import { CacheService } from './../../services/cache-service';
import { CharacterQueryParams } from './../../dto/query-params/character.query.params';
import { Helper } from './../../utils/helper';
import envProivder from './../../utils/env-provider';

import { HttpExceptionFilter } from './../middlewares/http.filter.exception';


@Controller('/characters')
@UseFilters(new HttpExceptionFilter())
export class CharacterController {
  constructor(private readonly characterManager: CharacterManager, private cacheService: CacheService) {}

  @Get()
  async getCharacters(@Req() req, @Query() params: CharacterQueryParams): Promise<any> {
      const { gender, sortBy, order } = params;
      const characters = await this.characterManager.getCharactersByFilterAndSorted({
        gender
      }, sortBy, order);

      const response = CharacterControllerHelper.calculateCharacterHeights(characters);

      // update cache
      const key = md5(`${req.url}${JSON.stringify(req.query)}`);
      this.cacheService.set(key, response, {
        expire: envProivder.SYSTEM_CONSTANTS.DATA_FRESHNESS_CHARACTERS
      });

      return response;
  }

  @Get(':id')
  async getFilmCharacters(@Param('id') id: string) {
    return await this.characterManager.getCharacter(id);
  }
}

class CharacterControllerHelper{
  static calculateCharacterHeights(characters){
    let skipped = 0;
      const totalHeight = characters.map(c => c.height).reduce((total, value) => {

        if(envProivder.SYSTEM_CONSTANTS.HADNLE_HEIGHTS_UNDEFINED_TO_BE_ZERO && value === 'unknown')
          return total;
        if(!envProivder.SYSTEM_CONSTANTS.HADNLE_HEIGHTS_UNDEFINED_TO_BE_ZERO && value === 'unknown'){
          ++skipped;
          return total;
        }
        return total + parseFloat(value)},0);

      const { feet, inches } = Helper.toFeetAndInches(totalHeight);

      const response = {
        data: characters,
        metadata: {
          totalHeight:{
            // set skipped only value is there
            skipped: !skipped && skipped,
            cm: totalHeight,
            feet,
            inches,
          }
        }
      }
      return response;
  }
  
}
