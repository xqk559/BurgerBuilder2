import React, {Component} from 'react';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary = <Redirect to='/'/>
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
                )
        }
        return (
            <div>
               {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
};

export default connect(mapStateToProps)(Checkout);