const path = require('path');
const express = require('express');
const app = express();
const colors = require('colors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');
const errorHandler = require('./middlewares/error');

//Route Files
const bootcampRoutes = require('./routes/bootcampRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

//Connect to Database
connectDb();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File upload
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount the routes
app.use('/api/v1/bootcamp', bootcampRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);
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
