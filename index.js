const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 3000;

//Import Routes
const authRoute = require('./routes/auth');
const incrementRoute = require('./routes/increment');

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false },
    () => console.log('Connected to db!')
);

//Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api', incrementRoute);

app.listen(port, () => console.log(`Started App on Port: ${port}`));