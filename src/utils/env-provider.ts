const DB_ENVS = {
    COMMENT_TABLE_NAME: 'comment',
    DB:{
        HOST: process.env.DB_HOST || 'localhost',
        PORT: parseInt(process.env.DB_PORT) || 3306,
        USER: process.env.DB_USER || 'root',
        PASS: process.env.DB_PASS || 'password',
        DB: process.env.DB || 'paystack'
    }
}

const SYSTEM_CONSTANTS = {
    FILM_CACHE_KEY: 'FILM_KEY',
    CHARACTER_CACHE_KEY: 'CHARACTER_KEY',
    CHARACTERS_SORTBALES:['name', 'gender', 'height'],
    SKIP_HEIGHT_CALCULATION: process.env.envProivder || false,
    HADNLE_HEIGHTS_UNDEFINED_TO_BE_ZERO: process.env.HADNLE_HEIGHTS_UNDEFINED_TO_BE_ZERO || true,
}

const ROUTES = {
    CHARACTERS: '/characters'
}


export default{
    DB_ENVS,
    SYSTEM_CONSTANTS,
    ROUTES
}