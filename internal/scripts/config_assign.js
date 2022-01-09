const https = require('https');
const fs = require('fs');
const appConfig = require('../../serviceSetup.js')


function assignCreds(){
  const {URL, SERVICE_NAME } = process.env;
  console.log("Writing initial secrets..")

  let envServiceCreds = "\r\n";
  envServiceCreds = envServiceCreds + "\r\n" + 'SERVICE_NAME' + "=" + SERVICE_NAME;
  envServiceCreds = envServiceCreds + "\r\n" + 'API_URL' + "=" + URL;
  fs.appendFile('.env', envServiceCreds , function (err) {
    if (err) throw err;
    console.log('Secret Updated!');
  });
}
assignCreds();
