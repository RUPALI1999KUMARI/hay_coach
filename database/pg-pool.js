

import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv'
dotenv.config()

var config = {
    connectionString: process.env.STAGE_CONNECTION_STRING, 
    max: 5,
    idleTimeoutMillis: 300000,
    connectionTimeoutMillis: 20000
}

var pool;
export function getPool () {
        if (pool) return pool; // if it is already there, grab it here

        pool = new Pool(config);
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query('SELECT NOW()', (err, result) => {
                release()
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                console.log(result.rows[0]);
            })
        });

        return pool;
    }


export const db = getPool();