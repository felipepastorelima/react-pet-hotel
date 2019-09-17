import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.pet.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.pet.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  owner: new RelationToOneField('owner', label('owner'), {
    "required": true
  }),
  name: new StringField('name', label('name'), {
    "required": true,
    "max": 255
  }),
  type: new EnumeratorField('type', label('type'), [
    { id: 'cat', label: enumeratorLabel('type', 'cat') },
    { id: 'dog', label: enumeratorLabel('type', 'dog') },
  ],{
    "required": true
  }),
  breed: new StringField('breed', label('breed'), {
    "required": true,
    "max": 255
  }),
  size: new EnumeratorField('size', label('size'), [
    { id: 'small', label: enumeratorLabel('size', 'small') },
    { id: 'medium', label: enumeratorLabel('size', 'medium') },
    { id: 'large', label: enumeratorLabel('size', 'large') },
  ],{
    "required": true
  }),
  bookings: new RelationToManyField('bookings', label('bookings'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),

};

export default {
  fields,
};
