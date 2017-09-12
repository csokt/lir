import knex from 'knex'

export const pg = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'tibor',
    password : 'tiborc',
    database : 'raktar'
  }
})
