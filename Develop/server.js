require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_PW);
  });