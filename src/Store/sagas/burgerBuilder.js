import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get( 'https://burgerbuilder-cea69.firebaseio.com/ingredients.json' )
        yield put(actions.setIngredients(response.data)); 
    } catch (error) {
        yield put(action.fetchIngredientsFailed());
    }
}