const database = require('../database');
const Schema = database.Schema;

const SettingsSchema = new Schema(
  {
    theme: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true },
);

SettingsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

SettingsSchema.set('toJSON', {
  getters: true,
});

SettingsSchema.set('toObject', {
  getters: true,
});

const Settings = database.model('settings', SettingsSchema);

module.exports = Settings;
