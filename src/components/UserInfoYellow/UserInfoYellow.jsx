import './style.scss';
import React, { Component } from 'react';
import UserNameSpecialty from '../UserNameSpecialty'
import SocialNetwork from '../SocialNetwork';


class UserInfoYellow extends Component {


  render() {
    return (
      <section className="UserInfoYellow section-main">
        <UserNameSpecialty />
        <SocialNetwork />
      </section>
    )
  }
}

export default UserInfoYellow;