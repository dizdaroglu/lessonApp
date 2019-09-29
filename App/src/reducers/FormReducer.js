import {
    SELECTED_ITEMS,
    PHONE_CHANGED,
    NAME_CHANGED,
    STUDENT_CREATE,
    PRICE_CHANGED,
    STUDENT_UPDATE,
    STUDENT_SAVE_SUCCESS,
    EDIT_CLEAN
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    price: '',
    days: [],
    selectedItems: []
}
export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch (action.type) {
        case SELECTED_ITEMS:
            return {
                ...state, selectedItems: action.payload
            }
        case PHONE_CHANGED:
            return {
                ...state, phone: action.payload
            }
        case NAME_CHANGED:
            return {
                ...state, name: action.payload
            }
        case STUDENT_CREATE:
            return {
                ...INITIAL_STATE
            }
        case PRICE_CHANGED:
            return {
                ...state, price: action.payload
            }
        case STUDENT_UPDATE:
            return {
                ...state, [action.payload.prop]: action.payload.value
            };
        case STUDENT_SAVE_SUCCESS:
            return INITIAL_STATE
        case EDIT_CLEAN:
            return INITIAL_STATE
        default:
            return state;
    }
}