import React from "react";
import classes from "./QuizeList.css";
import { NavLink } from "react-router-dom";
import Loader from '../../Components/UI/Loader/Loader'
import { connect } from "react-redux";
import {fetchQuizes} from '../../store/actions/quiz'

class QuizeList extends React.Component {
  
  renderQuize() {
    return this.props.quizes.map(quize => {
      return (
        <li key={quize.id}>
          <NavLink to={"/quize/" + quize.id}>{quize.name}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizeList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length === 0 ? <Loader /> : <ul>{this.renderQuize()}</ul>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizeList);
