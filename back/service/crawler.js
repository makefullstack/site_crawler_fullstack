const cheerio = require('cheerio');
const axios = require('axios');
const { HumorPost } = require('../models');
const { siteObj: {dcbaseball, ruliwebhumor, fmkorea} } = require('../CONST');
const { refreshQueue } = require('../manager/queue');
const { Op } = require('sequelize');

exports.Enable = () => {
  startParser();
}

async function startParser() {
  const dcObj = await htmlParser({
    baseUrl: dcbaseball.baseUrl,
    tbodySelector: dcbaseball.tbodySelector,
    aSelector: dcbaseball.aSelector
  });
  await addDB(dcObj, { site: dcbaseball.attrName , limit: dcObj.length });

  const ruliwebObj = await htmlParser({
    baseUrl: ruliwebhumor.baseUrl, 
    tbodySelector: ruliwebhumor.tbodySelector,
    aSelector: ruliwebhumor.aSelector
  });
  await addDB(ruliwebObj, { site: ruliwebhumor.attrName, limit: ruliwebObj.length });

  const fmOBj = await htmlParser({
    baseUrl: fmkorea.baseUrl,
    tbodySelector: fmkorea.tbodySelector,
    aSelector:fmkorea.aSelector 
  });
  await addDB(fmOBj, { site: fmkorea.attrName, limit: fmOBj.length });


  pushData();
  const randomSec = Math.floor(Math.random() * 41000 + 30000) ;
  console.log(`crawling after ${randomSec}ms`);
  setTimeout(startParser, randomSec);
}

function pushData() {
  if (!refreshQueue || refreshQueue.length === 0) return;
  refreshQueue.forEach(async(res) => {
    const where = {};
    if (parseInt(res.req.query.lastId, 10)) {
      where.id = { [Op.gt]: parseInt(res.req.query.lastId, 10) };
    } else {
      res.status(200).send('');
      refreshQueue.length = 0;
      return;
    }
    if (res.req.query.site !== 'total') {
      where.site = res.req.query.site;
    } 
    const postList = await HumorPost.findAll({
      where,
      order: [['id', 'DESC']], //DESC 내림차순 
      attributes: ['site', 'title', 'url', 'id']
    });

    res.status(200).json(postList);
    refreshQueue.length = 0; 
  })
}

async function addDB(updateData, { site, limit }) {
  const sitePostList = await HumorPost.findAll({
    raw: true,
    limit,
    where: {
      site
    },
    order: [['id', 'DESC']]
  });
  for(let i = updateData.length - 1; i >= 0;  i--) {
    if (sitePostList.find((v) => v.title === updateData[i].title)) {
      continue;
    };
    await HumorPost.create({
      ...updateData[i],
      site
    });
  }
}
async function htmlParser({ baseUrl, tbodySelector, aSelector }) {
  const response = await axios.get(baseUrl.toString(), { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 Edg/87.0.664.75' }});

  const $ = cheerio.load(response.data);
  const tbody = $(tbodySelector);
  const a = tbody.find(aSelector);

  const result = [];
  a.each((_, elem) => {
    let urlObj;
    try {
      urlObj = new URL($(elem).attr('href'));
    } catch {
      urlObj = new URL(`${baseUrl.protocol}//${baseUrl.hostname}${$(elem).attr('href')}`);
    }
    const postId = getPostIdString(urlObj);
    if (!postId) {
      return;
    }
    result.push({
      title: $(elem).text().trim(), 
      url: urlObj.toString(), 
      postId 
    });
  });
  return result;
}

function getPostIdString(urlObj) {
  const checkUrl = (str) => urlObj.toString().includes(str);
  if (checkUrl(ruliwebhumor.checkUrl.toString())){
    return urlObj.toString().replace('https://bbs.ruliweb.com/best/board/300143/read/', '');
  } 

  if (checkUrl(dcbaseball.checkUrl.toString())){
    return urlObj.searchParams.get('no');
  } 

  if (checkUrl(fmkorea.checkUrl.toString())){
    return urlObj.searchParams.get('document_srl');
  } 
  return null;
}