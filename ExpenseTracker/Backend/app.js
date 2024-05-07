const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const cors = require('cors');

const app = express();

app.use(cors());

const expenseRoutes = require('./router/expense');

app.use(bodyParser.json({ extented: false }));

app.use(expenseRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
