const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser')
const ApiError = require("./utils/apiError");
const DbConnection = require("./config/mongoose");
const mainRouter = require("./routes/main");
const courseRoute = require("./routes/courseroute.js");
const articleRoute = require("./routes/articleRoute");
const trackRoute = require("./routes/TrackRoute");
const taskRoute = require("./routes/taskRoute");
const UserRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");


//connect with db
DbConnection();
// express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "videos")));

//middleware


app.use(express.json());
app.use(cookieParser())

//Mount routes

app.use(mainRouter);
app.use(articleRoute);
app.use(trackRoute);
app.use(taskRoute);
app.use(courseRoute);
app.use("/users", UserRoute);
app.use("/auth", authRoute);

app.all("*", (req, res, next) => {
  res.render("404", {
    courseTitle: undefined,
    path: undefined,
  });});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
