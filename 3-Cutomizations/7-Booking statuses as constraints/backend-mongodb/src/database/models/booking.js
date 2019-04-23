const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');
const bookingStatus = require('../../enumerators/bookingStatus');

const BookingSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'pet',
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    departure: {
      type: Date,
      required: true,
    },
    clientNotes: {
      type: String,
      maxlength: 20000,
    },
    employeeNotes: {
      type: String,
      maxlength: 20000,
    },
    photos: [FileSchema],
    status: {
      type: String,
      required: true,
      enum: [
        bookingStatus.BOOKED,
        bookingStatus.PROGRESS,
        bookingStatus.CANCELLED,
        bookingStatus.COMPLETED,
      ],
    },
    cancellationNotes: {
      type: String,
      maxlength: 20000,
    },
    fee: {
      type: Number,
    },
    receipt: [FileSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    importHash: { type: String },
  },
  { timestamps: true },
);

BookingSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

BookingSchema.set('toJSON', {
  getters: true,
});

BookingSchema.set('toObject', {
  getters: true,
});

const Booking = database.model('booking', BookingSchema);

module.exports = Booking;
