import moment from 'moment-timezone';

export default {
  getDate: (date) => {
    return moment(date).tz(process.env.TIMEZONE);
  },
  getForwardDateByHours: (hours) => {
    return moment().tz(process.env.TIMEZONE).add(hours, 'hours');
  },
  getTimeDifference: (date1, date2) => {
    return moment(date1).tz(process.env.TIMEZONE).diff(moment(date2).tz(process.env.TIMEZONE));
  }
};
