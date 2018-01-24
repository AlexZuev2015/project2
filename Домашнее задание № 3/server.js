'use strict';

var http = require('http');
var fs = require('fs');
var file = fs.createWriteStream('example.txt');
	for (var i = 0; i <= 10000; i++) {
			file.write('<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, consequatur? </p>');
		}
	file.end();

http.createServer(function (req, res) {
  var stat = fs.statSync('example.txt');
  var fileSize = stat.size;

  if (req.url === '/stream') {
      fs.createReadStream('example.txt').pipe(res);
      console.log('go to localhost in the stream');
    } else if (req.url === '/file') {
      fs.readFile('example.txt', function (err, data) {
      if(err) throw err;
      res.write(data);
      console.log('go to localhost in normal mode');
      res.end();
  });
  }
}).listen(3000, function () {
  console.log('Go to localhost 3000');
});