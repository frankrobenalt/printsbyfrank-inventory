const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

const massiveConnection = massive(process.env.CONNECTION_STRING).then(db=>app.set('db', db)).catch(err => console.log(err) );

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});