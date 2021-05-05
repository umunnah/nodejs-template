import {
    env,
    src_path,
}                           from "../helpers/core.helper.js"
import { MIGRATIONS_TABLE } from "./../constants/DBTables.js"

export default {
    client: env("DB_CLIENT",'postgresql'),
    connection: {
        host: env("DB_HOST",'localhost'),
        port: env("DB_PORT",'3306'),
        database: env("DB_NAME",'test'),
        user: env("DB_USER",'root'),
        password: env("DB_PASS",'root'),
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: MIGRATIONS_TABLE,
        directory: src_path("database/migrations"),
    },
    seeds: {
        directory: src_path("database/seeds"),
    },
    acquireConnectionTimeout: 10000 // to timeout in 10
}
