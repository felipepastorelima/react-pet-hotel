import model from 'modules/auth/userModel';

const { fields } = model;

export default [
  fields.id,
  fields.email,
  fields.fullName,
  fields.phoneNumber,
  fields.avatarsIam,
  fields.roles,
  fields.disabled,
  fields.createdAt,
];
