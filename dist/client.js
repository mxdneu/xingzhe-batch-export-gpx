"use strict";
const axios = require('axios');
const xingzhe_config = require('./config');
const client = axios.create({
    headers: {
        cookie: xingzhe_config.xingzhe_cookie
    }
});
const get = (url, params) => {
    return client.get(url, { params });
};
const post = (url, params) => {
    return client.post(url, Object.assign({}, params));
};
module.exports = { get, post };
