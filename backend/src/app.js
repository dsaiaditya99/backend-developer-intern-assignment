const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swaggerSpec');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
