import React, {Component} from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent(){
        switch (this.props.auth){
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
              <a href="#" className="brand-logo">{this.renderContent()}</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
                <li><a href="collapsible.html">Login With Google :)</a></li>
              </ul>
            </div>
          </nav>
        );
    }
}
function mapAuthStateToProps({auth}){
    return { auth };
}
export default connect(mapAuthStateToProps)(Header);