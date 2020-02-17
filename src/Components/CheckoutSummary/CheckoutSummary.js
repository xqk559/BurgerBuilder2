import React from 'react';
import Burger from '../../Components/Burger/Burger';
import Button from '../../Components/UI/Button/Button';
import classes from '../CheckoutSummary/CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
                    clicked>CANCEL
            </Button>
            <Button btnType="Success"
                    clicked>SUCCESS
            </Button>
        </div>
    );
}

export default checkoutSummary;