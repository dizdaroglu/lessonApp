
import {
    SELECTED_ITEMS,
    PHONE_CHANGED,
    NAME_CHANGED,
    STUDENT_CREATE,
    PRICE_CHANGED,
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    }
}


export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    }
}


export const priceChanged = (text) => {
    return {
        type: PRICE_CHANGED,
        payload: text
    }
}




export const selectFormItems = ({ selectedItems }) => {

    return {
        type: SELECTED_ITEMS,
        payload: selectedItems
    }
}


export const createForm = ({ selectedItems, name, phone, price }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/students`)
            .push({ name, phone, price, selectedItems })
            .then(() => {
                dispatch({ type: STUDENT_CREATE });
                Actions.home({ type: 'reset' })
            })
    }
}
