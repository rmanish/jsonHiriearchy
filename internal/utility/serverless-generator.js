/* eslint-disable no-template-curly-in-string */
require('dotenv').config();
const fs = require('fs');
const yaml = require('yamljs');
const swaggerJson = require('../../swagger.json');
const appConfig = require('../../serviceSetup');

const serverlessJson = {
  service: '${env:SERVICE_NAME}',
  provider: {
    name: 'aws',
    role: 'arn:aws:iam::499575500115:role/devLambdaExecute',
    runtime: 'nodejs10.x',
    stage: '${env:NODE_ENV}',
    region: '${env:REGION}'
  },
  functions: {
    main: {
      handler: '${env:BASE_POINT}.handlers.main',
      events: []
    }
  },
  plugins: ['serverless-dotenv-plugin', 'serverless-domain-manager'],
  package: {
    exclude: [
      './*.ts',
      './*.map',
      'tsconfig.json',
      'businessLogic/**',
      'typings/**',
      'internal/**',
      'schema/**',
      'docs/**',
      'node_modules/**',
      './*.js',
      'constant/**',
      'coverage/**',
      './*.json',
      './*.md',
      '.vscode/**',
      '.npmrc',
      '.gitmodules',
      '.eslintignore',
      'migrations/**',
      'constant/**',
      '.babelrc',
      './*.sh',
      'seeders/**',
      '.editorconfig'
    ]
  },
  custom: {
    dotenv: {
      path: '.env'
    },
    customDomain: {
      domainName: '${env:API_URL}',
      basePath: '${env:SERVICE_NAME}',
      stage: '${env:NODE_ENV}'
    }
  }
};

const defaultRequestType = 'https';
const indentationIndex = 6;
const [requestType = defaultRequestType] = swaggerJson.schemes;

const {events: slsEventsList} = serverlessJson.functions.main;

const apiList = Object.keys(swaggerJson.paths);

const createEventObject = (requestType, apiMethodName, endPointName) => ({
  [requestType]: {
    'cors': true,
    'method': apiMethodName,
    'path': endPointName
  }
});

const createTopicObject = (topicName) => {
  if (topicName) {
    return ({
      Type: 'AWS::SNS::Topic',
      Properties: {
        TopicName: topicName
      }
    });
  }
  throw new Error('topic name is missing');
};

const eventsList = apiList
  .reduce((eventsList, endPointName) => {
    const apiMethodsList = Object.keys(swaggerJson.paths[endPointName])
      .map((apiMethodName) => createEventObject(requestType,
        apiMethodName, endPointName));
    return eventsList.concat(...apiMethodsList);
  }, [])
  .filter((event) => {
    return !slsEventsList.find((slsEvent) => {
      return (slsEvent.http.path === event.http.path &&
        slsEvent.http.method === event.http.method);
    });
  });

serverlessJson.functions.main.events = [
  ...slsEventsList,
  ...eventsList
];

if (appConfig.config.isQueueRequired) {
  serverlessJson.resources = serverlessJson.resources || {};
  serverlessJson.resources.Resources = serverlessJson.resources.Resources || {};

  // create topics
  if (appConfig.config.queue.topicsToPublish && Array.isArray(appConfig.config.queue.topicsToPublish) && appConfig.config.queue.topicsToPublish.length) {
    appConfig.config.queue.topicsToPublish.forEach((topic) => {
      serverlessJson.resources.Resources[topic] = createTopicObject(topic);
    });
  }

  // create Subscriptions
  if (appConfig.config.queue.subscripton && Array.isArray(appConfig.config.queue.subscripton) && appConfig.config.queue.subscripton.length) {
    appConfig.config.queue.subscripton.forEach(({topicName, subscriber}) => {
      serverlessJson.functions['subscripton_' + topicName] = {
        'handler': '${env:BASE_POINT}.handlers.subs.' + subscriber,
        'events': [{
          sns:{
            arn: 'arn:aws:sns:${env:REGION}:${env:ACCOUNT_ID}:' + topicName
          }
        }]
      };
    });
  }

}

// Generate YAML
const yamlString = yaml.stringify(serverlessJson, indentationIndex);

fs.writeFile(process.cwd() + '/serverless.yml', yamlString, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Serverless file generated...');
  }
});
