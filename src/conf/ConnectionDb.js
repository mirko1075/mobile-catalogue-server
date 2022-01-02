const Pool = require('pg').Pool
class ConnectionPool { 
  constructor(ssl) { 
    this.ssl=ssl
  }
  pool = new Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    ssl: this.ssl
  });
}

module.exports = {ConnectionPool}