
module.exports = Object.freeze({
    DB_HOST: process.env.DB_HOST || 'localhost', DB_USER: process.env.DB_USER || 'postgres', DB_PASSWORD: process.env.DB_PASSWORD, DB_NAME: process.env.DB_NAME || 'dogs', DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT || 3000
})
