import React from 'react';
import Layout from './Components/Layouts/Layout' ;
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder' ;
import Checkout from './Containers/Checkout/Checkout';
import {Route} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

function App() {
  return (
    <div>
     <Layout>
       <Route path="/home" component={BurgerBuilder} />
       <Route path="/checkout" component={Checkout} />
       <Route path="/orders" component={Orders} />
     </Layout>
    </div>
  );
}

export default App;
