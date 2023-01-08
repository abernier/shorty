import express from "express";
import csv from "csvtojson";

const app = express();

//
// DB (from CSV)
//

const jsonArray = await csv().fromFile("./urls.csv");
const db = new Map(jsonArray.map(({ short, original }) => [short, original]));

//
// all-route
//

app.get("*", async (req, res, next) => {
  const short = req.url;

  const exist = db.has(short);
  if (!exist) return next(); // Not found

  // Redirection
  const original = db.get(short);
  res.redirect(original);
});

// 404
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      `<pre>Cannot GET ${req.url} (see: <a href="https://github.com/abernier/shorty/blob/main/urls.csv">https://github.com/abernier/shorty/blob/main/urls.csv</a>)</pre>`
    );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
