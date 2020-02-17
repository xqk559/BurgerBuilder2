import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
    }
    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name Here" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email Here" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street Here" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Your Zip Code Here" />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }

}


export default ContactData;