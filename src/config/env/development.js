const { DB_USER, DB_PASS, DB_HOST } = process.env;

module.exports = {
  db_host: DB_HOST,
  db_user: DB_USER,
  db_pass: DB_PASS
};