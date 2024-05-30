const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const cors = require('cors');

const app = express();

app.use(cors());

const tableRoutes = require('./routes/table');
// const userRoutes = require('./routes/user');
 
app.use(bodyParser.json({ extended: false }));

app.use(tableRoutes);
// app.use(userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  })
