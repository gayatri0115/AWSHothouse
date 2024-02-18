require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./utils/database");

const app = express();

console.log(process.env.ORIGIN);

app.use(express.json());
app.use(cors());
app.use(express.static("public")); 

const userRoutes = require("./routes/user");

app.use("/user", userRoutes);
app.use((req, res) => {
    const routesArr = req.url.split("/");
    res.sendFile(`${routesArr[1]}`, { root: "views" });
});

sequelize
  .sync()
  //.sync({force:true})
  .then(() => {
    console.log("DATABASE CONNECTED.");
    app.listen(4000, () => {
      console.log("SERVER LISTENING ON PORT 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });