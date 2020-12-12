const express = require('express');
const app = express();
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');

//Route Files
const bootcampRoutes = require('./routes/bootcampRoutes');

//Connect to Database
connectDb();

app.use(express.json());
app.use(morgan('dev'));

//Mount the routes
app.use('/api/v1/bootcamp', bootcampRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'Helloo World' });
});

//Server Code
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is listening on Port ${process.env.PORT}`.yellow.bold)
);

//Handle Unhandle Rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  Server.close(() => process.exit(1));
});
