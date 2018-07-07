import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { makeSelectQuestions } from 'containers/App/selectors';
import { submitAnswer } from 'containers/App/actions';

class QAPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);

    this.state = {
      step: 1,
      answer: null
    };
  }

  onAnswerChange(event) {
    const answer = (event.target.value === 'yes') ? true : false;
    this.setState({ answer });
  }

  goToNextStep() {
    const { history, questions, submitAnswer } = this.props;
    const { step, answer } = this.state;

    if (answer === null) {
      return;
    }

    submitAnswer({ step, answer });
    this.setState({ step: step + 1, answer: null });
    this.refs.answerSelectionGroup.clearValue();
    if (step === questions.length) {
      history.push(`/result`);
    }
  }

  render() {
    const { questions } = this.props;
    const totalQuestionsCount = questions.length;
    const { step } = this.state;
    const question = questions[step - 1];
    const questionCategory = question.category;
    const questionText = question.question;

    return (
      <Card className="card">
        <CardTitle className="card-title" title={questionCategory} />
        <div className="card-content">
          <CardText className="card-text">
            <h4>{step}/{totalQuestionsCount}</h4>
            <h3 dangerouslySetInnerHTML={{__html: questionText}}></h3>
          </CardText>
          <div className="answer-selection">
            <RadioButtonGroup
              className="answer-selection-group radio-group"
              defaultSelected={null}
              ref="answerSelectionGroup"
              name="answerSelection"
              onChange={this.onAnswerChange}
            >
              <RadioButton className="select-yes" value="yes" label="True" />
              <RadioButton className="select-no" value="no" label="False" />
            </RadioButtonGroup>
          </div>
        </div>
        <CardActions className="card-actions">
          <RaisedButton label="Next" primary={true} onClick={this.goToNextStep} />
        </CardActions>
      </Card>
    );
  }

}

QAPanel.propTypes = {
  history: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  submitAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions()
});

function mapDispatchToProps(dispatch) {
  return {
    submitAnswer: ({ step, answer }) => {
      dispatch(submitAnswer({ step, answer }));
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect
)(QAPanel);
