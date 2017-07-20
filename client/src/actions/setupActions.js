import fetch from 'isomorphic-fetch'
import _ from 'lodash'

// ACTION: Go to the next step in the wizard
export const GO_TO_NEXT_STEP = 'GO_TO_NEXT_STEP'

const goingToNextStep = () => {
  return {
    type: GO_TO_NEXT_STEP,
    isFetching: true,
    caughtError: false
  }
}

const wentToNextStep = (step) => {
  return {
    type: GO_TO_NEXT_STEP,
    isFetching: false,
    caughtError: false,
    step,
  }
}

const caughtGoToNextStepError = (error) => {
  return {
    type: GO_TO_NEXT_STEP,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const goToNextStep = (dispatch) => () => {
  dispatch(wentToNextStep())
/*
  return fetch('/api/next-step', {
      credentials: 'same-origin',
      method: 'get'
    })
    .then(response => response.json())
    .then(json => dispatch(wentToNextStep(json)))
    .catch((error) => dispatch(caughtGoToNextStepError(error)))
  */
}

// ACTION: Get loading progress
export const GET_LOADING_PROGRESS = 'GET_LOADING_PROGRESS'

const gettingLoadingProgress = () => {
  return {
    type: GET_LOADING_PROGRESS,
    isFetching: true,
    caughtError: false
  }
}

const gotLoadingProgress = (progress) => {
  return {
    type: GET_LOADING_PROGRESS,
    isFetching: false,
    caughtError: false,
    progress,
  }
}

const caughtGetLoadingProgressError = (error) => {
  return {
    type: GET_LOADING_PROGRESS,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const getLoadingProgress = (dispatch) => () => {
  dispatch(gettingLoadingProgress())

  return fetch('/api/get-loading-progress', {
      credentials: 'same-origin',
      method: 'get'
    })
    .then(response => response.json())
    .then(json => dispatch(gotLoadingProgress(json)))
    .catch((error) => dispatch(caughtGetLoadingProgressError(error)))
}

// ACTION: Lock wizard (prevent from proceeding)
export const LOCK_WIZARD = 'LOCK_WIZARD'

const lockedWizard = () => {
  return {
    type: LOCK_WIZARD,
  }
}

export const lockWizard = (dispatch) => () => {
  dispatch(lockedWizard());
}

// ACTION: Unlock wizard (allow from proceeding)
export const UNLOCK_WIZARD = 'UNLOCK_WIZARD'

const unlockedWizard = () => {
  return {
    type: UNLOCK_WIZARD,
  }
}

export const unlockWizard = (dispatch) => () => {
  dispatch(unlockedWizard());
}

// ACTION: Update password
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

const updatedPassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    password,
  }
}

export const updatePassword = (dispatch) => (password) => {
  dispatch(updatedPassword(password));
}

// ACTION: Confirm password
export const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD'

const confirmedPassword = (password) => {
  return {
    type: CONFIRM_PASSWORD,
    password,
  }
}

export const confirmPassword = (dispatch) => (password) => {
  dispatch(confirmedPassword(password));
}
