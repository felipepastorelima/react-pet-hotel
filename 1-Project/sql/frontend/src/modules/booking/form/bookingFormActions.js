import BookingService from 'modules/booking/bookingService';
import formActions from 'modules/shared/form/formActions';

const prefix = 'BOOKING_FORM';

export default formActions({
  prefix,
  createFn: BookingService.create,
  createSuccessMessageI18nKey:
    'entities.booking.create.success',
  updateFn: BookingService.update,
  updateSuccessMessageI18nKey:
    'entities.booking.update.success',
  findFn: BookingService.find,
  redirectTo: '/booking',
});
