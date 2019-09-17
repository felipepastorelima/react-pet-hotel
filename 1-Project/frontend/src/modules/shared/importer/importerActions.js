import Importer from 'modules/shared/importer/importer';
import { i18n } from 'i18n';
import { EXCEL_TYPE } from 'modules/shared/excel/excel';
import Errors from 'modules/shared/error/errors';
import { chunk } from 'lodash';
import md5 from 'md5';

async function importRow(
  dispatch,
  actions,
  importer,
  importFn,
  row,
) {
  try {
    const importableRow = await importer.castForImport(row);
    const importHash = md5(JSON.stringify(importableRow));
    await importFn(importableRow, importHash);

    dispatch({
      type: actions.IMPORT_BATCH_SUCCESS,
      payload: {
        line: row._line,
      },
    });
  } catch (error) {
    dispatch({
      type: actions.IMPORT_BATCH_ERROR,
      payload: {
        line: row._line,
        errorMessage: Errors.selectMessage(error),
      },
    });
  }
}

export default (
  prefix,
  selectors,
  importFn,
  importFields,
  templateFileName,
  batchSize = 10,
) => {
  const actions = {
    RESETED: `${prefix}_RESETED`,

    FILE_READ_ERROR: `${prefix}_FILE_READ_ERROR`,
    FILE_READ_SUCCESS: `${prefix}_FILE_READ_SUCCESS`,

    IMPORT_STARTED: `${prefix}_IMPORT_STARTED`,
    IMPORT_ERROR: `${prefix}_IMPORT_ERROR`,
    IMPORT_PAUSED: `${prefix}_IMPORT_PAUSED`,
    IMPORT_SUCCESS: `${prefix}_IMPORT_SUCCESS`,

    IMPORT_BATCH_ERROR: `${prefix}_IMPORT_BATCH_ERROR`,
    IMPORT_BATCH_SUCCESS: `${prefix}_IMPORT_BATCH_SUCCESS`,

    doReset: () => {
      return {
        type: actions.RESETED,
      };
    },

    doPause: () => {
      return {
        type: actions.IMPORT_PAUSED,
      };
    },

    doImport: () => async (dispatch, getState) => {
      try {
        dispatch({
          type: actions.IMPORT_STARTED,
        });

        const pendingRows = selectors.selectPendingRows(
          getState(),
        );

        const importer = new Importer(importFields);

        const pendingBatches = chunk(
          pendingRows,
          batchSize,
        );

        for (let batch of pendingBatches) {
          const paused = !selectors.selectImporting(
            getState(),
          );

          if (paused) {
            return;
          }

          await Promise.all(
            batch.map((row) =>
              importRow(
                dispatch,
                actions,
                importer,
                importFn,
                row,
              ),
            ),
          );
        }

        dispatch({
          type: actions.IMPORT_SUCCESS,
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: actions.IMPORT_ERROR,
        });
      }
    },

    doDownloadTemplate: () => async (dispatch) => {
      const importer = new Importer(importFields);
      importer.downloadTemplate(templateFileName);
    },

    doReadFile: (file) => async (dispatch) => {
      try {
        const isExcel = file.type === EXCEL_TYPE;

        if (!isExcel) {
          throw new Error(
            i18n('importer.errors.invalidFileExcel'),
          );
        }

        const importer = new Importer(importFields);

        let rawData = await importer.convertExcelFileToJson(
          file,
        );

        if (!rawData || !rawData.length) {
          throw new Error(
            i18n('importer.errors.invalidFileEmpty'),
          );
        }

        rawData = await Promise.all(
          rawData.map(async (row, index) => {
            return await importer.castForDisplay(
              row,
              index,
            );
          }),
        );

        dispatch({
          type: actions.FILE_READ_SUCCESS,
          payload: rawData,
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.FILE_READ_ERROR,
          payload: error,
        });
      }
    },
  };

  return actions;
};
