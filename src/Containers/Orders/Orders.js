import React, {Component, useEffect} from 'react';
import Order from '../../Components/Order/Order';
import * as actions from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

const Orders = props => {
    const {onFetchOrders} = props;
    useEffect(()=>{
        onFetchOrders(props.token, props.userId);    
    }, [onFetchOrders]) 
        let orders = <Spinner />
        if (!props.loading) {
            orders = props.orders.map(order => (
                <Order key={order.id}
                       ingredients={order.ingredients}
                       price={order.price}/>
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrders: (token, userId)=>dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Orders);