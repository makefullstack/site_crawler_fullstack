const { sequelize } = require('./models');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const apiPage = require('./routes/api');
const pollingPage = require('./routes/polling');
const crawlerService = require('./service/crawler');
dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8000);
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}));
app.use(morgan('dev'));
app.use('/api', apiPage);
app.use('/', pollingPage);

sequelize.sync({ force: false }) // true일 경우 서버 실행마다 테이블 재생성 
  .then(() => { 
    console.log('connect to db');
    crawlerService.Enable();
})
  .catch((err) => console.error(err)
);

app.listen(app.get('port'), () => {
  console.log(`working on ${app.get('port')} port !`);
});

