import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Zip Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{value: 'fastest', displayValue: 'Fastest'},
                                  {value: 'cheapest', displayValue: 'Cheapest'}],
                    },
                    value: ''
                },
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
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..."/>
                {formElementsArray.map(formElement => (
                    <Input 

                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
                ))}
                <Input inputtype="input" className={classes.Input} type="text" name="email" placeholder="Your Email Here" />
                <Input inputtype="input" className={classes.Input} type="text" name="street" placeholder="Your Street Here" />
                <Input inputtype="input" className={classes.Input} type="text" name="postalCode" placeholder="Your Zip Code Here" />
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