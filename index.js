const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let { pathname } = parsedUrl;

  // If no pathname provided, default to index.html
  if (pathname === '/') {
    pathname = '/index';
  }

  // Construct the filename based on the requested pathname
  const filename = `.${pathname}.html`;
  console.log(filename);

  // Read the file corresponding to the pathname
  fs.readFile(filename, (err, data) => {
    if (err) {
      // If error reading file, respond with 404.html
      fs.readFile('./404.html', (err, data) => {
        if (err) {
          // If 404.html not found, respond with generic error message
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1><p>The requested resource was not found.</p>');
        } else {
          // Respond with the content of 404.html
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      // Respond with the content of the requested file
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
