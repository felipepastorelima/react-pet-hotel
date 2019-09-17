import React, { Component } from 'react';
import { connect } from 'react-redux';
import selectors from 'modules/layout/layoutSelectors';
import actions from 'modules/layout/layoutActions';
import { Select } from 'antd';
import { getLanguages } from 'i18n';

class I18nSelect extends Component {
  doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  render() {
    return (
      <Select
        value={this.props.language}
        style={{ width: 100 }}
        onChange={this.doChangeLanguage}
      >
        {getLanguages().map((language) => (
          <Select.Option
            key={language.id}
            value={language.id}
          >
            {language.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

function select(state) {
  return {
    language: selectors.selectLanguage(state),
  };
}

export default connect(select)(I18nSelect);
