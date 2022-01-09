const https = require('https');
const fs = require('fs');
const appConfig = require('../../serviceSetup.js')


function assignCreds(){
  let isDBRequired = false;
  if(appConfig.config && appConfig.config.isDBRequired){
    isDBRequired = true;
  }
  const {URL, SERVICE_NAME } = process.env;
  console.log("Starting to get creds..")
  const url = `https://${URL}/creds/${SERVICE_NAME}`;
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const secrets = JSON.parse(data).data.secret;
      let envServiceCreds = "\r\n";
      Object.keys(secrets).map((key, index)=>{
        envServiceCreds = envServiceCreds + "\r\n" + key + "=" + secrets[key];
      });
      fs.appendFile('.env', envServiceCreds , function (err) {
        if (err) throw err;
        console.log('Secret Updated!');
      });
    });
  }).on("error", (err) => {
    console.log("api response:-", JSON.parse(data));
    console.log("Error: " + err.message);
  });
}
assignCreds();
