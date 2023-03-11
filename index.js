const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

/*
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default
*/
const {MONGO_USER,MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT} = require("./config/config.js");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});


const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`; 
const connectWithRetry = () => {
  mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error);
    setTimeout(connectWithRetry, 5000 )
  });

}

connectWithRetry();
app.enable("trust proxy");
app.use(cors({}));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);


app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h1>Hi There!!!</h1>");
    console.log("hi there, sweety");
})

app.use("/api/v1/posts", postRouter)

app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000



app.listen(port, () => console.log(`listening on port ${port}`))

