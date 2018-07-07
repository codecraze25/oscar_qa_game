import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import globalReducer from 'containers/App/reducer';

const routeInitialState = { location: null };

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
}

export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    toastr: toastrReducer,
    ...injectedReducers
  });
}
