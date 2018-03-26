import React, {Component} from 'react';
import { Player } from 'video-react';
import PropTypes from 'prop-types';
import Vidget from './Vidget.jsx';

import classNames from 'classnames';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string,
};


//import blockstack deps
import {
  isSignInPending,
  loadUserData,
  Person,
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return (
      !isSignInPending() ?
      <div className="top-panel" id="section-1">
        <div className="video-section">
            <Player src="http://media.w3.org/2010/05/bunny/movie.mp4" autoPlay></Player> 
        </div>

        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" />
        </div>
        <h1>What say you?!, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
        <p className="lead">
          <button className="btn btn-primary btn-lg" id="signout-button" onClick={ handleSignOut.bind(this) }>
            Sign Out
          </button>
        </p>
      </div> : null
    );
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }
}
