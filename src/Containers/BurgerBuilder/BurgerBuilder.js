import React, {useState, useEffect, useCallback} from 'react' ;
import ReactAux from '../../hoc/ReactAux' ;
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as burgerBuilderActions from '../../Store/actions/index';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    
    const dispatch = useDispatch();

    const ings = useSelector(state=>{
        return state.burgerBuilder.ingredients;
    });

    const price = useSelector(state=>{
        return state.burgerBuilder.totalPrice;
    });

    const error = useSelector(state=>{
        return state.burgerBuilder.error;
    });

    const isAuthenticated = useSelector(state=>{
        return state.auth.token;
    });

    const onIngredientAdded = ingName => dispatch(burgerBuilderActions.addIngredient(ingName));
    const onIngredientRemoved = (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), []);
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));

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
        if (isAuthenticated){
        setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        };
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ings
        };
        
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( ings ) {
            burger = (
                <ReactAux>
                    <Burger ingredients={ings} />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(ings)}
                        ordered={purchaseHandler}
                        price={price}
                        isAuth={isAuthenticated} />
                </ReactAux>
            );
            orderSummary = <OrderSummary
                ingredients={ings}
                price={price}
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

export default connect(
                mapStateToProps, 
                mapDispatchtoProps)(BurgerBuilder, axios);