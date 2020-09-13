const { Pool } = require('pg');
const Settings = require('./settings')

const pool = new Pool({
    user: Settings.username,
    host: Settings.host,
    database: Settings.database,
    password: Settings.password,
    port: Settings.port,
});

module.exports = {
    query: (text, params, callback) => {
        // place logging code here, if applicable
        return pool.query(text, params, callback)
    },
};