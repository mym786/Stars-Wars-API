import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import Controllers from './routes';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { StarWarsAPI } from './services';
import { CacheService } from './services/cache-service';
import { FilmManager } from './managers/film.manager';
import { CharacterManager } from './managers/character-manager';
import { CommentsManager } from './managers/comment.manager';
import { EntityManager } from 'typeorm';
import { HttpExceptionFilter } from './routes/middlewares/http.filter.exception';
import { CachingMiddlerware } from './routes/middlewares/caching.middlewares';


@Module({
  imports: [DBModule],
  controllers: [...Controllers],
  providers: [AppService, StarWarsAPI, FilmManager, EntityManager, CacheService, CharacterManager, HttpExceptionFilter, CommentsManager],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CachingMiddlerware)
      .forRoutes({ path: 'characters', method: RequestMethod.GET });
  }
}
