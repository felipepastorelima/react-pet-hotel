import * as yup from 'yup';

export default class FormSchema {
  constructor(idField, fields) {
    this.idField = idField;
    this.fields = fields;
    this.schema = this.buildSchema();
  }

  initialValues(record = {}) {
    const intialValues = {};

    if (this.idField) {
      intialValues[this.idField.name] =
        record[this.idField.name];
    }

    this.fields.forEach((field) => {
      intialValues[field.name] = field.forFormInitialValue(
        record[field.name],
      );
    });

    return intialValues;
  }

  buildSchema() {
    const shape = {};

    this.fields.forEach((field) => {
      shape[field.name] = field.forForm();
    });

    return yup.object().shape(shape);
  }

  cast(values) {
    return this.schema.cast(values);
  }
}
