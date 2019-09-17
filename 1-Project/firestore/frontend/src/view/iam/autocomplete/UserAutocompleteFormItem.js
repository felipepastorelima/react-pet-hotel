import React, { Component } from 'react';
import IamService from 'modules/iam/iamService';
import AutocompleteFormItem from 'view/shared/form/items/AutocompleteFormItem';

class UserAutocompleteFormItem extends Component {
  fetchFn = (value) => {
    return IamService.fetchUserAutocomplete(value, 10);
  };

  mapper = {
    toAutocomplete(value) {
      if (!value) {
        return undefined;
      }

      if (value.fullName || value.email) {
        let label = value.email;

        if (value.fullName) {
          label = `${value.fullName} <${value.email}>`;
        }

        return {
          key: value.id,
          label,
        };
      }

      return {
        key: value.id,
        label: value.label,
      };
    },

    toValue(value) {
      if (!value) {
        return undefined;
      }

      return {
        id: value.key,
        label: value.label,
      };
    },
  };

  render() {
    return (
      <AutocompleteFormItem
        {...this.props}
        fetchFn={this.fetchFn}
        mapper={this.mapper}
      />
    );
  }
}

export default UserAutocompleteFormItem;
