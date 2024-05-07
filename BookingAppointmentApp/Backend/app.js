const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
let cors = require('cors');

const app = express();

app.use(cors());

const userRoutes = require('./routes/user');

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

sequelize.sync()
.then(() => {
    app.listen(4000);
})
.catch(err => {
    console.log(err);
})
