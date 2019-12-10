import React, { Fragment } from 'react';
import Hashtags from '../../Hashtags';
// import VideoContainer from '../../VideoContainer';
import CallToAction from '../../CallToAction/CallToAction';
import UserName from './UserName';
import MainInfoRout from './MainInfoRout';
import SocialNetworkRout from "./SocialNetworkRout";

const UserInfoHorizontal = ({ clazz }) => {
  return (
    <Fragment>
      <div className="Route__fixed-width">

        <UserName />

        <Hashtags clazz={`Route__hashtags ${clazz}`} showButton />

        <MainInfoRout />

      </div>
      <div className="Route__fixed-width">

        <SocialNetworkRout />

        {/*<VideoContainer />*/}

        <div className="Route__createWebPage-container">
          <CallToAction />
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfoHorizontal;
