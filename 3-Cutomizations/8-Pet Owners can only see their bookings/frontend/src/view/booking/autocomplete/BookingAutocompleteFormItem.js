import React, { Component } from 'react';
import AutocompleteFormItem from 'view/shared/form/items/AutocompleteFormItem';
import BookingService from 'modules/booking/bookingService';

class BookingAutocompleteFormItem extends Component {
  fetchFn = (value) => {
    const { owner } = this.props;
    return BookingService.listAutocomplete(
      value,
      owner,
      10,
    );
  };

  mapper = {
    toAutocomplete(value) {
      if (!value) {
        return undefined;
      }

      const key = value.id;
      let label = value.label;

      if (value['id']) {
        label = value['id'];
      }

      return {
        key,
        label,
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

export default BookingAutocompleteFormItem;
