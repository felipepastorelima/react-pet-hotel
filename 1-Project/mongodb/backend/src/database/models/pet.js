const database = require('../database');
const Schema = database.Schema;

const PetSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 255,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "cat",
        "dog"
      ],
    },
    breed: {
      type: String,
      required: true,
      maxlength: 255,
    },
    size: {
      type: String,
      required: true,
      enum: [
        "small",
        "medium",
        "large"
      ],
    },
    bookings: [{
      type: Schema.Types.ObjectId,
      ref: 'booking',
    }],
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

PetSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

PetSchema.set('toJSON', {
  getters: true,
});

PetSchema.set('toObject', {
  getters: true,
});

const Pet = database.model('pet', PetSchema);

module.exports = Pet;
