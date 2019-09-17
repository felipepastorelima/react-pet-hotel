module.exports = class AbstractEntityModel {
  constructor(modelName, collectionName, fields) {
    this.modelName = modelName;
    this.collectionName = collectionName;
    this.fields = fields;
  }

  validate(data) {
    if (!data) {
      return;
    }

    return Object.keys(this.fields).forEach((key) =>
      this.fields[key].validate(data[key]),
    );
  }

  cast(data) {
    const result = {};

    Object.keys(this.fields).forEach((key) => {
      result[key] = this.fields[key].cast(data[key]);
    });

    return result;
  }
};
