import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        typse: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( 'https://burgerbuilder-cea69.firebaseio.com/orders.json', orderData)
            .then( response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    };
};