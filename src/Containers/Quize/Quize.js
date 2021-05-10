import React from "react";
import ActiveQuize from "../../Components/ActiveQuize/ActiveQuize";
import FinishedQuize from "../../Components/FinishedQuize/FinishedQuize";
import classes from "./Quize.css";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quize extends React.Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount () {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quize}>
        <div className={classes.QuizeWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.props.loading || !this.props.quize ? 
            <Loader />
           : (this.props.isFinished ? (
            <FinishedQuize
              results={this.props.results}
              quize={this.props.quize}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuize
              answers={this.props.quize[this.props.activeQuestion].answers}
              question={this.props.quize[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizeLength={this.props.quize.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quize: state.quiz.quize,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quize);
