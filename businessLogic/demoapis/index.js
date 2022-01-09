'use strict';
import Joi from '@hapi/joi';
import api from '@helpers/api';
import {pubOnSns} from '@helpers/sns';
import boom from 'boom';
import {tripCreatePayload} from './tripCreatePayload';
import trips from './trips';
import moment from 'moment';
import response from '@helpers/responseHelper';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';

const url = '-%DRIVER%-/typicode.com/posts';
const vehicleAllocation = '-%VEHICLE%-/allocation ';
const tripsInsert = '-%TRIPS%-/';

const latLongs = [
  {
    'lat': '13.0467712',
    'long': '77.6194804',
    'locationAddress': 'Manayat tech park Nagawara',
    'shortName': 'ANZ-MTP'
  }, {
    'lat': '12.922128',
    'long': '77.6827641',
    'locationAddress': 'Manayat tech park Nagawara',
    'shortName': 'ANZ-RMZ'
  }, {
    'lat': '12.9204334',
    'long': '77.6812691',
    'locationAddress': 'RMZ Eco World',
    'shortName': 'KPMG- BLR2'
  }, {
    'lat': '12.9204334',
    'long': '77.6812691',
    'locationAddress': 'RMZ Eco World',
    'shortName': ' KPMG-GTP'
  }, {
    'lat': '12.9205995',
    'long': '77.67985',
    'locationAddress': 'Manayat tech park Nagawara',
    'shortName': ' CTS-MTP'
  }
];

const vehicleSchedule = {
  1: [{
    'fromTime': '0000',
    'toTime': '2350'
  }],
  2: [{
    'fromTime': '0000',
    'toTime': '2350'
  }],
  3: [{
    'fromTime': '0000',
    'toTime': '2350'
  }, {
    'fromTime': '0000',
    'toTime': '2350'
  }]
};

