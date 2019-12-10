import './style.scss';

import React           from 'react';
import Hashtags        from '../../Hashtags';
import SocialNetwork   from "../../SocialNetwork";
import MainInfoContact from "../../MainInfoContact";

// import VideoContainer from '../../VideoContainer';
import CallToAction from '../../CallToAction/CallToAction';
import UserName from './UserName';
import MainInfoRout from './MainInfoRout';
import SocialNetworkRout from './SocialNetworkRout';

const UserInfoVertically = ({ socialNetworksArray }) => {
  return (
    <div className="UserInfoVertically__container">
      <UserName />

      <SocialNetwork clazz="UIV-marg-top" />

      <Hashtags clazz="Route__hashtags" />

      <MainInfoRout />

      {/*<VideoContainer />*/}
      <div className="UserInfoVertically__CallToAction-box">
        <CallToAction />
      </div>
    </div>
  );
};

export default UserInfoVertically;
