import { USERS_TABLE } from "./../../constants/DBTables"


export const up = knex => {
let uuidGenerationRaw;
  if (knex.client.config.client === 'sqlite3') {
      uuidGenerationRaw = `(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))`;
  }
  if (knex.client.config.client === 'pg') {
     knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    uuidGenerationRaw = `uuid_generate_v4()`;
  }
  return knex.schema.createTable(USERS_TABLE, table => {
    table.uuid("id").primary().defaultTo(knex.raw(uuidGenerationRaw)).index()
    table.string("email").unique().notNullable()
    table.string("username").unique().notNullable()
    table.string("password").notNullable()
    table.string("first_name").index()
    table.string("last_name").index()
    table.jsonb("metadata").nullable()
    table.string("picture").nullable()
    table.timestamp("email_verfied_at").nullable()
    table.string("role").nullable()

    // table.integer("created_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)
    // table.integer("updated_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)
    // table.integer("deleted_by").unsigned().nullable().index().references("id").inTable(USERS_TABLE)

    table.timestamps(true, true)
    table.timestamp("deleted_at")
})
}

export const down = knex => knex.schema.dropTable(USERS_TABLE)
