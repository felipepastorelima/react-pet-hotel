import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';

export default class DecimalRangeField extends GenericField {
  forFilter() {
    return yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .number()
          .nullable(true)
          .label(this.label),
      )
      .label(this.label);
  }
}
