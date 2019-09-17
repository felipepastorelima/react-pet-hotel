import statuses from 'modules/shared/importer/importerStatuses';

export default (actions) => {
  const initialData = {
    rows: null,
    errorMessage: null,
    importing: false,
    completed: false,
  };

  return (state = initialData, { type, payload }) => {
    if (type === actions.RESETED) {
      return {
        ...initialData,
      };
    }

    if (type === actions.FILE_READ_ERROR) {
      return {
        ...state,
        errorMessage: payload.message
          ? payload.message
          : payload,
      };
    }

    if (type === actions.FILE_READ_SUCCESS) {
      return {
        ...state,
        errorMessage: null,
        rows: payload,
      };
    }

    if (type === actions.IMPORT_STARTED) {
      return {
        ...state,
        importing: true,
      };
    }

    if (type === actions.IMPORT_PAUSED) {
      return {
        ...state,
        importing: false,
      };
    }

    if (type === actions.IMPORT_SUCCESS) {
      return {
        ...state,
        importing: false,
        completed: true,
      };
    }

    if (type === actions.IMPORT_ERROR) {
      return {
        ...state,
        importing: false,
      };
    }

    if (type === actions.IMPORT_BATCH_SUCCESS) {
      const item = (state.rows || []).find(
        (item) => item._line === payload.line,
      );

      if (!item) {
        return;
      }

      item._status = statuses.IMPORTED;

      return {
        ...state,
        rows: [...state.rows],
      };
    }

    if (type === actions.IMPORT_BATCH_ERROR) {
      const item = (state.rows || []).find(
        (item) => item._line === payload.line,
      );

      if (!item) {
        return;
      }

      item._status = statuses.ERROR;
      item._errorMessage = payload.errorMessage;

      return {
        ...state,
        rows: [...state.rows],
      };
    }

    return state;
  };
};
