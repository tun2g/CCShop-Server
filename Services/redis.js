const redis = require('redis');
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log('Something went wrong ' + err);
}
);

module.exports = client;

