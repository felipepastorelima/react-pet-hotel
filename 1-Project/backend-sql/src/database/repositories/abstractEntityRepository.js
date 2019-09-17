const models = require('../models');
const AuditLogRepository = require('./auditLogRepository');
const SequelizeFilter = require('../utils/sequelizeFilter');
const FileRepository = require('./fileRepository');
const AbstractRepository = require('./abstractRepository');
const lodash = require('lodash');

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = class AbstractEntityRepository extends AbstractRepository {
  constructor(
    modelName,
    inTableAttributes,
    relationToOneAttributes,
    relationToManyAttributes,
    fileAttributes,
  ) {
    super();
    this.modelName = modelName;
    this.inTableAttributes = inTableAttributes;
    this.relationToOneAttributes = relationToOneAttributes;
    this.relationToManyAttributes = relationToManyAttributes;
    this.fileAttributes = fileAttributes;
  }

  async create(data, options) {
    const record = await models[this.modelName].create(
      {
        ...lodash.pick(data, this.inTableAttributes),
        createdById: AbstractRepository.getCurrentUser(
          options,
        ).id,
        updatedById: AbstractRepository.getCurrentUser(
          options,
        ).id,
      },
      {
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );

    await this._createOrUpdateRelations(
      record,
      data,
      options,
    );

    await this._createOrUpdateFiles(record, data, options);

    await this._auditLogs(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  async update(id, data, options) {
    let record = await models[this.modelName].findByPk(id, {
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    record = await record.update(
      {
        ...lodash.pick(data, this.inTableAttributes),
        updatedById: AbstractRepository.getCurrentUser(
          options,
        ).id,
      },
      {
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );

    await this._createOrUpdateRelations(
      record,
      data,
      options,
    );

    await this._createOrUpdateFiles(record, data, options);

    await this._auditLogs(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  async destroy(id, options) {
    let record = await models[this.modelName].findByPk(id, {
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    await record.destroy({
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    await this._auditLogs(
      AuditLogRepository.DELETE,
      record,
      null,
      options,
    );
  }

  async findAndCountAllGeneric(
    {
      requestedAttributes,
      sequelizeFilter,
      limit,
      offset,
      orderBy,
    } = {
      requestedAttributes: null,
      sequelizeFilter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let filter =
      sequelizeFilter ||
      new SequelizeFilter(models.Sequelize);

    const include = this._buildIncludeForQueries(
      requestedAttributes,
      filter.getInclude(),
    );

    const requestedAttributesInTable =
      requestedAttributes && requestedAttributes.length
        ? [
            'id',
            ...lodash.intersection(
              this.inTableAttributes,
              requestedAttributes,
            ),
          ]
        : undefined;

    let { rows, count } = await models[
      this.modelName
    ].findAndCountAll({
      where: filter.getWhere(),
      include,
      attributes: requestedAttributesInTable,
      limit: limit ? limit : undefined,
      offset: offset || undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillNonTableAttributesForRows(
      rows,
      requestedAttributes,
      options,
    );

    return { rows, count };
  }

  async findById(id, options) {
    const record = await models[this.modelName].findByPk(
      id,
      {
        include: this._buildIncludeForQueries(),
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );

    return this._fillNonTableAttributesForRecord(
      record,
      null,
      options,
    );
  }

  async count(filter, options) {
    return models[this.modelName].count(
      {
        where: filter,
      },
      {
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );
  }

  async _auditLogs(action, record, data, options) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
      };

      this.fileAttributes.forEach((field) => {
        values[field] = data[field];
      });

      Object.keys(this.relationToManyAttributes).forEach(
        (field) => {
          values[`${field}Ids`] = data[field];
        },
      );
    }

    await AuditLogRepository.log(
      {
        entityName: this.modelName,
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  async _createOrUpdateRelations(record, data, options) {
    for (const field of Object.keys(
      this.relationToManyAttributes,
    )) {
      await record[`set${jsUcfirst(field)}`](
        data[field] || [],
        {
          transaction: AbstractRepository.getTransaction(
            options,
          ),
        },
      );
    }

    for (const field of Object.keys(
      this.relationToOneAttributes,
    )) {
      await record[`set${jsUcfirst(field)}`](
        data[field] || null,
        {
          transaction: AbstractRepository.getTransaction(
            options,
          ),
        },
      );
    }
  }

  async _createOrUpdateFiles(record, data, options) {
    for (const field of this.fileAttributes) {
      await FileRepository.replaceRelationFiles(
        {
          belongsTo: models[this.modelName].getTableName(),
          belongsToColumn: field,
          belongsToId: record.id,
        },
        data[field],
        options,
      );
    }
  }

  _buildIncludeForQueries(attributes, includeToAppend) {
    if (!attributes) {
      return Object.keys(this.relationToOneAttributes).map(
        (key) => this.relationToOneAttributes[key],
      );
    }

    const attributesToInclude = lodash.intersection(
      attributes,
      Object.keys(this.relationToOneAttributes),
    );

    const nonIncludedYet = attributesToInclude.filter(
      (attribute) =>
        !includeToAppend.some(
          (included) => included.as === attribute,
        ),
    );

    return nonIncludedYet
      .map(
        (attribute) =>
          this.relationToOneAttributes[attribute],
      )
      .concat(includeToAppend);
  }

  async _fillNonTableAttributesForRows(
    rows,
    requestedAttributes,
    options,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillNonTableAttributesForRecord(
          record,
          requestedAttributes,
          options,
        ),
      ),
    );
  }

  async _fillNonTableAttributesForRecord(
    record,
    requestedAttributes,
    options,
  ) {
    if (!record) {
      return record;
    }

    function isRequestedAttribute(fieldName) {
      if (
        !requestedAttributes ||
        requestedAttributes.length
      ) {
        return true;
      }

      return requestedAttributes.includes(fieldName);
    }

    const output = record.get({ plain: true });

    const fields = Object.keys(
      this.relationToManyAttributes,
    )
      .concat(this.fileAttributes)
      .filter(isRequestedAttribute);

    for (const field of fields) {
      output[field] = await record[
        `get${jsUcfirst(field)}`
      ]({
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      });
    }

    return output;
  }
};
