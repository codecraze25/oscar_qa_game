import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { makeSelectQuestions } from 'containers/App/selectors';
import QAPanel from 'components/QAPanel';
import 'styles/containers/game.css';

class Game extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { history, questions } = this.props;

    if (!questions || questions.length === 0) {
      return history.push(`/`);
    }
  }

  render() {
    return (
      <div className="game">
        <QAPanel />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.object.isRequired,
  questions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ])
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions()
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withRouter,
  withConnect
)(Game);
