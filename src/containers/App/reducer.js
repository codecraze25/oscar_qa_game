import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_ERROR,
  SUBMIT_ANSWER
} from './constants';

const initialState = {
  loading: false,
  error: false,
  questions: false,
  answers: false
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        loading: true,
        error: false,
        questions: false,
        answers: false
      };
    case LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        questions: action.questions,
        answers: []
      };
    case LOAD_QUESTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        questions: false,
        answers: false
      };
    case SUBMIT_ANSWER:
      const { payload } = action;
      const { step, answer } = payload;
      let { answers } = state;
      answers = answers.slice();
      const foundIndex = answers.findIndex(iterator => (iterator.step === step));
      if (foundIndex > -1) {
        answers[foundIndex].answer = answer;
      } else {
        answers.push(payload);
      }

      return {
        ...state,
        answers
      };
    default:
      return state;
  }
}

export default appReducer;
