#!/usr/bin/env bash

# wget "https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz"
# tar -xaf "google-cloud-sdk.tar.gz"
# ./google-cloud-sdk/install.sh --usage-reporting false --path-update true
# source './google-cloud-sdk/path.bash.inc'
# gcloud auth activate-service-account $TRAVIS_SERVICE_ACCOUNT --key-file=travis-service-account-auth.json

# backup build folder
mkdir build.bak/
cp build/* build.bak/

gzip build/*

# remove .gz extension
for file in build/*.gz; do
    mv -v -- "$file" "${file%%.gz}"
done

gsutil -h "content-encoding:gzip" -h "Cache-Control:public,max-age=3600" -m rsync -R -d build/ $GCS_BUCKET

rm -rf build/
mv build.bak/ build/

