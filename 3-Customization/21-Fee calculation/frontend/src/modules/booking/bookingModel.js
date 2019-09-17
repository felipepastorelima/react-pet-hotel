import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import DecimalRangeField from 'modules/shared/fields/decimalRangeField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import FilesField from 'modules/shared/fields/filesField';
import ImagesField from 'modules/shared/fields/imagesField';
import bookingStatus from 'modules/booking/bookingStatus';
import BookingPeriodField from 'modules/booking/bookingPeriodField';
import MoneyField from 'modules/shared/fields/moneyField';

function label(name) {
  return i18n(`entities.booking.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(
    `entities.booking.enumerators.${name}.${value}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  owner: new RelationToOneField('owner', label('owner'), {
    required: true,
  }),
  pet: new RelationToOneField('pet', label('pet'), {
    required: true,
  }),
  arrival: new DateTimeField('arrival', label('arrival'), {
    required: true,
  }),
  period: new BookingPeriodField(
    'period',
    label('period'),
    { required: true },
  ),
  departure: new DateTimeField(
    'departure',
    label('departure'),
    {
      required: true,
    },
  ),
  clientNotes: new StringField(
    'clientNotes',
    label('clientNotes'),
    {
      max: 20000,
    },
  ),
  employeeNotes: new StringField(
    'employeeNotes',
    label('employeeNotes'),
    {
      max: 20000,
    },
  ),
  photos: new ImagesField(
    'photos',
    label('photos'),
    'booking/photos',
    {
      size: 3000000,
    },
  ),
  status: new EnumeratorField(
    'status',
    label('status'),
    [
      {
        id: bookingStatus.BOOKED,
        label: enumeratorLabel(
          'status',
          bookingStatus.BOOKED,
        ),
      },
      {
        id: bookingStatus.PROGRESS,
        label: enumeratorLabel(
          'status',
          bookingStatus.PROGRESS,
        ),
      },
      {
        id: bookingStatus.CANCELLED,
        label: enumeratorLabel(
          'status',
          bookingStatus.CANCELLED,
        ),
      },
      {
        id: bookingStatus.COMPLETED,
        label: enumeratorLabel(
          'status',
          bookingStatus.COMPLETED,
        ),
      },
    ],
    {
      required: true,
    },
  ),
  cancellationNotes: new StringField(
    'cancellationNotes',
    label('cancellationNotes'),
    {
      max: 20000,
    },
  ),
  fee: new MoneyField('fee', label('fee'), {
    scale: 2,
  }),
  receipt: new FilesField(
    'receipt',
    label('receipt'),
    'booking/receipt',
    {
      size: 3000000,
    },
  ),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  arrivalRange: new DateTimeRangeField(
    'arrivalRange',
    label('arrivalRange'),
  ),
  departureRange: new DateTimeRangeField(
    'departureRange',
    label('departureRange'),
  ),
  feeRange: new DecimalRangeField(
    'feeRange',
    label('feeRange'),
  ),
};

export default {
  fields,
};
