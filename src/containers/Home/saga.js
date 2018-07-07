import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_QUESTIONS } from 'containers/App/constants';
import { questionsLoaded, questionsLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Questions request/response handler
 */
export function* getQuestions() {
  const requestURL = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`;

  try {
    const response = yield call(request, requestURL);
    yield put(questionsLoaded(response.results));
  } catch (err) {
    yield put(questionsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  yield takeLatest(LOAD_QUESTIONS, getQuestions);
}
