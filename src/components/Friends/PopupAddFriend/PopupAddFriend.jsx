import './style.scss';
import sprite from '../../../img/sprite.svg';
import { connect } from 'react-redux';
import { addFriend, removeFriend, hidePopup } from '../../../_actions';

import React from 'react';
import i18next from "i18next";

const PopupAddFriend = ({
  action,
  auth,
  profile,
  addFriend,
  removeFriend,
  hidePopup
}) => {
  const onClickConfirm = () => {
    const { api_token, alias } = auth.user;
    const friend_alias = profile.alias;
    if (action === 'training-2.gif') {
      addFriend({
        api_token,
        alias,
        friend_alias
      });
    } else if (action === 'remove') {
      removeFriend({
        api_token,
        alias,
        friend_alias
      });
    }
    hidePopup();
  };
  const username =
    profile.first_name || profile.last_name
      ? `${profile.first_name || ''} ${profile.last_name || ''}`
      : profile.alias;
  const alertText =
    action === 'training-2.gif' ? (
      <p className="PopupAddFriend__message">
        {i18next.t("popup_add_friend.message_add")}{' '}
        <span className="PopupAddFriend__message-username">{username}</span>
        {i18next.t("popup_add_friend.in_contact")}
      </p>
    ) : (
      <p className="PopupAddFriend__message">
        {i18next.t("popup_add_friend.message_remove")}{' '}
        <span className="PopupAddFriend__message-username">{username}</span>
        {i18next.t("popup_add_friend.from_contact")}
      </p>
    );
  const onClickReset = () => {
    hidePopup();
  };

  return (
    <div className="PopupWrapper">
      <div className="PopupAddFriend__message-box">
        {alertText}
      </div>
      <div className="PopupWrapper__btn-container">
        <button
          onClick={onClickReset}
          type="button"
          className="PopupWrapper__btn"
        >
          <p className="PopupWrapper__icon-text">{i18next.t("cancel_btn")}</p>
          <svg className="PopupWrapper__icon-cancel">
            <use xlinkHref={`${sprite}#icon-cancel`} />
          </svg>
        </button>
        <button
          onClick={onClickConfirm}
          type="button"
          className="PopupWrapper__btn"
        >
          <p className="PopupWrapper__icon-text">{i18next.t("save_btn")}</p>
          <svg className="PopupWrapper__icon-confirm">
            <use xlinkHref={`${sprite}#icon-confirm`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile
});

export default connect(
  mapStateToProps,
  { addFriend, removeFriend, hidePopup }
)(PopupAddFriend);
