import React from 'react';
import Layout from './Components/Layouts/Layout' ;
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder' ;
import Checkout from './Containers/Checkout/Checkout';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div>
     <Layout>
       <Route path="/" exact component={BurgerBuilder} />
       <Route path="/checkout" component={Checkout} />
     </Layout>
    </div>
  );
}

export default App;
