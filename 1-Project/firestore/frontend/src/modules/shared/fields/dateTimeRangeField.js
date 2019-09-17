import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';

export default class DateTimeRangeField extends GenericField {
  forFilter() {
    return yup.mixed().label(this.label);
  }
}
