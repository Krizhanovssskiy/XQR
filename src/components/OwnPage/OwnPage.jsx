import './style.scss';

import useMobileDetect from '../../_helpers/useMobileDetect';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../../_src/lib/api';
import {
  getServices,
  getCV,
  getPortfolio,
  getGoalsListing,
  getCategories,
  getFriends,
  getVideoListing,
  getNetworks,
  getContacts,
  getShop
} from '../../_actions';
import UserHeading from '../UserHeading';
import GlobalMenu from '../GlobalMenu';
import CallToAction from '../CallToAction';
import UserInfoYellow from '../UserInfoYellow';
import Categories from '../Categories';
import Friends from '../Friends';
import Loader from '../Loader';
import UserMainInfo from '../UserMainInfo';
import MainAboutMe from '../view/MainAboutMe/MainAboutMe';
import Features from '../Features';
import UserDetails from '../UserDetails';


import Modal from '../Modal';
import TrainingWindows from '../TrainingWindows/TrainingWindows';


const OwnPage = ({
  ownAlias,
  api_token,
  getUserInfo,
  getServices,
  getCV,
  getPortfolio,
  getGoalsListing,
  getCategories,
  getFriends,
  getVideoListing,
  getNetworks,
  getContacts,
  getShop
}) => {
  useEffect(() => {
    if (ownAlias) getUserInfo({ alias: ownAlias });
  }, [ownAlias, getUserInfo]);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView();
    }
  });

  const [isAllDataReceived, setIsAllDataReceived] = useState(false);

  useEffect(() => {
    (async () => {
      if (ownAlias && api_token) {
        await Promise.all([
          getServices(ownAlias),
          getCV(ownAlias),
          getPortfolio(ownAlias),
          getGoalsListing(ownAlias),
          getVideoListing(ownAlias),
          getCategories(api_token, ownAlias),
          getFriends(api_token, ownAlias),
          getNetworks(),
          getContacts(ownAlias),
          getShop(ownAlias)
        ]);
        setIsAllDataReceived(true);
      }
    })();
  }, [
    ownAlias,
    api_token,
    getServices,
    getCV,
    getPortfolio,
    getGoalsListing,
    getVideoListing,
    getCategories,
    getFriends,
    getNetworks,
    getContacts,
    getShop
  ]);

  const isMobile = useMobileDetect();
  if (!isAllDataReceived) {
    return (
      <Modal>
        <Loader />;
      </Modal>
    );
  }

  switch (isMobile) {
    case true:
      return (
        <div ref={contentRef} className="OwnPage">
          <div className="OwnPage__UserHeading-box">
            <UserHeading />
            <UserInfoYellow />
          </div>
          <div className="OwnPage__UserDetails-box">
            <GlobalMenu />
          </div>
          <div className="OwnPage__CallToAction-box">
            <CallToAction />
          </div>
          <div className="OwnPage__Friends-box">
            {/* <Categories /> */}
            <Friends />
          </div>
          <TrainingWindows />
        </div>
      );
    case false:
      return (
        <div className="OwnPage">
          <div className="OwnPage__UserHeading-box">
            <UserHeading />
          </div>
          <div className="OwnPage__UserMainInfo-box">
            <UserMainInfo />
          </div>
          <div className="OwnPage__MainAboutMe-box">
            <MainAboutMe clazz="OwnPage__" />
          </div>
          <div className="OwnPage__Features-box">
            <Features />
          </div>
          <div className="OwnPage__UserDetails-box">
            <UserDetails />
          </div>
          <div className="OwnPage__Friends-box">
            {/* <Categories /> */}
            <Friends />
          </div>
        </div>
      );
    case null:
      return null;
    default:
      return console.error('something gone wrong');
  }
};

OwnPage.propTypes = {
  getUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  ownAlias: auth.user.alias,
  api_token: auth.user.api_token
});

export default connect(
  mapStateToProps,
  {
    getUserInfo,
    getServices,
    getCV,
    getPortfolio,
    getGoalsListing,
    getCategories,
    getFriends,
    getVideoListing,
    getNetworks,
    getContacts,
    getShop
  }
)(withRouter(OwnPage));
