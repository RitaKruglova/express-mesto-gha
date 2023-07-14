module.exports.handleThen = (data, res) => {
  if (data === null) {
    res.status(404).send({ messege: 'Объект не найден' });
  } else {
    res.set({
      'Content-Security-Policy': 'default-src "self"',
    })
      .send({ data });
  }
};
