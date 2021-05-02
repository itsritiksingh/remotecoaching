require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server,{
  transports: ['websocket']
});
const mongoose = require("mongoose");
const path = require("path")
const jwt = require("jsonwebtoken");
const AdminBro = require("admin-bro");
const redisAdapter = require('socket.io-redis');
const bcrypt = require("bcrypt");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const Busboy = require("connect-busboy");
const userModel = require("./schema").userModel;
const meetingModel = require("./schema").meetingModel;
const userRouter = require("./Routes/userRouter");
const meetingRouter = require("./Routes/meetingRouter");


io.adapter(redisAdapter({host: '35.222.176.78', port: 6379}))
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0-zcmfs.mongodb.net/remotecoaching?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 5000;
AdminBro.registerAdapter(AdminBroMongoose);

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(allowCrossDomain);
app.use(Busboy());
app.use(userRouter);
app.use(meetingRouter);
app.use(express.static("./views"));
app.use(express.static(path.resolve(__dirname, "client", "build")));


const adminBro = new AdminBro({
  resources: [
    {
      resource: userModel,
    },
    {
      resource: meetingModel,
    },
  ],
  rootPath: "/admin",
});
const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

function checkToken(req, res, next) {
  var { token, refresh_token } = req.headers;
  if (!token || !refresh_token) res.redirect("/");

  //check access token first
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) console.log(err);

    //then if access token expired check refresh token instead.
    if (!user) {
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) res.redirect("/");
        if (!user) return res.redirect("/");

        //if refresh token verified issue new access token
        token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: 3600 });
        res.set("token", token);
        next();
      });
    } else {
      next();
    }
  });
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).then((response) => {
    if (!response) return res.status(403).send();

    console.log(password, response.password);
    bcrypt
      .compare(password, response.password)
      .then((matched) => {
        if (!matched) return res.status(401).send();

        jwt.sign(
          { email, _id: response._id },
          process.env.ACCESS_TOKEN,
          (err, token) => {
            if (err) return res.status(501).send(err);
            jwt.sign(
              { email, _id: response._id },
              process.env.REFRESH_TOKEN,
              (err, REFRESH_TOKEN) => {
                res.send({
                  ACCESS_TOKEN: token,
                  REFRESH_TOKEN,
                });
              }
            );
          }
        );
      })
      .catch((e) => {
        console.log(e);
        return res.status(502).send();
      });
  });
});

io.on("connect", (socket) => {
  // socket.on('join', ({ name, room }, callback) => {
  //   // const { error, user } = addUser({ id: socket.id, name, room });

  //   if(error) return callback(error);

  //   socket.join(user.room);

  //   socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
  //   socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

  //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  //   callback();
  // });

  // socket.on('sendMessage', (message, callback) => {
  //   // const user = getUser(socket.id);

  //   io.to(user.room).emit('message', { user: user.name, text: message });

  //   callback();
  // });

  // socket.on('disconnect', () => {
  //   // const user = removeUser(socket.id);
  //   console.log("user disconnectde");
  //   // if(user) {
  //   //   io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
  //   //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
  //   // }
  // })
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})


server.listen(PORT, () => {
  console.log("server started");
});
