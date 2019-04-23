import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import moment from 'moment';
import * as yup from 'yup';
import { i18n } from 'i18n';
import bookingStatus from 'modules/booking/bookingStatus';
import BookingService from 'modules/booking/bookingService';

export default class BookingPeriodField extends DateTimeRangeField {
  constructor(name, label, { required = false } = {}) {
    super(name, label);
    this.required = required;
  }

  forFormInitialValue(value) {
    if (!value || !value.length) {
      return value;
    }

    return value.map((item) =>
      item ? moment(item) : null,
    );
  }

  forForm() {
    let yupChain = yup
      .array()
      .compact()
      .ensure()
      .nullable(true)
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
      yupChain = yupChain.test(
        'period-required',
        i18n('validation.mixed.required'),
        (value) => {
          if (!value || value.length < 2) {
            return false;
          }

          return value[0] && value[1];
        },
      );
    }

    yupChain = yupChain.test(
      'period-past',
      i18n('entities.booking.validation.periodPast'),
      function(value) {
        const { status } = this.parent;

        if (status !== bookingStatus.BOOKED) {
          return true;
        }

        if (!value || !value.length || !value[0]) {
          return true;
        }

        return moment().isBefore(value[0]);
      },
    );

    yupChain = yupChain.test(
      'period-available',
      i18n('entities.booking.validation.periodFull'),
      function(value) {
        if (!value || value.length < 2) {
          return true;
        }

        const [arrival, departure] = value;

        if (!arrival || !departure) {
          return true;
        }

        const { id, status } = this.parent;

        if (
          ![
            bookingStatus.PROGRESS,
            bookingStatus.BOOKED,
          ].includes(status)
        ) {
          return true;
        }

        return BookingService.isPeriodAvailable(
          arrival,
          departure,
          id,
        );
      },
    );

    return yupChain;
  }
}
