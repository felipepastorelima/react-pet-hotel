const AbstractRepository = require('./abstractRepository');
const models = require('../models');
const assert = require('assert');

module.exports = class FileRepository extends AbstractRepository {
  static async findAll(
    belongsTo,
    belongsToColumn,
    belongsToId,
    options,
  ) {
    return models.file.findAll({
      where: {
        belongsTo,
        belongsToColumn,
        belongsToId,
      },
      transaction: this.getTransaction(options),
    });
  }

  static async replaceRelationFiles(
    relation,
    rawFiles,
    options,
  ) {
    this._validateReplaceRelationFiles(relation, options);
    const files = this._normalizeFiles(rawFiles);

    await this._removeLegacyFiles(relation, files, options);
    await this._addFiles(relation, files, options);
  }

  static _normalizeFiles(rawFiles) {
    let files = [];

    if (Array.isArray(rawFiles)) {
      files = rawFiles;
    } else {
      files = rawFiles ? [rawFiles] : [];
    }

    return files;
  }

  static _validateReplaceRelationFiles(relation, options) {
    assert(relation.belongsTo, 'belongsTo is required');
    assert(
      relation.belongsToColumn,
      'belongsToColumn is required',
    );
    assert(relation.belongsToId, 'belongsToId is required');
  }

  static _existingFilesIds(files) {
    return files
      .filter((file) => !file.new)
      .map((file) => file.id);
  }

  static async _addFiles(relation, files, options) {
    const inexistentFiles = files.filter(
      (file) => !!file.new,
    );

    for (const file of inexistentFiles) {
      await models.file.create(
        {
          belongsTo: relation.belongsTo,
          belongsToColumn: relation.belongsToColumn,
          belongsToId: relation.belongsToId,
          name: file.name,
          sizeInBytes: file.sizeInBytes,
          privateUrl: file.privateUrl,
          publicUrl: file.publicUrl,
          createdById: this.getCurrentUser(options).id,
          updatedById: this.getCurrentUser(options).id,
        },
        {
          transaction: this.getTransaction(options),
        },
      );
    }
  }

  static async _removeLegacyFiles(
    relation,
    files,
    options,
  ) {
    const filesToDelete = await models.file.findAll({
      where: {
        belongsTo: relation.belongsTo,
        belongsToId: relation.belongsToId,
        belongsToColumn: relation.belongsToColumn,
        id: {
          [models.Sequelize.Op
            .notIn]: this._existingFilesIds(files),
        },
      },
      transaction: this.getTransaction(options),
    });

    for (let file of filesToDelete) {
      await file.destroy({
        transaction: this.getTransaction(options),
      });
    }
  }
};
