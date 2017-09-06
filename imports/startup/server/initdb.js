import knex from 'knex'

export const mssql = knex({
  client: 'mssql',
  connection: {
    host : '192.168.0.2\\PROLIANTML350',
    user : 'informix',
    password : 'informix',
    database : 'SzefoModulKeszlet'
  }
})
