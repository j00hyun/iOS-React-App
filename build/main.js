'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbconfig = require(__dirname + '/../server/config/db-config.json');
var connection = _mysql2.default.createConnection(dbconfig);

var app = (0, _express2.default)();
var port = 3000;

app.use('/', _express2.default.static(__dirname + "/../public"));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

/*
 * DB -> Server 데이터 잘 불러오는지 테스트 
 * www.mask-detector.ml/list
*/
app.get('/list', function (req, res) {
  connection.query("SELECT * FROM ADMIN", function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

/* 
 * Server -> DB 데이터 저장 되는지 테스트
 * PostMan 테스트
 * 	- Body -> x-www-form-urlencoded -> id, pw
 * 	- www.mask-detector.ml/insert
*/
app.post('/insert', function (req, res) {
  var adminId = req.body.id;
  var adminPw = req.body.pw;

  connection.query("INSERT INTO ADMIN (ADMIN_ID, ADMIN_PW) VALUES ('" + adminId + "', '" + adminPw + "')", function (err, result, fields) {

    if (err) console.log('query is not excuted. insert fail...\n' + err);else res.send('성공');
  });
});

var server = app.listen(port, function () {
  console.log('Express listening on port', port);
});