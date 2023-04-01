const redis = require('redis');
const util = require('util')

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});


client.connect()

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log('Something went wrong ' + err);
}

);
// const getAsync = util.promisify(client.get).bind(client);
// const setAsync = util.promisify(client.set).bind(client);
// const rpushAsync = util.promisify(client.rPush).bind(client);
// const lrangeAsync = util.promisify(client.lRange).bind(client);
// const hgetAsync=util.promisify(client.HGET).bind(client)
// const hsetAsync=util.promisify(client.HSET).bind(client)

module.exports = client;

