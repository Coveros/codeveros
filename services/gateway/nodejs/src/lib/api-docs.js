const unirest = require('unirest');
const merge = require('deepmerge');

const baseSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Codeveros',
    description: 'Microservice Reference Application',
    contact: {
      name: 'Coveros Support',
      url: 'http://www.coveros.com',
      email: 'info@coveros.com'
    },
    version: '1.0.0',
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC'
    }
  },
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

module.exports = opts => async (req, res) => {
  const [userSpec, trainingSpec] = await Promise.all([
    unirest.get(`${opts.userServiceUrl}/api/docs`),
    unirest.get(`${opts.trainingServiceUrl}/api/docs`)
  ]);

  let specFailure = false;
  if (!userSpec || !userSpec.ok || userSpec.error || !userSpec.body) {
    console.log(`Failed to retrieve User Service API docs, received ${userSpec.status}`);
    specFailure = true;
  }

  if (!trainingSpec || !trainingSpec.ok || trainingSpec.error || !trainingSpec.body) {
    console.log(`Failed to retrieve Training Service API docs, received ${trainingSpec.status}`);
    specFailure = true;
  }

  if (specFailure) {
    return res.status(500).send('Failed to retrieve API docs');
  }

  const swaggerSpec = merge.all([trainingSpec.body, userSpec.body, baseSpec]);
  res.status(200).send(swaggerSpec);
};
