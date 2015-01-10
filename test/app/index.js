
/* global require, module */

var http = require('http');
var fs = require('fs');
var path = require('path');

var ezdom = path.join(__dirname, '..', '..', 'lib', 'ezdom.js');
var jquery = path.join(__dirname, '..', '..', 'node_modules', 'jquery', 'dist',
                       'jquery.min.js');

var server = http.createServer(function (req, res) {
  if (req.url !== '/') {
    fs.readFile(jquery, function (err, jq) {
      if (err) throw err;

      fs.readFile(ezdom, function (err, ezd) {
        if (err) throw err;

        res.writeHead(200, { 'content-type': 'application/javascript' });
        res.end(jq + '\n' + ezd);
      });
    })

    return;
  }

  res.writeHead(200, { 'content-type': 'text/html' });

  fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
    if (err) throw err;

    res.end(data);
  });
});

module.exports = {
  start: function (f) {
    server.listen(3000, f);
  },
  kill: function () {
    server.close();
  }
};
