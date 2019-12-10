import React from 'react';
import { connect } from 'react-redux';
import UserInfoHorizontal from '../UserInfoRout/UserInfoHorizontal';
import UserHeadingView from '../UserHeadingView';
import AboutMe from '../MainAboutMe';
import UserDetailsView from '../UserDetailsView';

const Route_3 = ({ socialNetworksArray }) => {
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
        <UserInfoHorizontal
          clazz="Route__marg-top"
          socialNetworksArray={socialNetworksArray}
        />
      </div>

      <div className="Route__row">
        <div className="UserDetailsView__container">
          <UserDetailsView />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    socialNetworksArray: state.socialNetwork
  };
};

export default connect(mapStateToProps)(Route_3);
