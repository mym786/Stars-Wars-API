import { Injectable, OnModuleInit} from '@nestjs/common';
import * as alasql from 'alasql';

@Injectable()
export class InMemoryDB implements OnModuleInit{
    onModuleInit() {
        // initialize database
        alasql("CREATE TABLE films (created date, director string, title string, episode_id number, opening_crawl string, producer string, release_date date, edited string )");
        alasql("CREATE TABLE characters (chracter_id number, name string, birth_year string, eye_color string, gender string, hair_color string, height string, mass string, skin_color string )");
    }

    executeSql(sql){
        return alasql(sql);
    }
}