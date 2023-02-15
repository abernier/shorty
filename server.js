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
const allLinks = Array.from(db.entries())
  .filter(([short, original]) => !short.startsWith('_')) // hide short-urls starting with "_"
  .sort()
  .map(([short, original]) => `<a href="${original}">${short}</a>`)
  .join(" ");

app.use((req, res, next) => {
  console.log();
  const host = "http://localhost:3000";

  res.status(404).send(
    `
      <meta charset="utf-8">
      <title>abernier.link</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <pre>Cannot GET ${req.url}</pre>
      <div><small>Did you mean: ${allLinks}, or <form action="https://github.com/abernier/shorty/edit/main/urls.csv" style="display:inline;"><button>add</button></form> one?</small></div>
    `
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
