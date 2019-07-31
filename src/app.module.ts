import { Module } from '@nestjs/common';
import Controllers from './routes';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { StarWarsAPI } from './services';
import { CacheService } from './services/cache-service';
import { FilmManager } from './managers/film.manager';
import { CharacterManager } from './managers/character-manager';
import { EntityManager } from 'typeorm';
import { HttpExceptionFilter } from './routes/middlewares/http.filter.exception';


@Module({
  imports: [DBModule],
  controllers: [...Controllers],
  providers: [AppService, StarWarsAPI, FilmManager, EntityManager, CacheService, CharacterManager, HttpExceptionFilter],
})
export class AppModule {}
