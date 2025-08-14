require('dotenv').config();
const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const cors = require('cors');

const Authentication = require('./lib/authentication');
const apiDocs = require('./lib/api-docs');

const jsonParser = bodyParser.json();
const app = express();
const appServer = http.createServer(app);
const proxy = httpProxy.createProxyServer();

const port = process.env.PORT || 8080;

const userServiceUrl = process.env.USER_SERVICE;
const trainingServiceUrl = process.env.TRAINING_SERVICE;
const authServiceUrl = process.env.AUTH_SERVICE;

if (!userServiceUrl || !trainingServiceUrl || !authServiceUrl) {
  console.error('failed to find required endpoint targets');
  process.exit(1);
}

const authentication = Authentication({ authServiceUrl, userServiceUrl });

const services = [
  { path: ['/api/user', '/api/user/*splat'], target: userServiceUrl },
  { path: ['/api/training', '/api/training/*splat'], target: trainingServiceUrl }
];

console.log('User service endpoint: ', userServiceUrl);
console.log('Training service endpoint: ', trainingServiceUrl);
console.log('Auth service endpoint: ', authServiceUrl);

proxy.on('error', (err, req, res) => {
  if (err) {
    console.log('proxy error', err);
  }
});

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  credentials: true,
  allowedHeaders: 'Content-Type'
}));

app.get('/health-check', (req, res) => {
  res.status(200).send('OK');
});

app.use((req, res, next) => {
  console.log(`Request for ${req.path} received at ${Date.now()}`);
  next();
});

app.get('/api/docs', apiDocs({ userServiceUrl, trainingServiceUrl }));

app.post('/api/auth/register', jsonParser, authentication.register);
app.post('/api/auth/login', jsonParser, authentication.login);
app.post('/api/auth/logout', jsonParser, authentication.logout);
app.get('/api/auth/loggedin', authentication.verifyToken, authentication.loggedin);

app.get('/api/fizzbuzz', (req, res) => {
  const size = req.query.size || 0;
  const result = [];

  const getFizzBuzz = input => {
    const isFizz = input % 3 === 0;
    const isBuzz = input % 5 === 0;
    return !isFizz && !isBuzz ? input : isFizz && isBuzz ? 'Fizz Buzz' : isFizz ? 'Fizz' : 'Buzz';
  };

  for (let i = 1; i <= size; i++) {
    result.push(getFizzBuzz(i));
  }
  res.status(200).send(result);
});

services.forEach(service => {
  app.all(service.path, authentication.verifyToken, (req, res) => {
    proxy.web(req, res, { target: service.target });
  });
});

// 404 response for all other requests
app.all('*splat', (req, res) => {
  res.status(404).send('Route not found');
});

app.use((err, req, res) => {
  console.error('Error with request: ', err);
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});

appServer.listen(port, () => console.log(`Gateway listening on ${port}`));
