import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CacheService } from './../../services/cache-service';

import * as md5 from 'md5';

/**
 * The middleware can be used on GET endpoints to cache the results of a query search. 
 */
@Injectable()
export class CachingMiddlerware implements NestMiddleware {
  constructor(public cacheService: CacheService){

  }
  async use(req: Request, res: Response, next: Function) {
      const key = md5(`${req.url}${JSON.stringify(req.query)}`);
      const result = await this.cacheService.get(key, null);
      if(result){
        console.info(`Cache Hit ${key}`);
        return res.json(result);
      }
      else{
        console.info(`Cache Miss ${key}`);
        next();
      }
  }
}