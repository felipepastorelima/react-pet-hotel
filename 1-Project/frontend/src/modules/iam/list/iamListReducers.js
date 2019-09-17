import mode from 'modules/iam/list/mode/iamListModeReducers';
import roles from 'modules/iam/list/roles/iamListRolesReducers';
import users from 'modules/iam/list/users/iamListUsersReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  mode,
  roles,
  users,
});
