const express = require("express")
const mongoose = require('mongoose');



const app = express();
mongoose.connect('mongodb://ubaid:ubaid@mongo-db:27017/?authSource=admin')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error);
  });


app.get("/", (req, res) => {
    res.send("<h1>Hi There</h1>")
})

const port = process.env.PORT || 3000



app.listen(port, () => console.log(`listening on port ${port}`))