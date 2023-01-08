import { resolve } from "path";

import express from "express";
import csv from "csvtojson";

const app = express();

const filePath = resolve("./urls.csv");
const jsonArray = await csv().fromFile(filePath);
console.log(jsonArray);

const map = new Map(jsonArray.map(({ short, original }) => [short, original]));

app.get("*", async (req, res, next) => {
  const short = req.url;
  // console.log("short", short);

  const exist = map.has(short);

  if (!exist) return next(); // not found

  // 301
  const original = map.get(short);
  res.redirect(original);
});

// 404 middleware
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      `<pre>Cannot GET ${req.url} (see: <a href="https://github.com/abernier/shorty/blob/main/urls.csv">https://github.com/abernier/shorty/blob/main/urls.csv</a>)</pre>`
    );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
