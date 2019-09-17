import destroyActions from 'modules/shared/destroy/destroyActions';
import listActions from 'modules/booking/list/bookingListActions';
import BookingService from 'modules/booking/bookingService';

const prefix =
  'BOOKING_DESTROY';

export default destroyActions({
  prefix,
  destroyAllFn: BookingService.destroyAll,
  destroySuccessMessageI18nKey:
    'entities.booking.destroy.success',
  destroyAllSuccessMessageI18nKey:
    'entities.booking.destroyAll.success',
  redirectTo: '/booking',
  listActions,
});
