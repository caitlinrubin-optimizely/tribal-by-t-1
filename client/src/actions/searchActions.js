import fetch from 'isomorphic-fetch'
import _ from 'lodash'

// ACTION: Submit query for search
export const EXECUTE_QUERY = 'EXECUTE_QUERY'

const executingQuery = () => {
  return {
    type: EXECUTE_QUERY,
    isFetching: true,
    caughtError: false
  }
}

const executedQuery = (results) => {
  return {
    type: EXECUTE_QUERY,
    isFetching: false,
    caughtError: false,
    results,
  }
}

const caughtExecuteQueryError = (error) => {
  return {
    type: EXECUTE_QUERY,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const executeQuery = (dispatch) => (query) => {
  dispatch(executedQuery())
  return fetch(`/question?query=${query}`, {
      credentials: 'same-origin',
      method: 'get'
    })
    .then(response => response.json())
    .then(json => dispatch(executedQuery(json)))
    .catch((error) => dispatch(caughtExecuteQueryError(error)))
}

// ACTION: Update query term
export const UPDATE_QUERY = 'UPDATE_QUERY'

const updatedQuery = (query) => {
  return {
    type: UPDATE_QUERY,
    query,
  }
}

export const updateQuery = (dispatch) => (query) => {
  dispatch(updatedQuery(query));
}

// ACTION: Delete a question
export const DELETE_QUESTION = 'DELETE_QUESTION'

const deletingQuestion = () => {
  return {
    type: DELETE_QUESTION,
    isFetching: true,
    caughtError: false
  }
}

const deletedQuestion = (results) => {
  return {
    type: DELETE_QUESTION,
    isFetching: false,
    caughtError: false,
    results,
  }
}

const caughtDeleteQuestionError = (error) => {
  return {
    type: DELETE_QUESTION,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const deleteQuestion = (dispatch) => (questionId) => {
  dispatch(deletedQuestion())
  return fetch(`/question?questionId=${questionId}`, {
      credentials: 'same-origin',
      method: 'delete'
    })
    .then(response => response.json())
    .then(json => dispatch(deletedQuestion(json)))
    .catch((error) => dispatch(caughtDeleteQuestionError(error)))
}
