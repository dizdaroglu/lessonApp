import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import FormReducer from './FormReducer';
import StudentReducer from './StudentReducer';



export default combineReducers({
    auth: AuthReducer,
    form: FormReducer,
    student: StudentReducer
})