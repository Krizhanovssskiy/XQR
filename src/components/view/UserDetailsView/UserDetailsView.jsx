import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import { pickUserdetailsTab } from '../../../_actions';

import Tabs from '../../Tabs';
import Portfolio from '../../Portfolio';
import CurrVitae from '../../CurrVitae';

const UserDetailsView = ({ pickUserdetailsTab, pickedTabs, cvLabels }) => {
  const cvLabelsOrdered = [...cvLabels];
  [cvLabelsOrdered[1], cvLabelsOrdered[2]] = [
    cvLabelsOrdered[2],
    cvLabelsOrdered[1]
  ];
  return (
    <section className="UserDetailsView section-main">
      <Tabs
        isScrollable={false}
        onClickfunc={pickUserdetailsTab}
        activeTab={pickedTabs}
        classPrefix="UserDetailsView"
      >
        <div tabsLabel="Portfolio">
          <Portfolio classPrefix="PortfolioView" />
        </div>
        <div tabsLabel="CV">
          <CurrVitae
            isPopupable={false}
            classPrefix="CurrVitaeView"
            cvLabelsOrdered={cvLabelsOrdered}
          />
        </div>
      </Tabs>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    pickedTabs: state.pickedTabs.userdetailsTab,
    cvLabels: state.cvLabels
  };
};

export default connect(
  mapStateToProps,
  { pickUserdetailsTab }
)(UserDetailsView);
