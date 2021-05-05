import { USERS_TABLE } from "./../../constants/DBTables"

export const up = knex => knex.schema.createTable(USERS_TABLE, table => {
    table.uuid("id").unique()
    table.string("email").unique().notNullable().index()
    table.string("username").unique().notNullable().index()
    table.string("password").notNullable()
    table.string("first_name").index()
    table.string("last_name").index()
    table.jsonb("metadata").nullable()
    table.string("picture").nullable()
    table.string("email_verfied_at")
    table.string("role")

    // table.integer("created_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)
    // table.integer("updated_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)
    // table.integer("deleted_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)

    table.timestamps(true, true)
    table.timestamp("deleted_at")
})

export const down = knex => knex.schema.dropTable(USERS_TABLE)
