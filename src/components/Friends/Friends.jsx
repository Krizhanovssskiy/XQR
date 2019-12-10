import './style.scss';
import {pick} from 'underscore';

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Friend from './Friend/Friend';
import i18next from "i18next";
import { getScrollFriend } from "../../_actions";

const Friends = ({ownAlias, api_token, friends, getScrollFriend}) => {
  const [pageNumber, setIncrementPageNumber] = useState(1);

  const onScrollList = (e) => {
    const scrollToBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (scrollToBottom) setIncrementPageNumber(pageNumber + 1)
  };

  useEffect(() => {
    if (pageNumber !== 1) {getScrollFriend(api_token, ownAlias, 15, pageNumber)};
    },
    [pageNumber, getScrollFriend]
  );

  return (
    <section className="Friends section-main">
      <h3 style={{textAlign: 'left'}} className="Categories__title">{ i18next.t("contacts") }</h3>
      <ul
        onScroll={onScrollList}
        className="Friends__list"
      >
        {friends.friendsList.map(friend => {
          const toFriend = pick(
            friend.friend_profile,
            'id',
            'first_name',
            'last_name',
            'alias',
            'specialty',
            'profile_images'
          );
          return <Friend key={friend.id} {...toFriend} />;
        })}
      </ul>
    </section>
  );
};

const mapStateToProps = ({auth, friends}) => ({
  friends,
  ownAlias: auth.user.alias,
  api_token: auth.user.api_token
});

export default connect(
  mapStateToProps,
  {
    getScrollFriend
  }
)(Friends);
