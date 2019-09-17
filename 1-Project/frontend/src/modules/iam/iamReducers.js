import list from 'modules/iam/list/iamListReducers';
import form from 'modules/iam/form/iamFormReducers';
import view from 'modules/iam/view/iamViewReducers';
import importerReducer from 'modules/iam/importer/iamImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  importer: importerReducer,
});
