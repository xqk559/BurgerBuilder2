import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../Store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false,
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{value: 'fastest', displayValue: 'Fastest'},
                                  {value: 'cheapest', displayValue: 'Cheapest'}],
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true,
                },
            },
        formIsValid: false,
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }

        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const  updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
            <form onSubmit={this.orderHandler}>
                <Input elementType="..." elementConfig="..." value="..."/>
                {formElementsArray.map(formElement => (
                    <Input 
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                ))}
                <Input inputtype="input" className={classes.Input} type="text" name="email" placeholder="Your Email Here" />
                <Input inputtype="input" className={classes.Input} type="text" name="street" placeholder="Your Street Here" />
                <Input inputtype="input" className={classes.Input} type="text" name="postalCode" placeholder="Your Zip Code Here" />
                <Button clicked={this.orderHandler} 
                        btnType="Success"
                        disabled = {!this.state.formIsValid}>
                            Order
                </Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.price,
        loading: state.loading,
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onOrderBurger: (orderData)=> dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ContactData);