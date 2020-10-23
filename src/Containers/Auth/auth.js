import React, {useState, useEffect} from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './auth.module.css';
import * as actions from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject} from '../../Shared/utility';
import {checkValidity} from '../../Shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        });
        const [isSignup, setIsSignUp] = useState(true);


    const {building, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(()=>{
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
    }}, [building, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true,
            })
        });
        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignup);
    };

        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event=>inputChangedHandler(event, formElement.id))}/>
        ));

        if (props.loading) {
            form = <Spinner />
        }

        // eslint-disable-next-line no-unused-vars
        let errorMessage = null;

        if (props.error) {
            errorMessage = (
            <p>{props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
        <Button btnType="Danger"
                clicked={switchAuthModeHandler}>
                    SWITCH TO {isSignup ? 'SIGN-IN' : 'SIGN-UP'}
        </Button>
            </div>
        );
    };


const mapDispatchtoProps = dispatch => {
    return {
        onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Auth);