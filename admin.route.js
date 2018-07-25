const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;
