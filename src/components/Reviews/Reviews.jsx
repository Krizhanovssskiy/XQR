import './style.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Review from "./Review";

import {
  addReviewAction,
  deleteReviewAction,
  approveReviewAction,
  testReviewApiAction,
  getAllUserReviewsAction,
  getAllConfirmedUserReviewsAction
} from '../../_actions';


/*
  clazz - пока что undefined
  данные в сторе обновляются константой - PICK_USERDETAILS_TAB
  в Екшене - _actions\pickTabs
  есть такой редьюсер - reviewsReducer

  - Есть хелпер  _helpers\reviewsArray.js
  - Данные из хелпера попадают в редьюсер  reviewsReducer где и попадают
  в стейт по дефолту.
  - В существующем редьюсере указываю новое действие  ADD_NEW_REVIEW
  - Создаю Екшен, который активирует данное действие  addReviewAction
  Импортирую в Екшен созданную константу  ADD_NEW_REVIEW
  - Експортирую Екшен из _actions > index.js
  - Импортирую Екшен на страницу с компонентом
  - Прокидываю Екшен в пропсы
  export default connect(mapStateToProps, { addReviewAction })(Reviews);
  - Принимаю Екшен в параметрах  const Reviews = ({clazz, reviewsArray, addReviewAction})

  - @ reviewsReducer указываю действие на удаление отзыва
*/
const Reviews = ({
    user,
    clazz,
    reviewsArray = [],
    addReviewAction,
    deleteReviewAction,
    approveReviewAction,
    testReviewApiAction,
    isAlien,
    getAllUserReviewsAction,
    getAllConfirmedUserReviewsAction,
    location,
    api_token
  }) => {

  // console.log( 'reviews - ', getAllUserReviewsAction())
  const [reviews, getUserReviews] = useState(reviewsArray);
  // getAllUserReviews(getAllUserReviewsAction(), [])

  // console.log( api_token )


  useEffect(() => {
    isAlien
      // ? getUserReviews( getAllConfirmedUserReviewsAction() )
      ? getAllConfirmedUserReviewsAction( location )
      : getAllUserReviewsAction( user.alias, user, api_token )
  }, []);

  return (
    <ul className={`Reviews__list ${clazz}`}>
      {/*
        reviewsArray.map( item => {
          // console.log( item.status_id );
          return (
            <Review
              key={item.id}
              item={item}
              isAlien={isAlien}
              status_id={item.status_id}
            />
          )
        })
        */}
        <h2 style={{color: 'var(--color-primary)'}}>Скоро здесь появятся ваши отзывы</h2>
    </ul>
  )
};

export default connect(
  (state) => ({
    reviewsArray: state.reviews,
    user: state.user
  }), { addReviewAction, deleteReviewAction, approveReviewAction, testReviewApiAction, getAllUserReviewsAction, getAllConfirmedUserReviewsAction }
)(Reviews);
