import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectQuestions, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { loadQuestions } from '../App/actions';
import reducer from './reducer';
import saga from './saga';

import 'styles/containers/home.css';

class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.begin = this.begin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { loading: newLoading, error: newError, questions: newQuestions } = nextProps;
    if (newError) {
      return toastr.error('Questions Loading Error', 'Error occurred while trying to load questions! Try again later!');
    }
    if (!newLoading && newQuestions) {
      if (newQuestions.length === 0) {
        return toastr.error('Empty Questions Error', 'No questions fetched! Try again later!');
      }
      return history.push('/game');
    }
  }

  begin() {
    this.props.loadQuestions();
  }

  render() {
    const { loading } = this.props;

    return (
      <Card className="card home">
        <CardTitle className="card-title" title="Welcome to the Trivia Challenge!" />
        <div className="card-content">
          <CardText className="card-text">
            <h3>You will be presented with 10 True or False questions.</h3>
          </CardText>
          <CardText className="card-text">
            <h3>Can you score 100%?</h3>
          </CardText>
        </div>
        <CardActions className="card-actions">
          {loading?
            <RaisedButton label="Loading..." primary={true} disabled={true} /> :
            <RaisedButton label="Begin" primary={true} onClick={this.begin} />
          }
        </CardActions>
      </Card>
    );
  }

}

Home.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  questions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  loadQuestions: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

export function mapDispatchToProps(dispatch) {
  return {
    loadQuestions: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadQuestions());
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect
)(Home);
