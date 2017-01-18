const { DB_USER, DB_PASS, DB_HOST, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

module.exports = {
  db_host: DB_HOST,
  db_user: DB_USER,
  db_pass: DB_PASS,
  cloud_name: CLOUD_NAME,
  cloud_api_key: CLOUD_API_KEY,
  cloud_api_secret: CLOUD_API_SECRET
};