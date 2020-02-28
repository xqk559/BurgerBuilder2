import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link ="/home">Burger Builder &nbsp;</NavigationItem>
        <NavigationItem link ="/orders">Orders</NavigationItem>
        <NavigationItem link ="/auth">Authenticate</NavigationItem>

    </ul>
);

export default NavigationItems;