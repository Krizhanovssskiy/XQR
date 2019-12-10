import sprite from '../../img/sprite.svg';
import girl from '../../img/girl.png';
import React from 'react';
import { connect } from 'react-redux';

import {
  deleteReviewAction,
  approveReviewAction
} from '../../_actions';


const Review = ({item, profile, deleteReviewAction, approveReviewAction, isAlien}) => {

  const {name = 'test', comment, publicationDate, description} = item;

  // console.log(item);

  const onDeleteClick = (e) => {
    deleteReviewAction(item.id, profile.alias);
  };

  const onApproveClick = (e) => {
    console.log(item.id, profile.alias);
    approveReviewAction(item.id, profile.alias);
  };

  const buttons = () => {

    return(
      <div className="Review__btn-box">
        <button onClick={onApproveClick} className="Review__btn Review__btn-primary-semibold">Одобрить</button>
        <button onClick={onDeleteClick} className="Review__btn Review__btn-white">Удалить</button>
      </div>
    )
  };


  const noteFilledStar = 5 - item.rating;
  const viewStars = () => {

      const test = [...Array(item.rating)].map((n, i) => (
        <svg key={i + 100} className="Review__icon">
          <use xlinkHref={`${sprite}#icon-star-review-filled`} />
        </svg>
      ));

      const test2 = [...Array(noteFilledStar)].map((n, i) => (
        <svg key={i + 50} className="Review__icon">
          <use xlinkHref={`${sprite}#icon-star-review`} />
        </svg>
      ));

      return [...test, ...test2];

  };

  // console.log( item );

  return (
    <li
      className="Review"
    >
      <div
        className="Review__image-box"
        style={{ backgroundImage: `url(${girl})` }}
      />
      <div className="Review__text-container">
        <h4 className="Review__username">{name}</h4>
        <div className="Review__star-box">

          {viewStars()}

        </div>
        <div className="Review__text-box">
          {description}
        </div>

        {
          !isAlien
          ? item.status_id == 4 ? buttons() : ''
          : ''
        }

      </div>
      <div className="Review__date-box">{publicationDate}</div>

    </li>
  );
};

export default connect(
  (state) => ({
    profile: state.profile
  }), { deleteReviewAction, approveReviewAction }
)(Review);
