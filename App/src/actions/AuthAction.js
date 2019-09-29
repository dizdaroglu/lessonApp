import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    JOIN_USER_SUCCESS,
    JOIN_USER_FAIL,
    JOIN_USER
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    console.log(email, password)
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch))
    }
}

export const joinUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: JOIN_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => joinUserSuccess(dispatch, user))
            .catch(() => joinUserFail(dispatch))
    }
}
export const joinUserSuccess = (dispatch) => {
    dispatch({
        type: JOIN_USER_SUCCESS,

    });
    Actions.auth();
}
export const joinUserFail = (dispatch) => {
    dispatch({
        type: JOIN_USER_FAIL
    })
}
export const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main();
}

export const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    })
}