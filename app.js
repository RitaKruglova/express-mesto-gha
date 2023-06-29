const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use((req, res, next) => {
  req.user = {
    _id: '649d764cbd4837b4ec55342c',
  };

  next();
});

app.listen(PORT, () => {
  console.log('test');
});
