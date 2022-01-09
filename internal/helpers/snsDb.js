export const getDBInstance = async () => {
  // TODO: Need to find a way to forcefully and siolentely call this function first
  // for all subscriber who need DB;
  const {initiatServices} = require('./../servicesInit');
  await initiatServices();
  // const db = require('@models');
  // return db;
}
