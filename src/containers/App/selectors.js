import { createSelector } from 'reselect';

const selectGlobal = (state) => state.global;

const selectRoute = (state) => state.route;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectQuestions = () => createSelector(
  selectGlobal,
  (globalState) => globalState.questions
);

const makeSelectAnswers = () => createSelector(
  selectGlobal,
  (globalState) => globalState.answers
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.location
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectQuestions,
  makeSelectAnswers,
  makeSelectLocation
};
