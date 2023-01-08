// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import csv from "csvtojson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { short } = req.query;
  // console.log("short", short);

  const filePath = resolve("./urls.csv");
  const jsonArray = await csv().fromFile(filePath);
  // console.log(jsonArray);

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
}
