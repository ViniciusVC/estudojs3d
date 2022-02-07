var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080, function(){
  console.log('Servidor rodando na porta 8080. http://localhost:8080/static/metavvc/html/teste_metavvc_A001.html');
});


/*
var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Servidor estático rodando na porta 8080.');
});
*/