import model from 'modules/booking/bookingModel';

const { fields } = model;

export default [
  fields.id,
  fields.owner,
  fields.pet,
  fields.arrival,
  fields.departure,
  fields.clientNotes,
  fields.employeeNotes,
  fields.status,
  fields.cancellationNotes,
  fields.fee,
  fields.receipt,
  fields.createdAt,
  fields.updatedAt
];
