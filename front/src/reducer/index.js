import { combineReducers } from 'redux';
import { DCBASEBALL, FMKOREA, RULIWEB_HUMOR, TOTAL } from '../CONST';
const reducerState = {
  initial() {
    return {
      load: false,
      done: false,
      error: null,
    }
  },
  loading() {
    return {
      load: true,
      done: false,
      error: null,
    }
  },
  done() {
    return {
      load: false,
      done: true,
      error: null,
    }
  },
  error(error = null) {
    return {
      load: false,
      done: false,
      error
    }
  }
}
const INITIAL_STATE= { 
  polling: reducerState.initial(),
  selectedKey: 'total'
}
INITIAL_STATE[TOTAL] = {
  state: reducerState.initial(),
  needInitLoad: true,
  lists: [],
  isMoreLoad: true,
}
INITIAL_STATE[FMKOREA] = {
  state: reducerState.initial(),
  needInitLoad: true,
  lists: [],
  isMoreLoad: true,
}
INITIAL_STATE[RULIWEB_HUMOR] = {
  state: reducerState.initial(),
  needInitLoad: true,
  lists: [],
  isMoreLoad: true,
}
INITIAL_STATE[DCBASEBALL] = {
  state: reducerState.initial(),
  needInitLoad: true,
  lists: [],
  isMoreLoad: true,
}

export const SELECTED_MENU = 'SELECTED_MENU';

export const GET_REQUEST = 'GET_REQUEST';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAILURE = 'GET_FAILURE';

export const POLLING_REQUEST = 'POLLING_REQUEST';
export const POLLING_SUCCESS = 'POLLING_SUCCESS';
export const POLLING_FAILURE = 'POLLING_FAILURE';

export function SelectedMenuAction (key) {
  return {
    type: SELECTED_MENU,
    selectedKey: key 
  };
}

export function GetRequestAction(selectedKey, lastId) {
  return {
    type: GET_REQUEST,
    selectedKey,
    lastId
  };
}

export function PollingRequestAction(selectedKey, lastId) {
  return {
    type: POLLING_REQUEST,
    selectedKey,
    lastId
  }
}

function selected (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SELECTED_MENU:
      return {
        ...state,
        selectedKey: action.selectedKey
      }
    case GET_REQUEST: {
      const result = {
        ...state
      };
      result[action.selectedKey] = {
        ...state[action.selectedKey],
        state: reducerState.initial()
      }
      return result;
    }
    case GET_SUCCESS: {
      const result = {
        ...state,
      }
      result[action.selectedKey] = {
        ...state[action.selectedKey],
          state: reducerState.done(),
          lists: [...state[action.selectedKey].lists, ...action.payload],
          isMoreLoad: action.payload.length === 10
      }
      if (!action.lastId) {
        result[action.selectedKey].needInitLoad = false;
      }
      return result;
    }
    case GET_FAILURE: {
      const result = {
        ...state,
      }
      result[action.selectedKey] = {
        ...state[action.selectedKey],
        state: reducerState.error(action.error),
      }
      return result;
    }

    case POLLING_REQUEST: {
      return {
        ...state,
        polling: reducerState.loading(),
      }
    }
    case POLLING_SUCCESS: {
      const result = {
        ...state,
        polling: reducerState.done(),
      }
      result[action.selectedKey] = {
        ...state[action.selectedKey],
        lists: [...action.payload, ...state[action.selectedKey].lists],
      }
      return result;
    }
    case POLLING_FAILURE: {
      return {
        ...state,
        polling: reducerState.error(action.error)
      }
    }
    default:
      return state;
  }
}

const Reducer = combineReducers({ selected });

export default Reducer;