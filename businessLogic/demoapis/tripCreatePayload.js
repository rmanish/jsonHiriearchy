export const tripCreatePayload = {
  tripType: 'RENTAL',
  bookingId: 'some',
  ClientId: 1,
  siteId: 1,
  tripStat: {
    bookedAmount: 1111,
    bookedKm: 11,
    bookedDuration: 111
  },
  tripContract: {
    vehicleType: 'SEDAN'
  },
  tripPassengers: [{
    passengerFirstName: 'Rohit',
    passengerLastName: 'Taleja',
    startTime: '',
    endTime: '',
    passengerContactNumber: '9529990989',
    pickupAddress: {
      line1: 'random value',
      geoCode: {
        latitude: 3425678,
        longitude: 465789,
        shortName: 'short name',
        landmark: 'landmark'
      }
    },
    dropAddress: {
      line1: 'random value',
      geoCode: {
        latitude: 43567,
        longitude: 65789,
        shortName: 'short name',
        landmark: 'landmark'
      }
    }
  }]
};
