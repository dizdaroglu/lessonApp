import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    JOIN_USER_SUCCESS,
    JOIN_USER,
    JOIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    user: null,
    loading: false,
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {
                ...state, email: action.payload
            }
        case PASSWORD_CHANGED:
            return {
                ...state, password: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                error: '',
                loading: true
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.payload
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                error: 'Authentication Failed.',
                loading: false
            }
        case JOIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            }
        case JOIN_USER_FAIL:
            return {
                ...state,
                error: 'Authentication Failed.',
                loading: false
            }
        case JOIN_USER:
            return {
                ...state,
                error: '',
                loading: true
            }
        default:
            return state;
    }
}