const express = require("express");
const connectToMongoDB = require("./db");
const app = express();
connectToMongoDB();
let port = process.env.PORT || 3000;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api", require("./Routes/CreatUser"));;


//Swagger initialization
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Authentication",
      description: "Authentication using jwt",
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Swagger definition

/**
 * @swagger
 * /api/creatuser:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: create user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: create user
 *        required: true
 *        example: {"name":"your_name","email":"user@gmail.com","password":"123456"}
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */

/**
 * @swagger
 * /api/loginuser:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Login user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Login user
 *        required: true
 *        example: {"email":"user@gmail.com","password":"123456"}
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
/*
https://tame-tan-betta-cap.cyclic.app */
