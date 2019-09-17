import BookingService from 'modules/booking/bookingService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/booking/list/bookingListSelectors';
import { i18n } from 'i18n';
import exporterFields from 'modules/booking/list/bookingListExporterFields';

const prefix = 'BOOKING_LIST';

export default paginationAction(
  prefix,
  BookingService.list,
  selectors,
  i18n('entities.booking.exporterFileName'),
  exporterFields,
);
