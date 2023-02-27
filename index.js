const express = require("express")
const mongoose = require('mongoose');
const {MONGO_USER,MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config.js");
const postRouter = require("./routes/postRoutes");


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
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hi There</h1>")
})

app.use("/api/v1/posts", postRouter)
const port = process.env.PORT || 3000



app.listen(port, () => console.log(`listening on port ${port}`))