function tripTransform (tripCSV) {
  const tripPayload = {};

  Object.keys(tripCSV).map(key => {
    if (key.includes('__')) {
      const payloadkeys = key.split('__');
      payloadkeys.forEach((splitedKey, i) => {
        if (i === 0) {
          if (!tripPayload[splitedKey]) {
            tripPayload[splitedKey] = {};
          };
          if (payloadkeys.length === i + 1) {
            tripPayload[splitedKey] = tripCSV[key];
          }
        }
        if (i === 1) {
          if (!tripPayload[payloadkeys[0]][splitedKey]) {
            tripPayload[payloadkeys[0]][splitedKey] = {};
          };
          if (payloadkeys.length === i + 1) {
            tripPayload[payloadkeys[0]][splitedKey] = tripCSV[key];
          }
        }
        if (i === 2) {
          if (!tripPayload[payloadkeys[0]][payloadkeys[1]][splitedKey]) {
            tripPayload[payloadkeys[0]][payloadkeys[1]][splitedKey] = {};
          };
          if (payloadkeys.length === i + 1) {
            tripPayload[payloadkeys[0]][payloadkeys[1]][splitedKey] = tripCSV[key];
          }
        }
      });
    } else {
      tripPayload[key] = tripCSV[key];
    }
  });
  const startTime = moment().add(getRandomInt(4320), 'minutes').tz(process.env.TIMEZONE).valueOf();
  tripPayload.tripPassengers = [tripPayload.tripPassengers];
  tripPayload.tripPassengers[0].startTime = startTime;
  tripPayload.tripPassengers[0].endTime = startTime + getRandomInt(14400000);
  return tripPayload;
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const demoApi = [{
  method: 'GET',
  path: '/insertVehicleAllocation',
  options: {
    handler: async () => {
      try {
        const result = [];
        let i = 0;
        const numberOfVehicles = [];
        const daysShedule = [moment().subtract(1, 'days').tz(process.env.TIMEZONE).valueOf()];
        while (i < 51) {
          numberOfVehicles.push(i);
          i++;
        }
        i = 0;
        while (i < 4) {
          daysShedule.push(moment().add(i, 'days').tz(process.env.TIMEZONE).valueOf());
          i++;
        };
        await asyncForEach(numberOfVehicles, async (key) => {
          let scheduleToAllocate = 1;
          if (key < 6) {
            return false;
          } else if (key < 21) {
            scheduleToAllocate = 1;
          } else if (key < 35) {
            scheduleToAllocate = 2;
          } else {
            scheduleToAllocate = 3;
          }

          const allocateSchedule = vehicleSchedule[scheduleToAllocate].map((slot) => {
            slot.driverId = key;
            return slot;
          });

          const scheduleData = {
            'action': 'create',
            'vehicleId': key,
            'allocationData': {}
          };
          daysShedule.map(day => {
            scheduleData.allocationData[day] = allocateSchedule;
          });
          console.log('-------------------------');
          console.log(scheduleData);
          console.log('-------------------------');
          const res = await api.postApi(vehicleAllocation, {
            'headers': {
              'x-happi-app-id': 'happi_OPS_PORTAL',
              'x-happi-user-id': '52',
              'x-happi-user-role': 'admin'
            }
          }, scheduleData);
          result.push('output for key ', key, ' is ..', res.data.data);
          console.log('output for key ', key, ' is ..', res.data.data);
        });
        return response.successHandler(statusCode.OK, resCode.OK, {result});
      } catch (err) {
        console.log(err);
        return boom.badImplementation('Internal Server Error');
      }
    },
    description: 'get api call',
    notes: 'This resouce give a way to call get api from handler',
    tags: ['api']
  }
}, {
  method: 'GET',
  path: '/insertrandomtrips/{tripCount}',
  options: {
    handler: async (req) => {
      try {
        const promises = [];
        const tripCount = req.params.tripCount;
        let i = 0;
        const numberOfTrips = [];
        while (i < tripCount) {
          numberOfTrips.push(i);
          i++;
        }
        await asyncForEach(numberOfTrips, async (count) => {
          const startTime = moment().add(getRandomInt(4320), 'minutes').tz(process.env.TIMEZONE).valueOf();
          const pickupLocationCount = getRandomInt(4);
          const dropLocation = () => {
            const dropLocationCount = getRandomInt(4);
            if (dropLocationCount === pickupLocationCount) {
              return dropLocation();
            }
            return dropLocationCount;
          };
          const dropLocationValue = dropLocation();
          const tripSampleData = Object.assign({}, tripCreatePayload);
          const pickUpGeoCode = {
            latitude: latLongs[pickupLocationCount].lat,
            longitude: latLongs[pickupLocationCount].long,
            shortName: latLongs[pickupLocationCount].shortName,
            landmark: 'landmark'
          };
          const dropGeoCode = {
            latitude: latLongs[dropLocationValue].lat,
            longitude: latLongs[dropLocationValue].long,
            shortName: latLongs[dropLocationValue].shortName,
            landmark: 'landmark'
          };
          // copying random data
          tripSampleData.subTripType = startTime % 2 ? 'PICKUP' : 'DROP';
          tripSampleData.bookingDate = startTime;
          tripSampleData.tripPassengers[0].passengerFirstName = `passenger_f_name_${count}`;
          tripSampleData.tripPassengers[0].passengerLastName = `passenger_l_name_${count}`;
          tripSampleData.tripPassengers[0].pickupAddress.geoCode = pickUpGeoCode;
          tripSampleData.tripPassengers[0].startTime = startTime;
          tripSampleData.tripPassengers[0].reportingTime =
          moment(startTime).subtract(10, 'minutes').tz(process.env.TIMEZONE).valueOf();
          tripSampleData.tripPassengers[0].endTime = startTime + getRandomInt(14400000);
          tripSampleData.tripPassengers[0].dropAddress.geoCode = dropGeoCode;
          tripSampleData.bookingId = `${Date.now() + getRandomInt(14400) + getRandomInt(14400) + getRandomInt(14400)}`;

          promises.push(api.postApi(tripsInsert, {
            headers: {
              'x-happi-user-id': 1
            }
          }, tripSampleData));
        });
        const result = await Promise.all(promises);
        return response.successHandler(statusCode.OK, resCode.OK, {result: result.data});
      } catch (err) {
        console.log(err);
        return boom.badImplementation('Internal Server Error');
      }
    },
    notes: 'This resouce give a way to call get api from handler',
    tags: ['api']
  }
}, {
  method: 'GET',
  path: '/inserttrips',
  options: {
    handler: async () => {
      try {
        const result = [];
        await asyncForEach(trips, async (trip) => {
          const tripData = tripTransform(trip);
          const res = await api.postApi(tripsInsert, {
            headers: {
              'x-happi-app-id': 'happi_OPS_PORTAL',
              'x-happi-user-id': 'lalit',
              'x-happi-user-role': 'admin'
            }
          }, tripData);
          result.push(tripData.bookingId, '---', res.data.data.id);
          console.log(tripData.bookingId, '---', res.data.data.id);
        });
        return response.successHandler(statusCode.OK, resCode.OK, {result});
      } catch (err) {
        console.log(err);
        return boom.badImplementation('Internal Server Error');
      }
    },
    description: 'get api call',
    notes: 'This resouce give a way to call get api from handler',
    tags: ['api']
  }
}, {
  method: 'GET',
  path: '/demo-api',
  options: {
    handler: async () => {
      try {
        const res = await api.getApi(url, {});
        return res.isBoom ? res : res.data;
      } catch (err) {
        return boom.badImplementation('Internal Server Error');
      }
    },
    description: 'get api call',
    notes: 'This resouce give a way to call get api from handler',
    tags: ['api']
  }
}, {
  method: 'POST',
  path: '/demo-api',
  options: {
    handler: async req => {
      try {
        const res = await api.postApi(url, {}, req.payload);
        return res.isBoom ? res : res.data;
      } catch (error) {
        return boom.badImplementation('Internal Server Error');
      };
    },
    description: 'post api call',
    notes: 'This resouce give a way to call post api from handler',
    tags: ['api']
  }
}, {
  method: 'PUT',
  path: '/demo-api/{id}',
  config: {
    handler: async req => {
      try {
        const res = await api.putApi(`${url}/1`, {}, req.payload);
        return res.isBoom ? res : res.data;
      } catch (error) {
        return boom.badImplementation('Internal Server Error');
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      params: {
        id: Joi.string().alphanum().min(3).max(30).required().description('the first number')
      }
    },
    description: 'put api call',
    notes: 'This resouce give a way to call put api from handler',
    tags: ['api']
  }
}, {
  method: 'DELETE',
  path: '/demo-api/{id}',
  config: {
    handler: async () => {
      try {
        const res = await api.deleteApi(`${url}/1`, {});
        return res.isBoom ? res : res.data;
      } catch (error) {
        return boom.badImplementation('Internal Server Error');
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      params: {
        id: Joi.string().alphanum().min(3).max(30).required().description('the first number')
      }
    },
    description: 'Delete api call',
    notes: 'This resouce give a way to call delete api from handler',
    tags: ['api']
  }
}, {
  method: 'POST',
  path: '/demo-api/pubOnSns',
  options: {
    handler: async req => {
      try {
        const res = await pubOnSns(req.payload, 'BPTEST1');
        return res;
      } catch (error) {
        console.error(error);
        return boom.badImplementation(error.message);
      };
    },
    description: 'post api call for sample topic publish',
    notes: 'This will publish request body to given topic',
    tags: ['api']
  }
}];
export default demoApi;
