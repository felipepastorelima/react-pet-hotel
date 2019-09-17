import list from 'modules/booking/list/bookingListReducers';
import form from 'modules/booking/form/bookingFormReducers';
import view from 'modules/booking/view/bookingViewReducers';
import destroy from 'modules/booking/destroy/bookingDestroyReducers';
import importerReducer from 'modules/booking/importer/bookingImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
