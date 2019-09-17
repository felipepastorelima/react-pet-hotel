import * as yup from 'yup';
import queryString from 'query-string';
import { values as _values } from 'lodash';

export default class FormFilterSchema {
  constructor(fields) {
    this.fields = fields;
    this.schema = this.buildSchema();
  }

  initialValues(filter, location) {
    const queryFilters = queryString.parse(location.search);

    const hasFilterFromQuery = _values(queryFilters).some(
      (filterValue) => !!filterValue,
    );

    if (hasFilterFromQuery) {
      return this.schema.cast(queryFilters);
    }

    return this.schema.cast(filter);
  }

  buildSchema() {
    const shape = {};

    this.fields.forEach((field) => {
      shape[field.name] = field.forFilter();
    });

    return yup.object().shape(shape);
  }

  cast(values) {
    return this.schema.cast(values);
  }
}
