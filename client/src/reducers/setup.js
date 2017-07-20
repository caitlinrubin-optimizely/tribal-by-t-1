import _ from 'lodash'
import {
  GO_TO_NEXT_STEP,
  GET_LOADING_PROGRESS,
  LOCK_WIZARD,
  UNLOCK_WIZARD,
  UPDATE_PASSWORD,
  CONFIRM_PASSWORD,
} from 'actions/setupActions'

export const setup = (state = {
  isFetching: false,
  caughtError: false,
  error: null,
  step: 0,
  progress: 0,
  locked: false,
  password: '',
}, action) => {
  const nextState = _.cloneDeep(state)

  switch(action.type) {
    case GO_TO_NEXT_STEP:
      _.merge(nextState, {
        step: nextState.step + 1,
        locked: true,
      });
      break;
    case GET_LOADING_PROGRESS:
      _.merge(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error,
        progress: action.progress,
      });
      break;
    case LOCK_WIZARD:
      _.merge(nextState, {
        locked: true
      });
      break;
    case UNLOCK_WIZARD:
      _.merge(nextState, {
        locked: false
      });
      break;
    case UPDATE_PASSWORD:
      _.merge(nextState, {
        password: action.password,
      });
      break;
    case CONFIRM_PASSWORD:
      _.merge(nextState, {
        locked: action.password != nextState.password,
      });
      break;
    default:
      // Do not mutate state
      break;
  }

  console.log(action, nextState);

  // Return mutated state
  return nextState
}
