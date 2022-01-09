module.exports = {
  name: 'serverless-bp',
  version: 'v1',
  description: 'this is serverless blueprint for bootstraping the application from scrach',
  config: {
    isDBRequired: false,
    isQueueRequired: true,
    isCachingRequired: true,
    queue: {
      topicsToPublish: ['BPTEST1', 'BPTEST2'],
      topicsToDelete: [],
      subscripton: [
        {
          topicName: 'BPTEST1',
          subscriber: 'alpha'
        },
        {
          topicName: 'BPTEST2',
          subscriber: 'gama'
        }
      ],
      unsubcribe: []
    },
    chachingKey: 'allocation-engine'
  }
};
