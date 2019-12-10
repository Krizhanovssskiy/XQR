import '../style.scss';

import React from 'react';
import { connect } from 'react-redux';
import UserHeadingView from '../UserHeadingView';
import AboutMe from '../MainAboutMe';
import UserInfoHorizontal from "../UserInfoRout/UserInfoHorizontal";

const Route_1 = ({ socialNetworksArray }) => {
  return (
    <div className="Route">
      <div className="Route__row">
        <div className="Route__UserHeadingView-box">
          <UserHeadingView />
        </div>
        <div className="Route__AboutMe-box">
          <AboutMe />
        </div>
      </div>
      <div className="Route__row">
        <UserInfoHorizontal clazz='Route__marg-top' socialNetworksArray={socialNetworksArray} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    socialNetworksArray: state.socialNetwork
  };
};

export default connect(mapStateToProps)(Route_1);
