const { DB_USER_TEST, DB_PASS_TEST, DB_HOST_TEST } = process.env;

module.exports = {
  db_host: DB_HOST_TEST,
  db_user: DB_USER_TEST,
  db_pass: DB_PASS_TEST
};