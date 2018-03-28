import React, { Component } from 'react';
import { isUserSignedIn } from 'blockstack';
const logo = './src/images/logo.png';
export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="panel-landing" id="section-1">
        
        <h1 className="landing-heading">Welcome to Replay</h1>
            <p className="lead"></p>
        <img src={logo} alt={"logo"}/>
            <p className="lead">
            <button className="btn btn-primary btn-lg" id="signin-button" onClick={ handleSignIn.bind(this) }>
            Sign in with Blockstack
            </button>
        </p>
      </div>
    );
  }
}
