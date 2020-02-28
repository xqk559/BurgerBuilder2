import React from 'react';
import Layout from './Components/Layouts/Layout' ;
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder' ;
import Checkout from './Containers/Checkout/Checkout';
import {Route} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/auth';
import Logout from './Containers/Auth/logout/logout';

function App() {
  return (
    <div>
     <Layout>
     <Route path="/" exact component={BurgerBuilder} />
       <Route path="/home" component={BurgerBuilder} />
       <Route path="/checkout" component={Checkout} />
       <Route path="/auth" component={Auth} />
       <Route path="/orders" component={Orders} />
       <Route path="/logout" component={Logout} />
     </Layout>
    </div>
  );
}

export default App;
