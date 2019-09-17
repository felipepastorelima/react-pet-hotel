const moment = require('moment');

module.exports = class BookingFeeCalculator {
  static calculate(arrivalRaw, departureRaw, dailyFee) {
    if (!arrivalRaw || !departureRaw || !dailyFee) {
      return null;
    }

    const arrival = moment(arrivalRaw);
    const departure = moment(departureRaw);

    if (arrival.isAfter(departure)) {
      return null;
    }

    const diffInDays = departure
      .endOf('day')
      .diff(arrival.startOf('day'), 'days');

    return dailyFee * (diffInDays || 1);
  }
};
