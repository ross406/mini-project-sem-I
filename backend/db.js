const { Pool } = require("pg");
// const pg = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  port: 5432,
  database: "jwttutorial",
});

// const cs = "postgres://postgres:postgres@localhost:5432/jwttutorial";
// const client = new pg.Client(cs);
// client.connect();

// client
//   .query("SELECT * FROM users")
//   .then((res) => {
//     const fields = res.fields.map((field) => field.user_name);

//     console.log(fields);
//   })
//   .catch((err) => {
//     console.log(err.stack);
//   })
//   .finally(() => {
//     client.end();
//   });

// console.log(pool);

module.exports = pool;
