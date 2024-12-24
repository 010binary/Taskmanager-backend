import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinitions = {
  openapi:'3.1.1',
  info:{
    title:'taskmanager-app',
    version:'1.0.0',
    description:'Api docs with swagger'
  },
  server: [
    {
      url:'http://localhost:3000',
      description:'Development server'
    },
    {
      url:'https://planpal-backend-xsr9.onrender.com',
      description:'Liveurl'
    }
  ]
}

const options = {
  swaggerDefinitions,
  apis: [
    './router/*.ts'
  ]
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
