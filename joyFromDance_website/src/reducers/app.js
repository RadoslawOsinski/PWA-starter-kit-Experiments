import {
  UPDATE_PAGE,
  UPDATE_OFFLINE,
  UPDATE_WIDE_LAYOUT,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  UPDATE_DRAWER_STATE
} from '../actions/app.js';

import {BACKEND_ADDRESS} from '../backend/backend.js';

const app = (state = {
    drawerOpened: false,
    backendServerAddress: BACKEND_ADDRESS
}, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };
    case UPDATE_WIDE_LAYOUT:
      return {
        ...state,
        wideLayout: action.wideLayout
      };
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened
      };
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      };
    default:
      return state;
  }
};

export default app;
