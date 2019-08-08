const DB_ENVS = {
    COMMENT_TABLE_NAME: 'comment',
    DB:{
        DBTYPE: "postgres",
        HOST: process.env.DB_HOST || 'localhost',
        PORT: process.env.DB_PORT && parseInt(process.env.DB_PORT) || 5432,
        USER: process.env.DB_USER || 'postgres',
        PASS: process.env.DB_PASS || 'postgres',
        DB: process.env.DB || 'paystack'
    }
}

const REDIS_ENV = {
    HOST: process.env.REDIS_HOST || 'redis-cache',
    PORT: process.env.REDIS_PORT || 6379,
}

const SYSTEM_CONSTANTS = {
    FILM_CACHE_KEY: 'FILM_KEY',
    CHARACTER_CACHE_KEY: 'CHARACTER_KEY',
    CHARACTERS_SORTBALES:['name', 'gender', 'height'],
    SKIP_HEIGHT_CALCULATION: process.env.envProivder || false,
    HADNLE_HEIGHTS_UNDEFINED_TO_BE_ZERO: process.env.HADNLE_HEIGHTS_UNDEFINED_TO_BE_ZERO || true,
    DATA_FRESHNESS_COMMENTS: process.env.DATA_FRESHNESS_COMMENTS || 20,
    DATA_FRESHNESS_CHARACTERS: process.env.DATA_FRESHNESS_CHARACTERS || 1000,
}

const ROUTES = {
    CHARACTERS: '/characters'
}


export default{
    DB_ENVS,
    SYSTEM_CONSTANTS,
    ROUTES,
    REDIS_ENV
}