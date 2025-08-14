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
    fetch(`${opts.userServiceUrl}/api/docs`),
    fetch(`${opts.trainingServiceUrl}/api/docs`)
  ]);

  const userSpecData = userSpec.ok && await userSpec.json();
  const trainingSpecData = trainingSpec.ok && await trainingSpec.json();

  let specFailure = false;
  if (!userSpecData) {
    console.log(`Failed to retrieve User Service API docs, received ${userSpec.status}`);
    specFailure = true;
  }

  if (!trainingSpecData) {
    console.log(`Failed to retrieve Training Service API docs, received ${trainingSpec.status}`);
    specFailure = true;
  }

  if (specFailure) {
    return res.status(500).send('Failed to retrieve API docs');
  }

  const swaggerSpec = merge.all([trainingSpecData, userSpecData, baseSpec]);
  res.status(200).send(swaggerSpec);
};
