#!/usr/bin/env bash
###############################################################################
###  Resets CloudFront cache with boto/cfadmin utility
###  Run: ./this_script  
###############################################################################

#
# Travis specific part - run this script only for production
#

# If this is fork - just exit
if [[ -n "${TRAVIS_PULL_REQUEST}" && "${TRAVIS_PULL_REQUEST}" != "false"  ]]; then
  echo -e '\n============== deploy will not be started (from the fork) ==============\n'
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
    echo -e "\nThis is master/production branch - let's reset the CloudFront cache\n"
else
    echo -e "\nReset of CloudFront cache will not be started for non-production branch - exit.\n"
    exit 0
fi

#
# Install boto
#
echo -e "\nInstalling boto...\n"
git clone git://github.com/boto/boto.git
cd boto
sudo python2 setup.py install
cd ../
sudo rm -rf boto

#
# Set up credentials for boto
#
echo -e "\nSet up boto credentials...\n"
cat > ~/.boto <<EOF 
[Credentials]
aws_access_key_id = ${AWS_ACCESS_KEY}
aws_secret_access_key = ${AWS_SECRET_KEY}
EOF

echo -e "\nCloudFront Invalidating...\n"
cfadmin invalidate ${DISTRIBUTION_ID} /index.html /*.js
echo -e "\nInvalidating is in progress...\n"
echo -e "\nYou can check the status on the 'Invalidations' tab here https://console.aws.amazon.com/cloudfront/home?region=your_region#distribution-settings:${DISTRIBUTION_ID}\n"

#
# Clean up
#
echo -e "\nRemove boto config file\n"
rm ~/.boto

