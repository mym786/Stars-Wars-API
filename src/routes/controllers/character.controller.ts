import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { StarWarsAPI } from './../../services';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly starWarsAPI: StarWarsAPI) {}

  @Get()
  async getCharacters(): Promise<any> {
      return await this.starWarsAPI.getCharacters();
  }
}
