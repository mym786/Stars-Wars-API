import { Controller, Get, Post, Param, Body, UseFilters } from '@nestjs/common';

import { CommentsManager } from './../../managers/comment.manager';

import { Comment } from './../../db/entities/comment.entities';


import { HttpExceptionFilter } from './../middlewares/http.filter.exception';

@UseFilters(new HttpExceptionFilter())
@Controller()
export class CommentsController {
  constructor(private commentManager: CommentsManager) {}

  @Get()
  async getComments(): Promise<Comment[]> {
      return await this.commentManager.getAllComments();
  }
}
