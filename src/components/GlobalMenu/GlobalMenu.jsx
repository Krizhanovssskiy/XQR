import './style.scss';
import { withRouter } from 'react-router-dom';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  pickGlobalMenuTab,
  getServices,
  getCV,
  getPortfolio
} from '../../_actions';
import { CONTACTS, SERVICES, SHOP, CV, PORTFOLIO } from '../../_constants';
import Tabs from '../Tabs';
import Services from '../Services';
import Shops from "../Shops";
import CurrVitae from '../CurrVitae';
import Portfolio from '../Portfolio';
import UserContactsYellow from '../UserContactsYellow';
import i18next from "i18next";

const GlobalMenu = ({
  pickGlobalMenuTab,
  pickedTab,
  auth,
  match,
  isUserHasServices,
  isUserHasCv,
  isUserHasPortfolio
}) => {
  useEffect(() => {
    pickGlobalMenuTab(i18next.t("info"));
  }, [pickGlobalMenuTab]);

  const {params: { alias }} = match;
  const tabsList = [
    {
      isHave: true,
      tabsLabel: i18next.t("info"),
      component: <UserContactsYellow />
    },
    {
      isHave: isUserHasServices,
      tabsLabel: i18next.t("services"),
      component: <Services />
    },
    {
      isHave: true,
      tabsLabel: i18next.t("shop"),
      component: <Shops />
    },
    {
      isHave: isUserHasCv,
      tabsLabel: i18next.t("cv"),
      component: <CurrVitae />
    },
    {
      isHave: isUserHasPortfolio,
      tabsLabel: i18next.t("portfolio"),
      component: <Portfolio />
    }
  ];
  const tabsListFiltered = tabsList.filter(item => item.isHave);
  const isOwnPage = auth.user.alias === alias;
  const tabsListToRender = isOwnPage ? tabsList : tabsListFiltered;

  return (
    <section className="GlobalMenu section-main">
      <Tabs
        isScrollable={false}
        onClickfunc={pickGlobalMenuTab}
        activeTab={pickedTab}
        classPrefix="GlobalMenu">
        {tabsListToRender.map(({ tabsLabel, component }) => (
          <div key={tabsLabel} tabsLabel={tabsLabel}>
            {component}
          </div>
        ))}
      </Tabs>
    </section>
  );
};
const mapStateToProps = ({
  pickedTabs,
  auth
}) => ({
  pickedTab: pickedTabs.globalMenuTab,
  auth
});

export default connect(
  mapStateToProps,
  { pickGlobalMenuTab, getServices, getCV, getPortfolio }
)(withRouter(GlobalMenu));
