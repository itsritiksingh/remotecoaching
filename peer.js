// const express = require('express');
// const { ExpressPeerServer } = require('peer');
// const http = require('http');

// const app = express();


// app.get('/', (req, res, next) => res.send('Hello world!'));
// var allowCrossDomain = function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "*");
  
//     next();
//   };

// const server = http.createServer(app);
// const peerServer = ExpressPeerServer(server, {
//     debug: true,
//     path: '/'
// });

// app.use(allowCrossDomain);
// app.use('/', peerServer);

// server.listen(9000,()=>{console.log("peer server started")});