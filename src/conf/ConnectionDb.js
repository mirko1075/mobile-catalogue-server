const Pool = require('pg').Pool
class ConnectionPool { 
  constructor(user, database, password, port, host, ssl) { 
    this.user = user;
    this.database=database;
    this.password=password;
    this.port=port;
    this.host=host;
    this.ssl=ssl
  }
  pool = new Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    ssl: this.ssl
      ?   {
        rejectUnauthorized:false
      }
      : false
  });
}

module.exports = {ConnectionPool}