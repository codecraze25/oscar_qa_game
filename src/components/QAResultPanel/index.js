import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { List } from 'material-ui/List';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { makeSelectQuestions, makeSelectAnswers } from 'containers/App/selectors';
import QAResultItem from 'components/QAResultItem';

class QAResultPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push(`/`);
  }

  render() {
    const { questions, answers } = this.props;
    const total = questions.length;
    let question = null;
    let answer = null;
    let correctCounts = 0;
    const results = [];

    for (let i = 0; i < total; i++) {
      question = questions[i];
      answer = answers[i];
      if (question.correct_answer.toLowerCase() === answer.answer.toString()) {
        results.push(true);
        correctCounts++;
      } else {
        results.push(false);
      }
    }

    const title = `You scored ${correctCounts} / ${total}`;

    const listContent = results.map((result, index) => {
      return (
        <QAResultItem
          key={questions[index].question}
          questionText={questions[index].question}
          correctness={result}
        />
      );
    });

    return (
      <Card className="card">
        <CardTitle className="card-title" title={title} />
        <div className="card-content">
          <List className="list">
            {listContent}
          </List>
        </div>
        <CardActions className="card-actions">
          <RaisedButton label="Play Again" primary={true} onClick={this.playAgain} />
        </CardActions>
      </Card>
    );
  }
}

QAResultPanel.propTypes = {
  history: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  answers: makeSelectAnswers(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withRouter,
  withConnect
)(QAResultPanel);
