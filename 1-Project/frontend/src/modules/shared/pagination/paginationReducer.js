const INITIAL_PAGE_SIZE = 10;

export default (
  actions,
  additionalInitialData = {},
  additionalTypeCheckers = (state, context) => state,
) => {
  const initialData = {
    rows: [],
    count: 0,
    loading: false,
    filter: {},
    pagination: {
      current: 1,
      pageSize: INITIAL_PAGE_SIZE,
    },
    sorter: {},
    selectedKeys: [],
    ...additionalInitialData,
  };

  return (state = initialData, { type, payload }) => {
    if (type === actions.RESETED) {
      return {
        ...initialData,
      };
    }

    if (type === actions.SELECTEDS_CHANGED) {
      return {
        ...state,
        selectedKeys: payload || [],
      };
    }

    if (type === actions.PAGINATION_CHANGED) {
      return {
        ...state,
        pagination: payload || {
          current: 1,
          pageSize: INITIAL_PAGE_SIZE,
        },
      };
    }

    if (type === actions.SORTER_CHANGED) {
      return {
        ...state,
        sorter: payload || {},
      };
    }

    if (type === actions.FETCH_STARTED) {
      return {
        ...state,
        loading: true,
        selectedKeys: [],
        filter: payload ? payload.filter : {},
        pagination:
          payload && payload.keepPagination
            ? state.pagination
            : {
                current: 1,
                pageSize: INITIAL_PAGE_SIZE,
              },
      };
    }

    if (type === actions.FETCH_SUCCESS) {
      return {
        ...state,
        loading: false,
        rows: payload.rows,
        count: payload.count,
      };
    }

    if (type === actions.FETCH_ERROR) {
      return {
        ...state,
        loading: false,
        rows: [],
        count: 0,
      };
    }

    if (type === actions.EXPORT_STARTED) {
      return {
        ...state,
        exportLoading: true,
      };
    }

    if (type === actions.EXPORT_SUCCESS) {
      return {
        ...state,
        exportLoading: false,
      };
    }

    if (type === actions.EXPORT_ERROR) {
      return {
        ...state,
        exportLoading: false,
      };
    }

    return additionalTypeCheckers(state, { type, payload });
  };
};
