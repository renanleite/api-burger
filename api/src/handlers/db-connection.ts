import pg from 'pg';

const createDbClient = () => {
    return new pg.Client({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
        },
    });
};

export { createDbClient };
