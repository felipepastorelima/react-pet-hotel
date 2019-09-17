import model from 'modules/pet/petModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';
import BookingViewItem from 'view/booking/view/BookingViewItem';

const { fields } = model;

class PetView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <UserViewItem
          label={fields.owner.label}
          value={fields.owner.forView(record.owner)}
        />

        <TextViewItem
          label={fields.name.label}
          value={fields.name.forView(record.name)}
        />

        <TextViewItem
          label={fields.type.label}
          value={fields.type.forView(record.type)}
        />

        <TextViewItem
          label={fields.breed.label}
          value={fields.breed.forView(record.breed)}
        />

        <TextViewItem
          label={fields.size.label}
          value={fields.size.forView(record.size)}
        />

        <BookingViewItem
          label={fields.bookings.label}
          value={fields.bookings.forView(record.bookings)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default PetView;
