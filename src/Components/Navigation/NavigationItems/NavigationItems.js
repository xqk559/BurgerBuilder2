import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import { checkPropTypes } from 'prop-types';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link ="/home">Burger Builder &nbsp;</NavigationItem>
        <NavigationItem link ="/orders">Orders</NavigationItem>
        {!props.isAuthenticated ? 
            <NavigationItem link ="/auth">Authenticate</NavigationItem> :
            <NavigationItem link ="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default NavigationItems;