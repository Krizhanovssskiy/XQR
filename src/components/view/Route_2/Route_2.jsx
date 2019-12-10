import React from 'react';
import { connect } from 'react-redux';
import UserInfoHorizontal from '../UserInfoRout/UserInfoHorizontal';
import { pickFeaturesTab } from '../../../_actions';
import UserHeadingView from '../UserHeadingView';
import AboutMe from '../MainAboutMe';
import ServicesView from '../ServicesView';

const Route_2 = ({ socialNetworksArray }) => {
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
        <ServicesView />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    socialNetworksArray: state.socialNetwork,
    pickedTabs: state.pickedTabs.featureTab
  };
};

export default connect(
  mapStateToProps,
  { pickFeaturesTab }
)(Route_2);
