const express = require('express');
const app = express();
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');
const errorHandler = require('./middlewares/error');

//Route Files
const bootcampRoutes = require('./routes/bootcampRoutes');

//Connect to Database
connectDb();

app.use(express.json());
app.use(morgan('dev'));

//Mount the routes
app.use('/api/v1/bootcamp', bootcampRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ msg: 'Helloo World' });
});

//Server Code
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
      .bold
  )
);

process.on('unhndledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
