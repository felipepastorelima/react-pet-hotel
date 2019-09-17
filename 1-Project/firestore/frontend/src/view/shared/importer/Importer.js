import React, { Component } from 'react';
import { connect } from 'react-redux';
import importerFormHoc from 'view/shared/importer/ImporterForm';
import importerListHoc from 'view/shared/importer/ImporterList';
import importerStatusHoc from 'view/shared/importer/ImporterStatus';
import importerToolbarHoc from 'view/shared/importer/ImporterToolbar';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  const ImporterToolbar = importerToolbarHoc(
    selectors,
    actions,
    fields,
    templateHelp,
  );
  const ImporterStatus = importerStatusHoc(selectors);
  const ImporterList = importerListHoc(
    selectors,
    actions,
    fields,
  );
  const ImporterForm = importerFormHoc(selectors, actions);

  class Importer extends Component {
    render() {
      return (
        <React.Fragment>
          <ImporterToolbar />
          <ImporterStatus />
          {this.props.hasRows ? (
            <ImporterList />
          ) : (
            <ImporterForm />
          )}
        </React.Fragment>
      );
    }
  }

  function select(state) {
    return {
      hasRows: selectors.selectHasRows(state),
    };
  }

  return connect(select)(Importer);
};
