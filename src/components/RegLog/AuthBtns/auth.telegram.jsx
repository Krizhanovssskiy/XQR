
import React, { Component } from 'react';

import SocialNetworkLoginBtn from '../SocialNetworkLoginBtn';

class AuthTelegram extends Component {
  onSignInClick() {}

  render() {
    return (
      <SocialNetworkLoginBtn
        onSignInClick={this.onSignInClick}
        name="telegram-color"
      />
    );
  }
}

export default AuthTelegram;
