const path = require('path');
const express = require('express');
const app = express();
const colors = require('colors');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');
const errorHandler = require('./middlewares/error');

//Route Files
const bootcampRoutes = require('./routes/bootcampRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authController');

//Connect to Database
connectDb();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File upload
app.use(fileupload());
//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount the routes
app.use('/api/v1/bootcamp', bootcampRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);

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
