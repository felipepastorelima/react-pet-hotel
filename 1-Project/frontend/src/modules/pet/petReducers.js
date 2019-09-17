import list from 'modules/pet/list/petListReducers';
import form from 'modules/pet/form/petFormReducers';
import view from 'modules/pet/view/petViewReducers';
import destroy from 'modules/pet/destroy/petDestroyReducers';
import importerReducer from 'modules/pet/importer/petImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
