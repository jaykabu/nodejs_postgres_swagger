const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {sequelize} = require('./models')
const userRoute = require('./route/userRoute');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        components: {},
        info: {
            version: "1.0.0",
            title: "User API",
            description: "User API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['./route/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs,{ explorer: true }));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', userRoute);

//cors error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.listen(3000, async () => {
    console.log('server running on 3000')
    await sequelize.authenticate();
    console.log('connected');
});
