# shorty

Dead-simple shorturl server. Read more on [this article](http://abernier.link/shorty-domain).

Database[^1] is here: [`urls.csv`](urls.csv) ([edit](https://github.com/abernier/shorty/edit/main/urls.csv))

[^1]: a simple csv file is used as "database". To add a record, just edit the file, and the server will re-deploy.

## Deploy

An instance is running as a [Cloud Run service](https://console.cloud.google.com/run?project=shorty-374613).

A [Cloud Build trigger](https://console.cloud.google.com/cloud-build/builds;region=global?query=trigger_id%3D%22ea039ede-69ce-47cf-b164-8a497e9c9628%22&project=shorty-374613) is configured to re-build and re-deployed when pushing on `main` branch.
