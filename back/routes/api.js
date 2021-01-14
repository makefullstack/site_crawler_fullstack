const express = require('express');
const { HumorPost } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/:site', async(req, res) => {
  //limit / lastId 
  try {
    const limit = parseInt(req.query.limit) || 10;
    const where = {};
    if (req.params.site !== 'total') {
      where.site = req.params.site;  
    }
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const postList = await HumorPost.findAll({
      where,
      limit,
      order: [['id', 'DESC']], //DESC 내림차순 
      attributes: ['site', 'title', 'url', 'id']
    });
    return res.status(200).json(postList);
  } catch {
    return res.status(404);
  }
});

module.exports = router;