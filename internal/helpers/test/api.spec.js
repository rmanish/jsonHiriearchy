'use strict';
import api, {_mergeConfig} from '@helpers/api';
import axios from 'axios';

jest.mock('axios');
const url = 'https://jsonplaceholder.typicode.com/posts';
describe('Api middleware for external communicaton', () => {
  it('Get Api', () => {
    const data = {success: 'ok'};
    axios.get.mockImplementation(() => Promise.resolve(data));
    return api.getApi(url, {}).then(resp => expect(resp).toEqual(data));
  });
  it('Post Api', () => {
    const data = {success: 'ok'};
    axios.post.mockImplementation(() => Promise.resolve(data));
    return api.postApi(url, {}, {}).then(resp => expect(resp).toEqual(data));
  });

  it('Put Api', () => {
    const data = {success: 'ok'};
    axios.put.mockImplementation(() => Promise.resolve(data));
    return api.putApi(`${url}/1`, {}, {}).then(resp => expect(resp).toEqual(data));
  });

  it('Delete Api', () => {
    const data = {success: 'ok'};
    axios.delete.mockImplementation(() => Promise.resolve(data));
    return api.deleteApi(`${url}/1`, {}).then(resp => expect(resp).toEqual(data));
  });

  it('Get api, Url not defined', async () => {
    const resp = await api.getApi(undefined, {});
    expect(resp.isBoom).toEqual(true);
  });

  it('Post api, Url not defined', async () => {
    const resp = await api.postApi(undefined, {}, {name: 'test'});
    expect(resp.isBoom).toEqual(true);
  });
  it('Post api, Url and payload not defined', async () => {
    const resp = await api.postApi(undefined, {}, undefined);
    expect(resp.isBoom).toEqual(true);
  });

  it('Post api, Payload not defined', async () => {
    const resp = await api.postApi(url, {}, undefined);
    expect(resp.isBoom).toEqual(true);
  });

  it('Put api, Url not defined', async () => {
    const resp = await api.putApi(undefined, {}, {name: 'test'});
    expect(resp.isBoom).toEqual(true);
  });
  it('Put api, Url and payload not defined', async () => {
    const resp = await api.putApi(undefined, {}, undefined);
    expect(resp.isBoom).toEqual(true);
  });

  it('Put api, Payload not defined', async () => {
    const resp = await api.postApi(url, {}, undefined);
    expect(resp.isBoom).toEqual(true);
  });

  it('Delete api, Url not defined', async () => {
    const resp = await api.deleteApi(undefined, {});
    expect(resp.isBoom).toEqual(true);
  });

  it('Merege config', () => {
    const result = {headers:
      {'x-domain': 'happi11',
        'y-domain': 'TEST-Taleja',
        'm-domain': {},
        't-domain': 'DEMO'},
    key: 'TEST',
    next: 8};
    const conf = {headers: {'x-domain': 'happi',
      'y-domain': 'happi-DIGITAL',
      'm-domain': {}},
    key: '111',
    next: 8
    };
    const incomingConf = {headers: {'x-domain': 'happi11',
      'y-domain': 'TEST-Taleja',
      't-domain': 'DEMO'},
    key: 'TEST'};
    const res = _mergeConfig(conf, incomingConf);
    expect(res).toEqual(result);
  });
});
