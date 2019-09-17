import { Form, Select } from 'antd';
import { FastField } from 'formik';
import debounce from 'lodash/debounce';
import { i18n } from 'i18n';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormErrors from 'view/shared/form/formErrors';
import { formItemLayout } from 'view/shared/styles/FormWrapper';

class AutocompleteFormItemNotFast extends Component {
  constructor(props) {
    super(props);
    this.debouncedSearch = debounce(this.handleSearch, 300);
    this.currentQuery = null;
    this.state = {
      serverSideDataSource: [],
      clientSideDataSource: [],
      loading: false,
    };
  }

  dataSource = () => {
    if (this.props.clientSideSearch) {
      return this.state.clientSideDataSource;
    }

    return this.state.serverSideDataSource;
  }

  value = () => {
    const { mode } = this.props;
    if (mode === 'multiple') {
      return this.valueMultiple();
    } else {
      return this.valueOne();
    }
  };

  valueMultiple = () => {
    const { form, name, mapper } = this.props;

    if (form.values[name]) {
      return form.values[name].map((value) =>
        mapper.toAutocomplete(value),
      );
    }

    return [];
  };

  valueOne = () => {
    const { form, name, mapper } = this.props;

    if (form.values[name]) {
      return mapper.toAutocomplete(form.values[name]);
    }

    return undefined;
  };

  handleSelect = (value) => {
    const { mode } = this.props;
    if (mode === 'multiple') {
      return this.handleSelectMultiple(value);
    } else {
      return this.handleSelectOne(value);
    }
  };

  handleSelectMultiple = (values) => {
    const { form, name, mapper } = this.props;

    if (!values) {
      form.setFieldValue(name, []);
      return;
    }

    form.setFieldValue(
      name,
      values.map((value) => mapper.toValue(value)),
    );
  };

  handleSelectOne = (value) => {
    const { form, name, mapper } = this.props;

    if (!value) {
      form.setFieldValue(name, null);
      return;
    }

    form.setFieldValue(name, mapper.toValue(value));
  };

  handleSearch = async (value) => {
    if (this.props.clientSideSearch) {
      return this.handleSearchClient(value);
    }

    return this.handleSearchServer(value);
  };

  handleSearchClient = async (value) => {
    if (
      !this.state.serverSideDataSource ||
      !this.state.serverSideDataSource.length
    ) {
      await this.handleSearchServer();
    }

    const clientSideDataSource = this.state.serverSideDataSource.filter((item) =>
      String(item.label || '')
        .toLowerCase()
        .includes(String((value || '')).toLowerCase()),
    );

    this.setState({
      loading: false,
      clientSideDataSource,
    });
  };

  handleSearchServer = async (value) => {
    if (value === this.currentQuery) {
      return;
    }

    const { fetchFn } = this.props;
    this.currentQuery = value;
    this.setState({ loading: true });

    try {
      const serverSideDataSource = await fetchFn(value);
      if (this.currentQuery === value) {
        this.setState({
          loading: false,
          serverSideDataSource,
        });
      }
    } catch (error) {
      console.error(error);

      if (this.currentQuery === value) {
        this.setState({ loading: false, serverSideDataSource: [] });
      }
    }
  };

  render() {
    const { loading } = this.state;

    const {
      form,
      label,
      name,
      hint,
      layout,
      size,
      placeholder,
      autoFocus,
      formItemProps,
      inputProps,
      errorMessage,
      defaultActiveFirstOption,
      allowClear,
      mode,
      required,
    } = this.props;

    const options = this.dataSource().map((d) => (
      <Select.Option key={d.id}>{d.label}</Select.Option>
    ));

    return (
      <Form.Item
        {...layout}
        label={label}
        required={required}
        validateStatus={FormErrors.validateStatus(
          form,
          name,
          errorMessage,
        )}
        help={
          loading
            ? i18n('autocomplete.loading')
            : FormErrors.displayableError(
                form,
                name,
                errorMessage,
              ) || hint
        }
        {...formItemProps}
      >
        <Select
          id={name}
          showSearch
          mode={mode}
          labelInValue={true}
          showArrow={false}
          filterOption={false}
          notFoundContent={null}
          onChange={this.handleSelect}
          value={this.value()}
          onSearch={this.debouncedSearch}
          placeholder={placeholder || undefined}
          size={size || undefined}
          autoFocus={autoFocus || false}
          dataSource={this.dataSource()}
          defaultActiveFirstOption={
            defaultActiveFirstOption
          }
          allowClear={allowClear}
          {...inputProps}
        >
          {options}
        </Select>
      </Form.Item>
    );
  }
}

AutocompleteFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  defaultActiveFirstOption: true,
  allowClear: true,
  mode: 'default',
  required: false,

  clientSideSearch: true,
};

AutocompleteFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultActiveFirstOption: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  allowClear: PropTypes.bool,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,

  clientSideSearch: PropTypes.bool,
};

class AutocompleteFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <AutocompleteFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default AutocompleteFormItem;
