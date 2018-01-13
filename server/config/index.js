/**
 * Created by awei on 2017/3/17.
 */

const db = require('./mysql');

module.exports = {
    db: db,
    cookieOptions: {
        maxAge: 3600 * 24 * 365 * 1000 * 3,
        path: '/',
    },
    port: 3002,
    socket_port: 4002,
};