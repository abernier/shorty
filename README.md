# shorty

Dead-simple shorturl server.

Database[^1] is here: [`urls.csv`](urls.csv) ([edit](https://github.com/abernier/shorty/edit/main/urls.csv))

[^1]: a simple csv file is used as "database". To add a record, just edit the file, and the server will re-deploy.

## Deploy

An instance is running as a [Cloud Run service](https://console.cloud.google.com/run?project=shorty-374114).

A [Cloud Build trigger](https://console.cloud.google.com/cloud-build/builds;region=global?query=trigger_id%3D%2274ab4dab-7902-4c7e-8515-926bb25a92d6%22&project=shorty-374114) is configured to re-build and re-deployed when pushing on `main` branch.
