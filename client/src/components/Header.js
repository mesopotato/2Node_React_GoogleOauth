import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'logging in ';
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return [
                    // elements must have a key attribute when returning multiple 
                    <li key="1" ><Payments/></li>,
                    <li key="3" style={{margin: '0 10px'}}> Credits : {this.props.auth.konto * 0.01}</li>,
                    <li key="2" ><a href="auth/logout">Logout</a></li>
                ];
        }
    }
    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <div className="container"><Link to={this.props.auth ? '/survey/new' : '/'} className="left brand-logo">Loading / Dashboard</Link></div>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {/* <li><Link>Add credit</Link></li> */}
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapAuthStateToProps({ auth }) {
    return { auth };
}
export default connect(mapAuthStateToProps)(Header);