import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/booking/importer/bookingImporterSelectors';
import BookingService from 'modules/booking/bookingService';
import fields from 'modules/booking/importer/bookingImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'BOOKING_IMPORTER',
  selectors,
  BookingService.import,
  fields,
  i18n('entities.booking.importer.fileName'),
);
