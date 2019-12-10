// import './style.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from '../../Tabs';
import { pickAboutMeTab, alertClear } from '../../../_actions';
import { editUserData, setUserInfo } from '../../../_src/lib/api';

import AboutMe from './AboutMe/AboutMe';
import CustomTags from '../../CustomTags';
import PropTypes from 'prop-types';
import i18next from "i18next";

const MainAboutMe = ({
  clazz,
  pickedTab,
  pickAboutMeTab,
  setUserInfo,
  alertClear,
  isChangePage,
  user_profile,
  editUserData,
  user,
  isAboutMeHasDescription = true,
  isAboutMeHasGoals = true
}) => {
  let objectProps = {
    userProfile: user_profile,
    isChangePage,
    editUserData,
    setUserInfo,
    user,
    alertClear
  };

  const tabsList = [
    {
      isHave: isAboutMeHasDescription,
      tabsLabel: i18next.t('main_about_me.about_me'),
      component: <AboutMe {...objectProps} />
    },
    {
      isHave: isAboutMeHasGoals,
      tabsLabel: i18next.t('hash_tags'),
      component: <CustomTags clazz={clazz} />
    }
  ];
  const tabsListFiltered = tabsList.filter(item => item.isHave);
  const firstTab = tabsListFiltered[0].tabsLabel;

  useEffect(() => {
    pickAboutMeTab(firstTab);
  }, [pickAboutMeTab, firstTab]);

  return (
    <section className={`AboutMe ${clazz}main-box section-main`}>
      <Tabs
        isScrollable={false}
        onClickfunc={pickAboutMeTab}
        activeTab={pickedTab}
        classPrefix="section"
      >
        {tabsListFiltered.map(({ tabsLabel, component }) => (
          <div key={tabsLabel} tabsLabel={tabsLabel}>
            {component}
          </div>
        ))}
      </Tabs>
    </section>
  );
};

MainAboutMe.propTypes = {
  pickedTab: PropTypes.string,
  isChangePage: PropTypes.bool,
  user: PropTypes.object,
  user_profile: PropTypes.object,
  pickAboutMeTab: PropTypes.func,
  editUserData: PropTypes.func,
  setUserInfo: PropTypes.func.isRequired,
  alertClear: PropTypes.func
};

const mapStateToProps = ({ isChangePage, pickedTabs, profile, auth }) => ({
  pickedTab: pickedTabs.aboutmeTab,
  isChangePage,
  user_profile: profile,
  user: auth.user
});

export default connect(
  mapStateToProps,
  { pickAboutMeTab, editUserData, setUserInfo, alertClear }
)(MainAboutMe);
