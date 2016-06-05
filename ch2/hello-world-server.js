var http = require('http');
http.createServer(function(req,res){
  res.setHeader('Content-Type','text/html');
  res.write('<html>\n');
  res.write('<head><title>Hello</title></head>\n');
  res.write('<body>\n');
  res.write('<h1>Hello!</h1>\n');
  res.write('<p>this is test...</p>\n');
  res.write('</body>\n');
  res.write('</html>\n');
  res.end();
}).listen(1337,'127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
