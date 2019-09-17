import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import JsonHighlighter from 'view/shared/JsonHighlighter';
import { i18n } from 'i18n';

class AuditLogViewModal extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        title={i18n('auditLog.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
      >
        <JsonHighlighter code={this.props.code} />
      </Modal>
    );
  }
}

AuditLogViewModal.propTypes = {
  visible: PropTypes.bool,
  code: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

export default AuditLogViewModal;
