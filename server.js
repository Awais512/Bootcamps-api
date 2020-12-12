const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');

//Connect to Database
connectDb();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ msg: 'Helloo World' });
});

//Server Code
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is listening on Port ${process.env.PORT}`)
);
