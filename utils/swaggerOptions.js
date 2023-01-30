// Extended: https://swagger.io/specification/#infoObject

export const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "customerAPI",
        description: "In this API we can SignUp and SignIn",
        contact: {
          name: "Shazib"
        },
        servers: [
            {
              url: "http://localhost:8001",
              description: "My API Documentation",
            },
        ]
      }
    },
    // ['.controllers/*.js']
    apis: ["./controllers/*.js"]
  };