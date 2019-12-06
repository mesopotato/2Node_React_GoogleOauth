import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

// createStore 1 reducer (if none "() => []"), 2 initial state (here an empty object), 3 middleware 
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
// 2 args : root component and where to render this component.. (DOM node) this is a div in the index.html in the public folder 
ReactDOM.render(
    // place the react-redux around and pass the store as a prop.. if the state in the store get updated the props will be passed down to all childs
<Provider store={store}><App /></Provider>,
 document.getElementById('root'));

 console.log('STRIPE_KEY IS ', process.env.REACT_APP_STRIPE_KEY);
 console.log('automaticaly set env vairable NODE_ENV: ' , process.env.NODE_ENV);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
