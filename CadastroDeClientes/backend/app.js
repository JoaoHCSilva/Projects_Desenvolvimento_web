import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import { engine } from "express-handlebars";
import { getDirname } from "./utils/path.js";
import path from "path";
import moment from "moment";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;

//HANDLEBARS
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    helpers: {
      formatDate: (date) => moment(date).format("DD/MM/YYYY"),
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      eq: (a, b) => a === b,
      lt: (a, b) => a < b,
      gt: (a, b) => a > b,
      range: (start, end) => {
        let arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
      },
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(getDirname(import.meta.url), "views"));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Router
app.use(express.json());
app.use(router);

//porta
app.listen(port, () => {
  console.log(`App rodando => http://localhost:${port}`);
});
