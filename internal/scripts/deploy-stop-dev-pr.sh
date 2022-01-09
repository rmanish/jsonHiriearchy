set -ex

SERVICE_NAME=$CI_PROJECT_NAME-$CI_COMMIT_REF_NAME;
echo $SERVICE_NAME
echo $DEV_API_URL
URL=$DEV_API_URL SERVICE_NAME=$SERVICE_NAME node ./internal/scripts/config_assign.js
URL=$DEV_API_URL SERVICE_NAME=$SERVICE_NAME node ./internal/scripts/get_secret_for_delete.js

echo "Removing Service.."
npm install -g serverless
npm run generate
serverless remove

echo "Removing secrets.."
curl --request DELETE --header "cache-control=no-cache" --header "content-type=application/json" "https://${DEV_API_URL}/creds/${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME}"

echo "Service Removed.."