import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinitions = {
  openapi: '3.1.1',
  info: {
    title: 'Taskmanager-app',
    version: '1.0.0',
    description: 'Api docs with swagger',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Augustine Chukwuemeka',
      url: 'https://portfolio-mu-gold-43.vercel.app/',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://taskmanager-backend-h067.onrender.com',
      description: 'Liveurl'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}

const options = {
  definition: swaggerDefinitions,
  apis: [
    './src/docs/*.ts', './src/docs/*.js'
  ]
}



let swaggerSpec;

try {
  swaggerSpec = swaggerJSDoc(options);
  console.log('Swagger spec generated successfully');
} catch (error) {
  console.error('Error generating Swagger spec:', error);
}

export default swaggerSpec as any;