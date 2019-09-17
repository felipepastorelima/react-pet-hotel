import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';
import moment from 'moment';
import { i18n } from 'i18n';

export default class DateField extends GenericField {
  constructor(name, label, { required = false } = {}) {
    super(name, label);

    this.required = required;
  }

  forTable(overrides) {
    const defaultRender = undefined;

    const {
      title = this.label,
      sorter = true,
      dataIndex = this.name,
      render = defaultRender,
    } = overrides || {};

    return {
      title,
      sorter,
      dataIndex,
      render,
    };
  }

  forView(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value ? moment(value, 'YYYY-MM-DD') : null;
  }

  forFilter() {
    return yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value) => {
          if (!value) {
            return true;
          }

          return moment(value, 'YYYY-MM-DD').isValid();
        },
      )
      .transform(
        (value) =>
          value ? moment(value).format('YYYY-MM-DD') : null,
      );
  }

  forForm() {
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value) => {
          if (!value) {
            return true;
          }

          return moment(value, 'YYYY-MM-DD').isValid();
        },
      )
      .transform(
        (value) =>
          value ? moment(value).format('YYYY-MM-DD') : null,
      );

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value) => {
          if (!value) {
            return true;
          }

          return moment(value, 'YYYY-MM-DD').isValid();
        },
      );

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }
}
