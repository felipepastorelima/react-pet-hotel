import viewActions from 'modules/shared/view/viewActions';
import BookingService from 'modules/booking/bookingService';

const prefix = 'BOOKING_VIEW';

export default viewActions({
  prefix,
  findFn: BookingService.find,
  redirectToOnError: '/booking',
});
