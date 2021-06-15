const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {sequelize} = require('./models')
const userRoute = require('./route/userRoute');

//API
const teacherRoute = require('./route/teacherRoute');
const studentRoute = require('./route/studentRoute');
const courseRoute = require('./route/courseRoute');
const subjectRoute = require('./route/subjectRoute');
const sectionRoute = require('./route/sectionRoute');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        info: {
            version: "1.0.0",
            title: "User API",
            description: "User API Information",
            contact: {
                name: "Jay kabutarwala",
                email: 'jaykabutarwala2@gmail.com'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['./route/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api",
    swaggerUi.serve,
    swaggerUi.setup(
        swaggerDocs,
        // {explorer: true}
    ));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', userRoute);

//Api
app.use('/teacher', teacherRoute);
app.use('/student', studentRoute);
app.use('/course', courseRoute);
app.use('/subject', subjectRoute);
app.use('/section', sectionRoute)

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
