const fs = require('fs');//文件读写
const https = require("https");
const http = require("http");
const cheerio = require('cheerio');//服务器上的jq
const mysql = require('mysql');

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '5456',
  port: '3306',
  database: 'vue'
});

let addSql = 'INSERT INTO imginfo (ImgName,ImgTitle,ImgAuthor,ImgDescribe,ImgTime,ImgLocate) VALUES (?,?,?,?,?,?)';

let bingImgUrl = 'https://bing.ioliu.cn/';
let bigBingImgUrl = 'https://bing.ioliu.cn/photo/';

function getImgUrl(page) {
  if(page < 84) {
    https.get(bingImgUrl + '?p=' + page, (res) => {
      var html = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => {
        html += chunk;
      });
      res.on('end', () => {
        var $ = cheerio.load(html);
        $('.container .item img').each((index, imgDom) => {
          var imgurl = imgDom.attribs['data-progressive'].replace('800x480', '1920x1080');
          //console.log(imgurl);
          getImgAndSave(imgurl);
          getImgInfoAndSaveToDB(imgurl.match(/(?<=bing\/)\S+(?=_1920x1080.jpg)/)[0].trim(),imgurl);
        }, this);
        getImgUrl(page + 1);
      });
    })
  } else {
    console.log('爬取完毕!');
  }
}

/** 下载图片并保存到本地 */
function getImgAndSave(imgUrl) {
  http.get(imgUrl, (res) => {
    var imgData="";
    res.setEncoding("binary");
    //将图片以二进制流的方式下载
    res.on("data", (chunk) => {
      imgData += chunk;
    });
    res.on("end", () => {
      var imgPath="/"+imgUrl.substring(imgUrl.lastIndexOf('/')+1);
      fs.writeFile("../imgs"+imgPath,imgData,"binary",(err) => {
        //console.log(err);
      })
    })
  })
}

function getImgInfoAndSaveToDB(imgName,imgUrl) {
  https.get(bigBingImgUrl + imgName, (res) => {
    var html = '';
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
      html += chunk;
    });
    res.on('end', () => {
      var $ = cheerio.load(html);
      //console.log($('.preview .description .title')[0].firstChild.data);
      var imgTitle = $('.preview .description .title')[0].firstChild.data.match(/.+(?=[\(（])/)[0].trim();
      var author = $('.preview .description .title')[0].firstChild.data;
      var imgAuthor = '';
      try {
        if(author.indexOf('©') >= 0) {
          imgAuthor = author.match(/(?<=©).+(?=[\)）])/)[0].trim();
        } else {
          imgAuthor = author.match(/(?<=\().+(?=[\)）])/)[0].trim();
        }
        var imgDescribe = $('.preview .description .sub')[0].firstChild.data;
        var imgTime = $('.preview .description .calendari em')[0].firstChild.data;
        var imgLocate = '';
        if($('.preview .description .location em').length === 1) {
          var imgLocate = $('.preview .description .location em')[0].firstChild.data;
        }
      } catch (error) {
        console.log('>>>..preview .description .title : ', $('.preview .description .title')[0]);
        console.log('>>>.preview .description .sub : ', $('.preview .description .sub')[0]);
        console.log('>>>..preview .description .calendari em : ', $('.preview .description .calendari em')[0]);
        console.log('>>>..preview .description .location em : ', $('.preview .description .location em')[0]);
        console.log(error);
      }

      var addSqlParams = [imgUrl, imgTitle, imgAuthor, imgDescribe, imgTime, imgLocate];

      pool.getConnection((err, connection) => {
        if(err) {
          console.log('[INSERT ERROR] - ',err.message);
          return;
        } else {
          connection.query(addSql, addSqlParams, (err, result) => {
            connection.release();
            if(err){
              console.log('[INSERT ERROR] - ',err.message);
              return;
            }
            //console.log('INSERT ID:',result);
          });
        }
      });
    });
  });
}

getImgUrl(44);

console.log('开始爬取图片!');
