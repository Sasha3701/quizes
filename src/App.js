import React from "react";
import Layout from "./hoc/Layout/Layout";
import Quize from "./Containers/Quize/Quize";
import Auth from "./Containers/Auth/Auth";
import QuizeCreator from "./Containers/QuizeCreator/QuizeCreator";
import QuizeList from "./Containers/QuizeList/QuizeList";
import { Route, Switch, Redirect, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import Logout from './Components/Logout/Logout'
import { autoLogin } from './store/actions/auth'

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quize/:id" component={Quize} />
        <Route path="/" exact component={QuizeList} />
        <Redirect to={'/'} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quize-creator" component={QuizeCreator} />
          <Route path="/quize/:id" component={Quize} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizeList} />
          <Redirect to={'/'} />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
