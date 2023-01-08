import { resolve } from "path";

import express from "express";
import csv from "csvtojson";

const app = express();

const filePath = resolve("./urls.csv");
const jsonArray = await csv().fromFile(filePath);
console.log(jsonArray);

app.get("/:short", async (req, res) => {
  const { short } = req.params;
  // console.log("short", short);

  const entry = jsonArray.find((item) => short && item.short === short);
  // console.log(entry);

  if (entry) {
    res.redirect(entry.original);
  } else {
    res
      .status(404)
      .send(
        `No \`${short}\` url found: see available short urls https://github.com/abernier/shorty/urls.csv`
      );
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
