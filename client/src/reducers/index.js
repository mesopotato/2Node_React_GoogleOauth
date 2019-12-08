import { combineReducers } from 'redux';
// automatically formReducer from redux-form
import { reducer as reduxForm } from 'redux-form';
import  authReducer from './authReducer';

export default combineReducers({
    //define the key wich is is then accesible throug this.props.key
    auth: authReducer,
    form: reduxForm    
});