const appConfig = require('../serviceSetup');
const isDBRequired = appConfig.config.isDBRequired;
const isRunningBuild = JSON.parse(process.env.RUNNING_BUILD || 'false');
let db;
export const serviceInstances = {};
export const initiatServices = async () => {
  if(isDBRequired){
    db = require('./services/db'); // eslint-disable-line import/first
    const dbInstance = await db.initializeDB();
    const dbresponse = await db.isDBAlive(dbInstance);
    if (!dbresponse.isSuccess && !isRunningBuild) {
      console.log('DB Status: ', dbresponse.message);
      console.log('Please Make sure that all the DB information is correct!!!!!!!!');
      console.log('Node Process Terminated');
      process.exit(1);
    }
    console.log('DB Status: ', dbresponse.message);
    serviceInstances.db = dbInstance;
  }
};

export const terminateServices = async () => {
  if(isDBRequired){
    db.closeDBconnection();
  }
}
