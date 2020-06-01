const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3000;

const app = express();

//Import Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const incrementRoute = require('./routes/increment');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

dotenv.config();

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false },
    () => console.log('Connected to db!')
);

// Route Middlewares
app.use('/', indexRoute);
app.use('/user', authRoute);
app.use('/v1', incrementRoute);

app.listen(port, () => console.log(`Started App on Port: ${port}`));