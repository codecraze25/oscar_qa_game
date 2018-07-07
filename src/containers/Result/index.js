import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { makeSelectQuestions, makeSelectAnswers } from 'containers/App/selectors';
import QAResultPanel from 'components/QAResultPanel';
import 'styles/containers/result.css';

class Result extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { history, questions, answers } = this.props;

    if (!questions || questions.length === 0 || !answers || answers.length < questions.length) {
      return history.push(`/`);
    }
  }

  render() {
    return (
      <div className="result">
        <QAResultPanel />
      </div>
    );
  }
}

Result.propTypes = {
  history: PropTypes.object.isRequired,
  questions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  answers: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ])
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  answers: makeSelectAnswers(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withRouter,
  withConnect
)(Result);
