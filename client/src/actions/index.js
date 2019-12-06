import axios from 'axios';
import { FETCH_USER } from './types';

//actionCreator 
// export const fetchUser = () => {
//     // reduy thunk will pass the dispatcher and we can specify the action in the .then .. so its returning not an action but a function
//     return function (dispatch) {
//         axios
//             .get('/auth/user')
//             .then(res => dispatch({
//                 type: FETCH_USER,
//                 payload: res
//             }))
//     }
// };

// analog syntax but more MODERN : if after => only one statement (like we have ) then remove return and the {}
//actionCreator 
export const fetchUser = () =>
    // reduy thunk will pass the dispatcher and we can specify the action in the .then .. so its returning not an action but a function
    //function can be replaced by => and () removed 
    async dispatch => {
         // now rather than .then : use the async await 
        const res = await axios.get('/auth/user');
        dispatch({
            type: FETCH_USER,
            payload: res.data
        });
    };

    // reusing this type and extend the user model for this time
export const handleToken  = (token) => 
    async dispatch => {
        const res = await axios.post('/billing/stripe', token);
        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }