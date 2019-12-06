import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'logging in ';
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return <li><a href="auth/logout">Logout</a></li>;
        }
    }
    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">

                    <Link to={this.props.auth ? '/survey/new' : '/'} className="left brand-logo">Loading / Dashboard</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
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