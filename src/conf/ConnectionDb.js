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
    user: this.user,
    database: this.database,
    password: this.password,
    port: this.port,
    host: this.host,
    ssl: this.ssl
      ?   {
        require: false, 
        rejectUnauthorized: false
      }
      : false
  });
}

module.exports = {ConnectionPool}