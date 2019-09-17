import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Button } from 'antd';
import FileUploader from 'modules/shared/firebase/firebaseFileUploader';
import Errors from 'modules/shared/error/errors';
import { i18n } from 'i18n';

class FilesUploader extends Component {
  state = {
    loading: false,
  };

  value = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  fileList = () => {
    return this.value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.publicUrl,
    }));
  };

  handleSuccess = (file) => {
    this.setState({ loading: false });
    this.props.onChange([...this.value(), file]);
  };

  handleError = (error) => {
    console.log('error', error);
    this.setState({ loading: false });
    Errors.showMessage(error);
  };

  handleRemove = (id) => {
    this.props.onChange(
      this.value().filter((item) => item.id !== id),
    );
  };

  handleChange = (file) => {
    if (!file || !file.file || !file.file.status) {
      return;
    }

    if (file.file.status === 'removed') {
      this.handleRemove(file.file.uid);
    } else {
      this.setState({ loading: true });
    }
  };

  validate = (file) => {
    try {
      FileUploader.validate(file, this.props.schema);
      return true;
    } catch (error) {
      this.handleError(error);
      return false;
    }
  };

  formats = () => {
    const { schema } = this.props;

    if (schema && schema.formats) {
      return schema.formats.join(', ');
    }

    return undefined;
  };

  render() {
    const { max, readonly } = this.props;

    const uploadButton = (
      <Button>
        <Icon
          type={this.state.loading ? 'loading' : 'plus'}
        />
        {i18n('fileUploader.upload')}
      </Button>
    );

    return (
      <Upload
        accept={this.formats()}
        fileList={this.fileList()}
        disabled={readonly}
        customRequest={(request) => {
          FileUploader.uploadFromRequest(
            this.props.path,
            request,
            this.props.schema,
            (file) => {
              this.handleSuccess(file);
            },
            (error) => {
              this.handleError(error);
            },
          );
        }}
        onChange={this.handleChange}
        beforeUpload={this.validate}
      >
        {readonly || (max && this.fileList().length >= max)
          ? null
          : uploadButton}
      </Upload>
    );
  }
}

FilesUploader.propTypes = {
  readonly: PropTypes.bool,
  path: PropTypes.string,
  max: PropTypes.number,
  schema: PropTypes.shape({
    image: PropTypes.bool,
    size: PropTypes.number,
    formats: PropTypes.arrayOf(PropTypes.string),
  }),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FilesUploader;
