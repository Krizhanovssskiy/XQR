import './style.scss';
import React from 'react';
import { connect } from 'react-redux';
import { showPopup } from '../../../_actions';
import Tabs from '../../Tabs';
import CvPopupUnit from './CvPopupUnit';

const CvPopup = ({ showPopup, popupToShow }) => {
  return (
    <div className="CvPopup">
      <Tabs
        isScrollable={true}
        onClickfunc={showPopup}
        activeTab={popupToShow}
        classPrefix="CvPopup"
      >
        <div tabsLabel="Профессиональные навыки">
          <CvPopupUnit cvLabelIdx={0} />
        </div>
        <div tabsLabel="Сертификаты">
          <CvPopupUnit cvLabelIdx={1} />
        </div>
        <div tabsLabel="Языковые навыки">
          <CvPopupUnit cvLabelIdx={2} />
        </div>
        <div tabsLabel="Образование">
          <CvPopupUnit cvLabelIdx={3} />
        </div>
        <div tabsLabel="Сферы деятельности">
          <CvPopupUnit cvLabelIdx={4} />
        </div>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ popupToShow }) => ({ popupToShow });

export default connect(
  mapStateToProps,
  { showPopup }
)(CvPopup);
