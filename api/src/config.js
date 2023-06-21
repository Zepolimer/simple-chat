module.exports = {
  // Docker configuration
  HOST: "mysql",
  // local without Docker
  // HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "chat_api",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};