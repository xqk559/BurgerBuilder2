import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link ="/" activ>Burger Builder &nbsp;</NavigationItem>
        <NavigationItem link ="/">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;