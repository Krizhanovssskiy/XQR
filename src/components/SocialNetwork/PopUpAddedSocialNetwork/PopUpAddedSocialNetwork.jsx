import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import { showPopup, hidePopup } from '../../../_actions';

import {CheckedIn, Reset, SocialNetworkBtn} from "../../Buttons";
import i18next from 'i18next';

const PopUpAddedSocialNetwork = ({ itemsPopUp,
                                onSubmitObj,
                                onClickSocialIcon,
                                handleChange,
                                onResetSocialPopup,
                                socialNetworks,
                                networks }) => {

    let array = networks.filter((itemDef) => {
        return socialNetworks.filter(itemArr => {
                return itemDef.id === itemArr.network_id
            }
        ).length === 0;
    });

    const {  userLink, socialNetworkId, validLink, } = itemsPopUp;
    return (
      <div className='SocialNetwork__popup-edit-social-network'>
        <form onSubmit={onSubmitObj}>
          <div className="SocialNetwork__popup-edit-header">
            <ul className="SocialNetwork__icon-list PopUpSocNetwork__block-list">
              {
                array.map((item) => {
                  const { name, id } = item;
                  let clazz = socialNetworkId === id ? 'PopUpSocNetwork__white-btn PopUpSocNetwork__active' : ' PopUpSocNetwork__white-btn';
                  return (
                    <li
                      className='SocialNetwork__icon-box'
                      key={`${id}_popup`}
                      onClick={onClickSocialIcon(item)}
                    >
                      <SocialNetworkBtn
                        className={clazz}
                        iconId={name} />
                    </li>
                  )
                })
              }
            </ul>
            <input
              placeholder={i18next.t("soc_network.placeholder")}
              onChange={handleChange}
              value={userLink}
              className='SocialNetwork__input'
              type="text"
              // readOnly={ (validLink.length >= 0) ? true : false }
            />

            <div className='SocialNetwork__form-btn-block'>
              <Reset
                onClick={onResetSocialPopup}
                className='SocialNetwork__icon-form-btn'
              />

              <CheckedIn
                onClick={onSubmitObj}
                className='SocialNetwork__icon-form-btn'
              />
            </div>
          </div>
        </form>
      </div>
    )
};

const mapStateToProps = (state) => {
  return {
      socialNetworks: state.infoContacts.socialNetworks,
      popupToShow: state.popupToShow,
      networks: state.networks,
  }
};

export default connect(
  mapStateToProps,
  {
    hidePopup,
    showPopup,
  }
)(PopUpAddedSocialNetwork);