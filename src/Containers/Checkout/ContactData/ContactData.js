import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        console.log(this.props.ingredients)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( 'https://burgerbuilder-cea69.firebaseio.com/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/home');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name Here" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Email Here" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street Here" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Your Zip Code Here" />
                <Button clicked={this.orderHandler} btnType="Success">Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                {form}
            </div>
        );
    }

}


export default ContactData;