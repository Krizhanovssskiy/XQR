import React from 'react';
import Tabs from "../../Tabs";
import ScrollHorizontalImg from "../../ScrollingHorizontalImg/ScrollingHorizontalImg";
import {connect} from "react-redux";
import {pickFeaturesTab, showPopup, hidePopup} from "../../../_actions";
import { SHOW_PRODUCT } from '../../../_constants';


const ServicesView = ({ pickedTabs,
                        pickFeaturesTab,
                        showPopup,
                        listServices}) => {

  return (
    <section className="Features section-main">
      <Tabs
        isScrollable={false}
        onClickfunc={pickFeaturesTab}
        activeTab={pickedTabs}
        classPrefix="section"
      >
        <div tabsLabel="Services">
          <ScrollHorizontalImg
            list={listServices}
            onClickBtn={() => {
              console.log('asasa');
            }}
            showProductPopUp={() => showPopup(SHOW_PRODUCT)}

            userId
          />
        </div>
        <div tabsLabel="Shop">
          <ScrollHorizontalImg
            list={listServices}
            onClickBtn={() => {
              console.log('asasa');
            }}
            showProductPopUp={() => showPopup(SHOW_PRODUCT)}
            userId
          />
        </div>
        <div tabsLabel="Auction">
          <ScrollHorizontalImg
            list={listServices}
            onClickBtn={() => {
              console.log('asasa');
            }}
            showProductPopUp={() => showPopup(SHOW_PRODUCT)}
            userId
          />
        </div>
      </Tabs>


    </section>
  )
};

const mapStateToProps = state => {
  return {
    socialNetworksArray: state.socialNetwork,
    pickedTabs: state.pickedTabs.featureTab,
    listServices: state.services
  };
};

export default connect(
  mapStateToProps,
  {
    pickFeaturesTab,
    showPopup,
  }
)(ServicesView);

