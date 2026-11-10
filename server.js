const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from my Node.js app. This will trigger the pipeline with a github webhook\n');
});

server.listen(3000, () => {
  console.log('App running on port 3000');
});
