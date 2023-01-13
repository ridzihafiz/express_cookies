import express from "express";
import env from "dotenv";
env.config();
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const { PORT } = process.env;

// default mdw
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

// view engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/components"),
    defaultLayout: "main.handlebars",
  })
);

// route
app.get("/", async (req, res) => {
  // CARA 1
  // set cookie ke client/FE
  // res.cookie("test_cookie", "ridhafiz");

  // check cookie
  // const ck = req.cookies;
  // console.log(ck);

  // render view
  // res.render("index.handlebars");

  // CARA 2
  // const { myweb } = await req.cookies;

  // if (!myweb) {
  //   // set cookie myweb
  //   res.cookie("myweb", "true");
  //   return res.render("index", {
  //     firsTime: true,
  //   });
  // }

  // return res.render("index");

  // CARA 3
  const { isLogin } = await req.cookies;
  if (isLogin) {
    return res.render("dashboard");
  }
  return res.render("index");
});

app.get("/login", async (req, res) => {
  res.cookie("isLogin", "true");
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
