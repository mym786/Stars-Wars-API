import { Controller, Get, Post, Param, Body, UseFilters, Req } from '@nestjs/common';

import { CommentsManager } from './../../managers/comment.manager';

import { CacheService } from './../../services/cache-service';

import { Comment } from './../../db/entities/comment.entities';

import * as md5 from 'md5';

import envProivder from './../../utils/env-provider';


import { HttpExceptionFilter } from './../middlewares/http.filter.exception';

@UseFilters(new HttpExceptionFilter())
@Controller('/comments')
export class CommentsController {
  constructor(private commentManager: CommentsManager, private cacheService: CacheService) {}

  @Get()
  async getComments(@Req() req): Promise<Comment[]> {
      const comments = await this.commentManager.getAllComments();
      const key = md5(`${req.url}${JSON.stringify(req.query)}`);
      this.cacheService.set(key, comments, {
        expire: envProivder.SYSTEM_CONSTANTS.DATA_FRESHNESS_COMMENTS
      });
      return comments;

  }
}
