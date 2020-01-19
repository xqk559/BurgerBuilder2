import React from 'react';
import classes from './Burger.css';
import burgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <burgerIngredient type="bread-top" />
            <burgerIngredient type="cheese" />
            <burgerIngredient type="meat" />
            <burgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;