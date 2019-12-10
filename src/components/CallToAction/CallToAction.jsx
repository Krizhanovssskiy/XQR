import './style.scss';

import { withRouter } from 'react-router';
import { FRIEND, BUISENESS_PAGE, BECOME_PRO } from '../../_constants';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { showPopup } from '../../_actions';
import PopupAddFriend from '../Friends/PopupAddFriend/PopupAddFriend';
import CTApopup from './CTApopup';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import i18next from 'i18next';


const CallToAction = ({
  auth,
  profile,
  isChangePage,
  popupToShow,
  friends,
  showPopup,
  history
}) => {
  const { subscription_id } = auth.user;
  const [isFriend, setIsFriend] = useState(null);

  useEffect(() => {
    if (friends.isDataReceived) {
      setIsFriend(
        ~friends.friendsList.findIndex(friend => {
          return friend.profile_friend_id === profile.id;
        })
      );
    }
  }, [friends.friendsList, friends.isDataReceived, profile.id]);

  const redirectRegistrationForAlias = () => {
    return history.push(`/register/?referrer_alias=${profile.alias}`);
  };

  const { isLoggedIn } = auth;
  if (!friends.isDataReceived && auth.isLoggedIn) return null;
  if (isLoggedIn && !isChangePage) {
    return (
      <Fragment>
        <div className="CallToAction">
          <button
            onClick={() => showPopup(FRIEND)}
            className="CallToAction__btn CallToAction__btn-primary"
          >
            {!isFriend ? i18next.t("added_contact") : i18next.t("remove_contact")}
          </button>
          <button className="CallToAction__btn CallToAction__btn-secondary">
            {i18next.t("write_message")}
          </button>
        </div>
        {popupToShow === FRIEND && (
          <Modal>
            <PopupAddFriend action={!isFriend ? 'training-2.gif' : 'remove'} />
          </Modal>
        )}
      </Fragment>
    );
  } else if (isLoggedIn && isChangePage) {
    return (
      <Fragment>
        <div className="CallToAction">
          <button
            onClick={() => showPopup(BUISENESS_PAGE)}
            className="CallToAction__btn CallToAction__btn-primary"
          >
            {i18next.t("pro")}
          </button>
          {subscription_id !== 2 && (
            <button
              onClick={() => showPopup(BECOME_PRO)}
              className="CallToAction__btn CallToAction__btn-secondary"
            >
              {i18next.t("pro_plus")}
            </button>
          )}
        </div>
        {(popupToShow === BUISENESS_PAGE || popupToShow === BECOME_PRO) && (
          <Modal>
            <CTApopup />
          </Modal>
        )}
      </Fragment>
    );
  } else {
    return (
      <div className="CallToAction">
        <button
          className="CallToAction__btn CallToAction__btn-create"
          onClick={() => redirectRegistrationForAlias()}>
          {i18next.t("create_free_page")}
        </button>
      </div>
    );
  }
};

CallToAction.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
  isChangePage: PropTypes.bool.isRequired,
  popupToShow: PropTypes.any,
  friends: PropTypes.object,
  showPopup: PropTypes.func,
};

const mapStateToProps = ({ auth, profile, isChangePage, popupToShow, friends }) => ({
  auth,
  profile,
  isChangePage,
  popupToShow,
  friends
});

export default connect(
  mapStateToProps,
  { showPopup }
)(withRouter(CallToAction));
