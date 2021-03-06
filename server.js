const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const path = require('path');
require('dotenv').config()

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

const massiveConnection = massive(process.env.CONNECTION_STRING).then(db=>app.set('db', db)).catch(err => console.log(err) );

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

app.get('/api/checkSession', (req, res)=> {
  if(req.session.frank){
    res.send({ loggedIn: req.session.frank });
  } else {
    res.send({ loggedIn: false })
  }
})

app.post('/api/login', (req, res)=> {
   if(req.body.pw === process.env.PW){
     req.session.frank = true;
     res.send({loggedIn: true})
   } else {
     res.send({loggedIn: false})
   }
})

app.get('/api/getProducts', (req, res)=>{
  const db = req.app.get('db');
  let products = {};
  db.getHoodies().then(response => {
    products["hoodies"] = response;
    db.getTees().then(response => {
      products["tees"] = response;
      db.getTanks().then(response => {
        products["tanks"] = response;        
        res.send(products);
      });
    });
  }).catch(err => console.log(err));
})

app.post('/api/changeQuantity', (req, res)=>{
  const db = req.app.get('db');
  let table = req.body.table.substring(0,1).toUpperCase() + req.body.table.substring(1, req.body.table.length);
  let newQObj = {};
  if (req.body.size === 'doublexl') { req.body.size = '2XL' }
  newQObj[req.body.size] = req.body.newQ;
  let message = 'success'
  db[table].update({ Color: req.body.color }, newQObj, function(err, response){
    console.log(response, err)
    if (err){
      message = 'error';
    }
  })
  res.send(message);
  // db.updateQuantity([req.body.size, req.body.newQ, req.body.color]).then(response => {
  //   res.send('success');
  // }).catch(err => {
  //   console.log(err);
  //   res.send('an error occured');
  // })
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running`);
});