import React, {useEffect} from 'react';
import Layout from './Components/Layouts/Layout' ;
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder' ;
import Checkout from './Containers/Checkout/Checkout';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/auth';
import Logout from './Containers/Auth/logout/logout';
import {connect} from 'react-redux';
import * as actions from './Store/actions/index';

const App = props => {
  const {onTryAutoSignup} = props;

  useEffect(()=> {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
