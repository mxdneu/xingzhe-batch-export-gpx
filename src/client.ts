const axios = require('axios');
const xingzhe_config = require('./config');

const client = axios.create({
  headers: {
    cookie: xingzhe_config.xingzhe_cookie
  }
});

const get = (url: string, params?: any) => {
  return client.get(url, { params });
}

const post = (url: string, params?: any) => {
  return client.post(url, { ...params });
}

module.exports = { get, post };