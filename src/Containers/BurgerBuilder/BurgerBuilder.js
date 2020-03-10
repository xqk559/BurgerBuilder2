import React, {useState, useEffect} from 'react' ;
import ReactAux from '../../hoc/ReactAux' ;
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../Store/actions/index';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    
    const {onInitIngredients} = props;

    useEffect(()=>{
        onInitIngredients()
    }, [onInitIngredients]) 

    const updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated){
        setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        };
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...props.ings
        };
        
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( props.ings ) {
            burger = (
                <ReactAux>
                    <Burger ingredients={props.ings} />
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        price={props.price}
                        isAuth={props.isAuthenticated} />
                </ReactAux>
            );
            orderSummary = <OrderSummary
                ingredients={props.ings}
                price={props.price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler} />;
        }
        return (
            <ReactAux>
                <Modal show={purchasing} 
                       modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </ReactAux>
        );
    }


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(BurgerBuilder, axios);