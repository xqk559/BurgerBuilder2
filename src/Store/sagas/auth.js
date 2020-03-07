import {put} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import {delay} from 'redux-saga/effects';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationDate*1000);
    yield put(actions.logout());
} 