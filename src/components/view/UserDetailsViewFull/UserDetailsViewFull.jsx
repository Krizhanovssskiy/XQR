import './style.scss';
import { PORTFOLIO, CV } from '../../../_constants';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { pickUserdetailsTab } from '../../../_actions';

import Tabs from '../../Tabs';
import Portfolio from '../../Portfolio';
import CurrVitae from '../../CurrVitae';

const UserDetailsViewFull = ({
  pickUserdetailsTab,
  pickedTab,
  lang,
  isUserHasCv,
  isUserHasPortfolio
}) => {
  const tabsList = [
    {
      isHave: isUserHasPortfolio,
      tabsLabel: PORTFOLIO['RU'],
      component: <Portfolio />
    },
    {
      isHave: isUserHasCv,
      tabsLabel: CV['RU'],
      component: (
        <CurrVitae isPopupable={false} classPrefix="CurrVitaeViewFull" />
      )
    }
  ];
  const tabsListFiltered = tabsList.filter(item => item.isHave);
  const firstTab = tabsListFiltered[0].tabsLabel;

  useEffect(() => {
    pickUserdetailsTab(firstTab);
  }, [pickUserdetailsTab, firstTab]);

  return (
    <section className="UserDetailsViewFull section-main">
      <Tabs
        isScrollable={false}
        onClickfunc={pickUserdetailsTab}
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

const mapStateToProps = ({ pickedTabs, lang }) => ({
  pickedTab: pickedTabs.userdetailsTab,
  lang
});

export default connect(
  mapStateToProps,
  { pickUserdetailsTab }
)(UserDetailsViewFull);
