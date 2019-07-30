import { Module } from '@nestjs/common';
import Controllers from './routes';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { StarWarsAPI } from './services';
import { CacheService } from './services/cache-service';
import { FilmManager } from './managers/film.manager';
import { EntityManager } from 'typeorm';



@Module({
  imports: [DBModule],
  controllers: [...Controllers],
  providers: [AppService, StarWarsAPI, FilmManager, EntityManager, CacheService],
})
export class AppModule {}
