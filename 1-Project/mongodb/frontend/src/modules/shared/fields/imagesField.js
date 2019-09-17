import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';

export default class ImagesField extends GenericField {
  constructor(
    name,
    label,
    path,
    {
      required = false,
      min = undefined,
      max = undefined,
      size = undefined,
    } = {},
  ) {
    super(name, label);

    this.path = path;
    this.required = required;
    this.min = min;
    this.max = max;
    this.size = size;
  }

  forTable(overrides) {
    const defaultRender = undefined;

    const {
      title = this.label,
      sorter = false,
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
    return value;
  }

  forForm() {
    let yupChain = yup
      .array()
      .nullable(true)
      .label(this.label);

    if (this.required || this.min) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    return yupChain;
  }

  forExport() {
    return yup
      .mixed()
      .label(this.label)
      .transform((value, originalValue) => {
        if (!originalValue || !originalValue.length) {
          return null;
        }

        return originalValue
          .map((value) => value.publicUrl)
          .join(' ');
      });
  }

  forImport() {
    let yupChain = yup
      .array()
      .nullable(true)
      .label(this.label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        if (Array.isArray(originalValue)) {
          return originalValue;
        }

        return originalValue
          .trim()
          .split(' ')
          .map((value) => {
            return {
              name: value.trim(),
              publicUrl: value.trim(),
              new: true,
            };
          });
      });

    if (this.required || this.min) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    return yupChain;
  }
}
