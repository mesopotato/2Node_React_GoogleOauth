
import { FETCH_USER } from '../actions/types';
// is responsible to decide if a user is logged in 
// return null to indicate that the request is still pending (when the reducer is called first time)
export default function(state = null, action) {
    console.log('logging the action');
    console.log(action);
    switch (action.type){
        case FETCH_USER:
            return action.payload || false; // because payload is '' and its treated as false in JS .. -.-wtf
        // if no type it will silply return the state 
        default:
            return state;
    }
}