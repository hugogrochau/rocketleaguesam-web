#!/usr/bin/env bash

wget "https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz"
tar -xaf "google-cloud-sdk.tar.gz"
./google-cloud-sdk/install.sh --usage-reporting false --path-update true
source './google-cloud-sdk/path.bash.inc'
gcloud auth activate-service-account $TRAVIS_SERVICE_ACCOUNT --key-file=travis-service-account-auth.json
gsutil -m rsync -R -d build/ $GCS_BUCKE

