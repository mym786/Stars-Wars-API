import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { CharacterManager } from './../../managers/character-manager';
import { Helper } from './../../utils/helper';
import envProivder from './../../utils/env-provider';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterManager: CharacterManager) {}

  @Get()
  async getCharacters(@Query('filter') filters, @Query('sortBy') sortBy,  @Query('order') order): Promise<any> {
      const characters = await this.characterManager.getCharactersByFilterAndSorted(filters, sortBy, order);

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
            inches: inches.toFixed(3),
          }
        }
      }
      return response;
  }
}
