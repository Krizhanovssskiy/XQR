import './style.scss';

import React                        from 'react';
import { connect }                  from 'react-redux';
import MainInfoContact              from '../MainInfoContact';
import AboutMe                      from '../view/MainAboutMe/AboutMe/AboutMe';
import {alertClear, pickAboutMeTab} from "../../_actions";
import {editUserData, setUserInfo}  from "../../_src/lib/api";

const UserContactsYellow = ({ setUserInfo, alertClear,
                              isChangePage, user_profile,
                              editUserData, user}) => {



  const objectProps = {
    userProfile: user_profile,
    isChangePage,
    editUserData,
    setUserInfo,
    user,
    alertClear
  };
  return (
    <div className="UserContactsYellow">
      <MainInfoContact />
      <AboutMe {...objectProps} />
    </div>
  )
};

const mapStateToProps = ({isChangePage, pickedTabs, profile, auth}) => ({
  pickedTabs: pickedTabs.aboutmeTab,
  isChangePage,
  user_profile: profile,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {pickAboutMeTab, editUserData,setUserInfo,alertClear}
)(UserContactsYellow);

