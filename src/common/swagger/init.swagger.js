import video from "./video.swagger.js";

const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "Youtube clone",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  // de kem token
  components: {
    securitySchemes: {
      bearerToken: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    ...video
  }
};
export default swaggerDocument;
