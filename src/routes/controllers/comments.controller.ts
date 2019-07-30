import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller()
export class CommentsController {
  constructor() {}

  @Get()
  getComments(): any {
      return 'Crazy';
  }
}
