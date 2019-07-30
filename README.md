<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints
|                                                                                               Description                                                                                               |                                                                              Endpoint                                                                             |                                                                                                                                                                                                                                                                                                                                                                          Response                                                                                                                                                                                                                                                                                                                                                                         |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                                                                                          Get All Films(Movies)                                                                                          |                                                              curl -X GET http://localhost:3000/films                                                              |                                                                                                                                                 [     {         "created": "2014-12-10T14:23:31.880000Z",         "director": "George Lucas",         "title": "A New Hope",         "episode_id": 4,         "opening_crawl": "It is,         "producer": "Gary Kurtz, Rick McCallum",         "release_date": "1977-05-25",         "edited": "2015-04-11T09:46:52.774897Z",         "id": "1",         "characters": [             "/characters/1"         ],         "number_of_comments": "2"     }]                                                                                                                                                 |
|                                                                                             Create Comments                                                                                             |                  curl -X POST \   http://localhost:3000/films/1/comments \   -H 'Content-Type: application/json' \    -d '{ 	 "comment": "Hi", }'                  |                                                                                                                                                                                                                                                                                                        {     "comment": "Hi",     "ip": "::1",     "filmId": "1",     "film": "A New Hope",     "id": 3,     "views": 0,     "isPublished": true }                                                                                                                                                                                                                                                                                                        |
| Get Characters List Characters Filters: Accepts multiple filters as query parameters filter=gender=male&filter=eye_color=brown Sorting: Accepts query parameter sortBy eg. name and order asc or desc.  | curl -X GET \   http://localhost:3000/characters?filter=gender=male \   -H 'Postman-Token: 63c64777-6e9c-4a73-accb-de823d762eae' \   -H 'cache-control: no-cache' | { "data": [         {             "id": "1",             "name": "Luke Skywalker",             "birth_year": "19BBY",             "eye_color": "blue",             "gender": "male",             "hair_color": "blond",             "height": "172",             "mass": "77",             "skin_color": "fair",             "created": "2014-12-09T13:50:51.644000Z",             "edited": "2014-12-20T21:17:56.891000Z",             "films": [                 "2",                 "6",                 "3",                 "1",                 "7"             ]         } },  "metadata": {         "totalHeight": {             "skipped": 0,             "cm": 14123,             "feet": 463,             "inches": "2.813"         }     } ] |