set -ex

echo "Creating DB secrets"

SERVICE_NAME=$CI_PROJECT_NAME;
echo $SERVICE_NAME
echo $DEV_API_URL
URL=$DEV_API_URL SERVICE_NAME=$SERVICE_NAME  node ./internal/scripts/config_assign.js
URL=$DEV_API_URL SERVICE_NAME=$SERVICE_NAME node ./internal/scripts/secret_assign.js

IS_DB_REQUIRED=$(grep "isDBRequired: " ./serviceSetup.js | sed 's/isDBRequired: //' | sed 's/,//' | sed 's/ //g')
if [ $IS_DB_REQUIRED == true ]; then
    echo "RUNNING MIGRATION..."
    npm run db
else
    echo "DATABASE NOT REQUIRED!!!!"
fi

echo "Deploying Lambda"

npm install -g serverless

if [ -f ./prebuild.sh ]; then
    echo "found the prebuild File. Running the Steps."
    bash ./prebuild.sh;
else
    echo "No prebuild steps found.."
fi


npm run push

echo "application Deployed. It will be ready in 30s."
