import model from 'modules/auditLog/auditLogModel';

const { fields } = model;

export default [
  fields.timestamp,
  fields.createdByEmail,
  fields.entityName,
  fields.action,
  fields.entityId,
  fields.values,
  fields.id,
];
