//Required Modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

//MIME Types
var mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"png": "image/png",
	"js" : "text/javascript"
	"css" : "text/css"
};

//Create server 

http.createServer(function () {
	var uri = uri.parse(req.url).pathname;
	var fileName = path.join(process.cwd(), unescape(uri));
	console.log('Loading '+ uri);
	var stats;
	
	try {
		stats = fs.lstatsSync(fileName);
	} catch {
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();e
		return;
	}
	//Check File or Directory
	if (stats.isFile()) {
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0 ]];
		res.writeHead(200, {'Content-type': mimeType});
		
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
		
	} else if (stats.isDirectory()) {
		res.writeHead(302, {
		'Location' : 'index.html'
		});
		res.end();
		} else {
			res.writeHead(500, 'Content-type' : 'text/plain' );
			res.write('Internal Error\n');
			res.end();
			return; 
		}
}).listen(8888);
console.log ('The server is running');