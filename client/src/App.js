import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'; //react-router lib (generic) , react-router-native (for native)
import{connect} from 'react-redux';
import * as actions from './actions';

// components 
import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import NewSurvey from './components/surveys/NewSurvey';
//const Dashboard = () => <h2>Dashboard</h2>
//const SurveyNew = () => <h2>SurveyNew</h2>
//const Landing = () => <h2>Landing</h2>

//function App() {
//const App = () => {
class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      
        <BrowserRouter>
          {/* inside browser router will be a collection of different routes  (expects at most ONE Child!!!)*/}
          <div className="container">

            {/* always show header.. so no route needed */}
            <Header />
            {/* specifi the url and the compnent to decide what set it chechs if the path is CONTAINED */}
            {/* for the url.. so /survey component will be displayed for the route /survey/details  if the prop  exact={true} is not passed*/}
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/survey" component={Dashboard} />
            <Route exact={true} path="/survey/new" component={NewSurvey} />
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
          </div>
        </BrowserRouter>

    );
  }
}

// will be assigning the state as props 
export default connect(null, actions)(App);

{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
{/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
{/*    <a className='App-link' href="/auth/google">Sign in with Google and send a request to the express server</a>*/ }
  //    </header>
