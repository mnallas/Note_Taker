const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public/assets/"));

app.listen(
  (PORT = () => {
    console.log(`listening to http://localhost:${PORT}`);
  })
);
