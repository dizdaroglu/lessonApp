

import {
    STUDENTS_FETCH_SUCCESS,
    STUDENT_UPDATE,
    STUDENT_SAVE_SUCCESS,
    EDIT_CLEAN
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const studentUpdate = ({ prop, value }) => {
    return {
        type: STUDENT_UPDATE,
        payload: { prop, value }
    }
}


export const studentSave = ({ phone, name, price, selectedItems, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/students/${uid}`)
            .set({ name, phone, price, selectedItems })
            .then(() => {
                dispatch({ type: STUDENT_SAVE_SUCCESS })
                Actions.home({ type: 'reset' })
            })
    }
}

export const editClean = () => {
    return {
        type: EDIT_CLEAN
    }
}

export const studentDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/students/${uid}`)
            .remove()
            .then(() => {
                Actions.home({ type: 'reset' })
            })
    }
}

export const fetchStudents = () => {
    const { currentUser } = firebase.auth();
    //console.log("id:::", currentUser.uid)
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/students`)
            .on('value', snapshot => {
                // console.log("snapppp", snapshot.val())
                dispatch({ type: STUDENTS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    }

}