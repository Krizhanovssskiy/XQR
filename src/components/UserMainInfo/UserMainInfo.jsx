import './style.scss';

import React, {Component} from 'react';
import SocialNetwork                from '../SocialNetwork';
import MainInfoContact              from '../MainInfoContact';
import UserNameSpecialty from "../UserNameSpecialty";
// import VideoContainer from "../VideoContainer";
import {connect}                    from 'react-redux';
import { withRouter }               from 'react-router'
import {editUserData, setUserInfo}  from '../../_src/lib/api';
import {alertClear}                 from '../../_actions';
import CallToAction                 from '../CallToAction/CallToAction';


class UserMainInfo extends Component {

    render() {
        const {isChangePage, history} = this.props;
            return (
              <section className="UserMainInfo__section section-main">
                  <UserNameSpecialty />
                  <SocialNetwork/>
                  <MainInfoContact/>

                  {/*<VideoContainer />*/}
                  <CallToAction  history={history}/>
              </section>
          );
      }
  }

  export default connect(
    ({profile, alert,auth,isChangePage}) =>
        ({isChangePage,isLoggedIn: auth.isLoggedIn, user: auth.user,
        user_profile: profile, alert}),
    {editUserData, setUserInfo,alertClear}
)(withRouter(UserMainInfo));
