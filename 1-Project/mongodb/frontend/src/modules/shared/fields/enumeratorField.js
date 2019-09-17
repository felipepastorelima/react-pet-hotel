import GenericField from 'modules/shared/fields/genericField';
import { isString } from 'lodash';
import * as yup from 'yup';
import { i18n } from 'i18n';

export default class EnumeratorField extends GenericField {
  constructor(
    name,
    label,
    options,
    { required = false } = {},
  ) {
    super(name, label);
    this.options = options || [];
    this.required = required;
  }

  _id(option) {
    if (!option) {
      return option;
    }

    if (isString(option)) {
      return option;
    }

    return option.id;
  }

  _label(option) {
    if (!option) {
      return option;
    }

    if (isString(option)) {
      return option;
    }

    return option.label;
  }

  forTable(overrides) {
    const defaultRender = (value) => this.forView(value);

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
    const option = this.options.find(
      (option) => option.id === this._id(value),
    );

    if (option) {
      return this._label(option);
    }

    return value;
  }

  forFormInitialValue(value) {
    return this._id(value);
  }

  forFilter() {
    return yup
      .string()
      .label(this.label)
      .oneOf([
        null,
        ...this.options.map((option) => this._id(option)),
      ]);
  }

  forForm() {
    let yupChain = yup
      .string()
      .nullable(true)
      .label(this.label)
      .oneOf([
        null,
        ...this.options.map((option) => this._id(option)),
      ]);

    if (this.required) {
      yupChain = yupChain.required(
        i18n('validation.string.selected'),
      );
    }

    return yupChain;
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .string()
      .label(this.label)
      .nullable(true)
      .oneOf([
        null,
        ...this.options.map((option) => this._id(option)),
      ]);

    if (this.required) {
      yupChain = yupChain.required(
        i18n('validation.string.selected'),
      );
    }

    return yupChain;
  }
}
