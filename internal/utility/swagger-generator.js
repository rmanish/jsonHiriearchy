const appConfig = require('./../../serviceSetup');
const { spawn } = require('child_process');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
let nodeServer = null;
let isServerRunning = false;

/*
* NOTE:
* -s use for define npm script to run
* -o use for output file name
*/
const getArgv = () => {
  const obj = {};
  let key;
  process.argv.slice(2).forEach(v => {
    if (v.startsWith('-')) {
      key = v.substr(1);
    } else if (v.startsWith('--')) {
      key = v.substr(2);
    } else {
      obj[key] = v;
    }
  });
  return obj;
};
const argv = getArgv();
// set defaults
argv.s = argv.s || 'start:once';
argv.o = argv.o || 'swagger.json';
const port = `${(process.env.PORT !== 80 || process.env.PORT !== 443) && ':' + process.env.PORT}`;
const url = `http://${process.env.HOST}${port}/`;

console.log('Starting swagger Generation......');

const writeFile = () => {
  console.log('Access Swagger data.....');
  axios.get(`${url}swagger.json`)
    .then(function (_response) {
      fs.writeFile(argv.o, JSON.stringify(_response.data), 'utf8', () => {
        console.log('Swagger file generated..');
        // stop server
        if (isServerRunning) {
          process.kill(-nodeServer.pid);
        }
      });
    })
    .catch(function () {
      console.log('Server is not reachable.... starting server.....');
      startServer();
    });
};

const startServer = () => {
  nodeServer = spawn('npm', ['run', argv.s], {detached: true});
  nodeServer.stdout.on('data', (data) => {
    console.log('Service is starting...');
    console.log("it says..", data.toString());
    if(data.toString().includes('Server started')){
      isServerRunning = true;
      writeFile();
    }
  });

  nodeServer.stderr.on('data', (data) => {
    isServerRunning = false;
    console.log("we get this on error", data.toString())
    process.kill(-nodeServer.pid);
  });

  nodeServer.on('close', (code) => {
    if (code !== 0) {
      console.log(`ps process exited with code ${code}`);
    }
    console.log(`ps process exited with code ${code}`);
  });
};

writeFile();
