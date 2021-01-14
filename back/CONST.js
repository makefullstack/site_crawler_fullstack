exports.siteObj= {
  ruliwebhumor: {
    attrName: 'ruliwebhumor',
    baseUrl: new URL('https://bbs.ruliweb.com/best/humor/now'),
    checkUrl: new URL('https://bbs.ruliweb.com/best/board/300143/read'),

    tbodySelector: '#best_body > table > tbody',
    aSelector: 'td.subject a'
  },
  dcbaseball: {
    attrName: 'dcbaseball',
    baseUrl: new URL('https://gall.dcinside.com/board/lists?id=baseball_new9&exception_mode=recommend'),
    checkUrl: new URL('https://gall.dcinside.com/board/view/?id=baseball_new9'),

    tbodySelector: '#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody',
    aSelector: 'td.gall_tit.ub-word > a:nth-child(1)',

  },
  fmkorea: {
    attrName: 'fmkorea',
    baseUrl: new URL('https://www.fmkorea.com/index.php?mid=best&listStyle=list&page=1'), 
    checkUrl: new URL('https://www.fmkorea.com/index.php?mid=best'),

    tbodySelector: '#bd_189545458_0 > div > table > tbody',
    aSelector: 'a.hx',
  }
}