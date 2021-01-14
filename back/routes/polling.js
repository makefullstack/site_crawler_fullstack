const express = require('express');
const { refreshQueue } = require('../manager/queue');
const router = express.Router();

router.get('/refresh', (req, res) => {
  res.req.query = req.query;
  refreshQueue.push(res);
});

module.exports = router;