import './style.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { pickFeaturesTab } from '../../_actions';

import Tabs from '../Tabs';
import Services from '../Services';
import Shops from "../Shops";
import i18next from "i18next";

const Features = ({
  pickFeaturesTab,
  pickedTab,
  lang,
  isUserHasServices = true
}) => {
  const tabsList = [
    {
      isHave: isUserHasServices,
      tabsLabel: i18next.t("services"),
      component: <Services />
    },
    {
      isHave: true,
      tabsLabel: i18next.t("shop"),
      component: (
        <Shops />
        //<h2 style={{ color: '#1f1f1f' }}>Скоро тут появятся ваши товары</h2>
      )
    },
    {
      isHave: true,
      tabsLabel: i18next.t("auction"),
      component: (
        <h2 style={{ color: '#1f1f1f' }}>Скоро тут появится ваш аукцион</h2>
      )
    }
  ];
  const tabsListFiltered = tabsList.filter(item => item.isHave);
  const firstTab = tabsListFiltered[0].tabsLabel;
  useEffect(() => {
    pickFeaturesTab(firstTab);
  }, [pickFeaturesTab, firstTab]);

  return (
    <section className="Features section-main">
      <Tabs
        isScrollable={false}
        onClickfunc={pickFeaturesTab}
        activeTab={pickedTab}
        classPrefix="section">
        {tabsListFiltered.map(({ tabsLabel, component }) => (
          <div key={tabsLabel} tabsLabel={tabsLabel}>
            {component}
          </div>
        ))}
      </Tabs>
    </section>
  );
};

const mapStateToProps = ({ pickedTabs, lang }) => ({
  pickedTab: pickedTabs.featureTab,
  lang
});

export default connect(
  mapStateToProps,
  { pickFeaturesTab }
)(Features);
