import React from 'react';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to='/home'/>
        if (props.ings) {
            const purchasedRedirect = props.purchased ? <Redirect to='/home'/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelHandler}
                        checkoutContinued={checkoutContinuedHandler}/>
                    <Route
                        path={props.match.path + '/contact-data'}
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


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
};

export default connect(mapStateToProps)(Checkout);