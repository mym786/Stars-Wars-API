import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CommentDto } from '../../dto/comment.dto';

import { FilmManager } from './../../managers/film.manager';

@Controller('/films')
export class FilmController {
  constructor(private readonly filmManager: FilmManager) {}

  @Get('/')
  async getFilms(): Promise<any> {
      return await this.filmManager.getFilmsSortedByReleaseAndComments();
  }

  @Get('/characters/:id')
  getFilmCharacters(@Param('id') id: string) {

  }
  @Get(':id/comments/')
  getFilmComments(@Param('id') id: string){

  }
  @Post(':id/comments/')
  async addFilmComment(@Param('id') id, @Body() comment: CommentDto){
    comment.filmId = id;
    return await this.filmManager.addComment(comment);
  }
}
