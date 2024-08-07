const Pool = require("pg").Pool

const pool = new Pool({
   user: 'postgres',
   password: "qwerty",
   host: 'localhost',
   database: 'jwtauth0',
   port: 5432,
   });

   module.exports = pool;

