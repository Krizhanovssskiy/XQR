import './style.scss';
import { PORTFOLIO, CV, REVIEWS } from '../../_constants';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { pickUserdetailsTab } from '../../_actions';

import Tabs from '../Tabs';
import Portfolio from '../Portfolio';
import CurrVitae from '../CurrVitae';
import Reviews from '../Reviews';
import i18next from "i18next";

const UserDetails = ({ pickUserdetailsTab, pickedTab, lang }) => {

  useEffect(() => {
    pickUserdetailsTab(i18next.t("portfolio"));
  }, [ pickUserdetailsTab]);

  return (
    <section className="UserDetails section-main">
      <Tabs
        isScrollable={false}
        onClickfunc={pickUserdetailsTab}
        activeTab={pickedTab}
        classPrefix="section">
        <div tabsLabel={i18next.t("portfolio")}>
          <Portfolio />
        </div>
        <div tabsLabel={i18next.t("cv")}>
          <CurrVitae />
        </div>
        {/* <div tabsLabel={i18next.t("reviews")}>
          <Reviews />
        </div> */}
      </Tabs>
    </section>
  );
};

const mapStateToProps = ({ pickedTabs, lang }) => ({
  pickedTab: pickedTabs.userdetailsTab,
  lang
});

export default connect(
  mapStateToProps,
  { pickUserdetailsTab }
)(UserDetails);
