import {
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  SUBMIT_ANSWER
} from './constants';

/**
 * Load the questions, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_QUESTIONS
 */
export function loadQuestions() {
  return {
    type: LOAD_QUESTIONS
  };
}

/**
 * Dispatched when the questions are loaded by the request saga
 *
 * @param  {array} questions The questions data
 *
 * @return {object}      An action object with a type of LOAD_QUESTIONS_SUCCESS passing the questions
 */
export function questionsLoaded(questions) {
  return {
    type: LOAD_QUESTIONS_SUCCESS,
    questions
  };
}

/**
 * Dispatched when loading the questions fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_QUESTIONS_ERROR passing the error
 */
export function questionsLoadingError(error) {
  return {
    type: LOAD_QUESTIONS_ERROR,
    error
  };
}

/**
 * Dispatched when submitting answer
 *
 * @param  {object} payload Step indicator and True or False answer holder
 *
 * @return {object}       An action object with a type of SUBMIT_ANSWER
 */
export function submitAnswer({ step, answer }) {
  return {
    type: SUBMIT_ANSWER,
    payload: { step, answer }
  };
}
