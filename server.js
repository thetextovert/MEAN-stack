
const http = require('http');
const app = require('./backend/app'); //importing express app
// const server = http.createServer((req, res) => {
//   res.end('i am server page ');
// });
const server = http.createServer(app);
const port = 1001;
server.listen(port, () => { console.log('server is listening at : http://localhost:' + port) })
