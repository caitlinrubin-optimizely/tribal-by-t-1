import _ from 'lodash'
import {
  EXECUTE_QUERY,
  UPDATE_QUERY,
} from 'actions/searchActions'

export const search = (state = {
  isFetching: false,
  caughtError: false,
  error: null,
  results: [],
  query: '',
}, action) => {
  const nextState = _.cloneDeep(state)

  switch(action.type) {
    case EXECUTE_QUERY:
      _.merge(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        error: action.error,
      });

      if (!!action.results && action.results.length > 0) {
        nextState.results = action.results
      } else {
        nextState.results = [];
      }

      break;
    case UPDATE_QUERY:
      _.merge(nextState, {
        query: action.query,
      });
      break;
    default:
      // Do not mutate state
      break;
  }

  console.log(action, nextState);

  // Return mutated state
  return nextState;
};
