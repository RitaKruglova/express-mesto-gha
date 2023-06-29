const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log('test');
});
