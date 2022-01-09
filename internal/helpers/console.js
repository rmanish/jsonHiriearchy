'use strict';
import ELKKinesisLogger from '@guardian/elk-kinesis-logger';
import logger from '@appconstants/logger';

const debug = process.env.DEBUG === 'true';
const olog = console.log.bind(console);
const oinfo = console.info.bind(console);
const owarn = console.warn.bind(console);
const odebug = console.debug.bind(console);
const oerror = console.error.bind(console);
const reduceArgs = (args) => args.reduce((i, v) => i + JSON.stringify(v), '');
const config = Object.assign({}, logger);
delete config.region;
let ELKLogger = new ELKKinesisLogger(config).withRegion(logger.region).open();
const oELKlog = ELKLogger.log.bind(ELKLogger);
ELKLogger = Object.assign(ELKLogger, {
  error: (...args) => {
    ELKLogger.error(reduceArgs(args));
  },
  info: (...args) => {
    oELKlog(reduceArgs(args));
  },
  log: (...args) => {
    ELKLogger._putRecord({level: 'LOG'}, reduceArgs(args));
  },
  debug: (...args) => {
    ELKLogger._putRecord({level: 'DEBUG'}, reduceArgs(args));
  },
  warn: (...args) => {
    ELKLogger._putRecord({level: 'WARN'}, reduceArgs(args));
  }
});
const kinesisLog = () => {
  return ELKLogger.close().catch(function (err) {
    console.log('Error with aws connection => ' + JSON.stringify(err));
    process.exit(1);
  });
};
Object.assign(console, {
  log: (...args) => {
    ELKLogger.info(...args);
    if (debug) olog(...args);
    kinesisLog();
  },
  info: (...args) => {
    ELKLogger.info(...args);
    if (debug) oinfo(...args);
    kinesisLog();
  },
  warn: (...args) => {
    ELKLogger.warn(...args);
    if (debug) owarn(...args);
    kinesisLog();
  },
  error: (...args) => {
    ELKLogger.error(...args);
    if (debug) oerror(...args);
    kinesisLog();
  },
  debug: (...args) => {
    ELKLogger.debug(...args);
    if (debug) odebug(...args);
    kinesisLog();
  }
});
