const AuditLogRepository = require('./auditLogRepository');
const AbstractRepository = require('./abstractRepository');

module.exports = class AbstractEntityRepository extends AbstractRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async create(data, options) {
    await this.model.createCollection();
    const [record] = await this.model.create(
      [
        {
          ...data,
          createdBy: this.getCurrentUser(options).id,
          updatedBy: this.getCurrentUser(options).id,
        },
      ],
      this.getSessionOptionsIfExists(options),
    );

    await this._auditLogs(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await this.refreshTwoWayRelations(record, options);

    return this.findById(record.id, options);
  }

  async update(id, data, options) {
    await this.wrapWithSessionIfExists(
      this.model.updateOne(
        { _id: id },
        {
          ...data,
          updatedBy: this.getCurrentUser(options).id,
        },
      ),
      options,
    );

    await this._auditLogs(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    const record = await this.findById(id, options);
    await this.refreshTwoWayRelations(record, options);
    return record;
  }

  async destroy(id, options) {
    await this.wrapWithSessionIfExists(
      this.model.deleteOne({ _id: id }),
      options,
    );

    await this._auditLogs(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );

    await this.destroyFromRelations(id, options);
  }

  async refreshTwoWayRelations(record, options) {}

  async destroyFromRelations(id, options) {}

  async findById(id, options) {
    throw new Error('Not implemented');
  }

  async count(filter, options) {
    return this.wrapWithSessionIfExists(
      this.model.countDocuments(filter),
      options,
    );
  }

  async _auditLogs(action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: this.model.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  async refreshTwoWayRelationManyToOne(
    record,
    sourceModel,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      sourceModel.updateMany(
        {
          _id: { $nin: record._id },
          [sourceProperty]: { $in: record[sourceProperty] },
        },
        {
          $pullAll: {
            [sourceProperty]: record[sourceProperty],
          },
        },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $in: record[sourceProperty] },
        },
        { [targetProperty]: record._id },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $nin: record[sourceProperty] },
          [targetProperty]: record._id,
        },
        { [targetProperty]: null },
      ),
      options,
    );
  }

  async refreshTwoWayRelationOneToMany(
    record,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateOne(
        { _id: record[sourceProperty] },
        { $addToSet: { [targetProperty]: record._id } },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $ne: record[sourceProperty] },
          [targetProperty]: record._id,
        },
        { $pull: { [targetProperty]: record._id } },
      ),
      options,
    );
  }

  async refreshTwoWayRelationManyToMany(
    record,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { _id: { $in: record[sourceProperty] } },
        { $addToSet: { [targetProperty]: record._id } },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $nin: record[sourceProperty] },
          [targetProperty]: { $in: record._id },
        },
        { $pull: { [targetProperty]: record._id } },
      ),
      options,
    );
  }

  async destroyRelationToMany(
    recordId,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { [targetProperty]: recordId },
        { $pull: { [targetProperty]: recordId } },
      ),
      options,
    );
  }

  async destroyRelationToOne(
    recordId,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { [targetProperty]: recordId },
        { [targetProperty]: null },
      ),
      options,
    );
  }
};
