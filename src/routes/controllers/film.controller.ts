import { Controller, Get, Post, Param, Body, Req, UseFilters } from '@nestjs/common';
import { CommentDto } from '../../dto/comment.dto';

import { FilmManager } from './../../managers/film.manager';

import { HttpExceptionFilter } from './../middlewares/http.filter.exception';

@UseFilters(new HttpExceptionFilter())
@Controller('/films')
export class FilmController {
  constructor(private readonly filmManager: FilmManager) {}

  @Get('/')
  async getFilms(): Promise<any> {
      return await this.filmManager.getFilmsSortedByReleaseAndComments();
  }

  @Get('/:id/characters')
  async getFilmCharacters(@Param('id') id: string){
    return await this.filmManager.getFilmCharacters(id);
  }

  @Get(':id/comments/')
  async getFilmComments(@Param('id') id: string){
    return await this.filmManager.getFilmComments(id);
  }
  @Post(':id/comments/')
  async addFilmComment(@Param('id') id: string, @Body() comment: CommentDto, @Req() request){

    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    comment.filmId = id;
    comment.ip = ip;

    const film = await this.filmManager.getFilm(id);
    if(!film)
      throw new Error('The film resource doesn\'t exists');
    comment.filmName = film.title;
    return await this.filmManager.addComment(comment);
  }
}
