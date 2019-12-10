import {
  DELETE_REVIEW,
  APPROVE_REVIEW,
  ADD_NEW_REVIEW,
  TEST_REVIEW_API,
  POPULATE_CV,
  ADDED_REVIEWS,
  GET_ALL_USER_REVIEW_FROM_SERVER,
  REVIEW_ADDED_SUCCESSFULLY_REPORT,
  REVIEW_ADDED_REPORT_DELETE
} from './types';

import xcard from '../_apis/xcard';
import { authHeader } from '../_helpers/authHeader';
import { alertError, alertSuccess } from './alert';
import checkIsIdFromDB from '../_helpers/checkIsIdFromDB';
import Entity from '../_helpers/Entity';
import { getApiTokenFromLocalStorage } from '../_helpers/authHeader';

import { getToken } from '../_helpers/authHeader';






export const getAllConfirmedUserReviewsAction = (location) => async dispatch => {


  const arr = location.pathname.split('/')
  const alienAlias = arr[arr.length-1];

  const response = await xcard.get(
    `/profiles/${alienAlias}/reviews?per_page=5&page=1` //
  );

  /* Распарсивание данных полученных Гет-ом для всех отзывов */
  const reviewsArr2 = response.data.data.map( (review) => {
    let { id, created_at, description, from_profile_id, rating, status_id, to_profile_id } = review;
    return { id, created_at, description, from_profile_id, rating, status_id, to_profile_id }
  });

  // console.log(response);

  dispatch({ type: GET_ALL_USER_REVIEW_FROM_SERVER, payload: reviewsArr2 });
}



export const addReviewAction = (
  review,
  fromUserAlias,
   api_token,
   alianAlias
 ) => async dispatch => {

  const per_page = 1, page = 1;

  /* Получаем алиас пользователя */
  // const alias = JSON.parse(localStorage.user).alias;

  /* Получаем токен для записи в хидер */
  // const { api_token } = getToken('user');
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }


  try {
      /* Гет запрос на получение списка профилей  */
      const resp = await xcard.get(
        `/profiles?per_page=${per_page}&page=${page}`  //
      );
      const userProfileData = resp.data.data[0].id;

      /* Пост запрос на добавление отзыва */
      const response = await xcard.post(
        `profiles/${fromUserAlias}/reviews`,
        {
          from_profile_id: userProfileData,  // 67
          to_profile_alias: alianAlias,  // 222
          description: review.value,
          rating: review.starsAmount
        }
      );

      return response;

      // dispatch({ type: REVIEW_ADDED_SUCCESSFULLY_REPORT, payload: response });

  } catch (err) {
      dispatch(alertError(err));
  }

};


export const deleteAdedReviewReportAction = (review) => {

  return {
    type: REVIEW_ADDED_REPORT_DELETE,
    payload: false
  };
};





export const getAllUserReviewsAction = ( alias, user, api_token  ) => async dispatch => {

    const per_page = 1, page = 1;
    // const api_token = user;

    console.log( api_token );

    /* get a token for writing to the header */
    // const { api_token } = getToken('user');
    if (api_token) {
      xcard.defaults.headers.common['X-Card-Token'] = api_token;
    }

    try {
       const response = await xcard.get(
         `/profiles/${alias}/reviews/all?page=${page}` // Get all reviews, confirmed or not. Only for owner of profile page
       );

       const reviewsArr = response.data.data.map( (review) => {
         let { id, created_at, description, from_profile_id, rating, status_id, to_profile_id } = review;
         return { id, created_at, description, from_profile_id, rating, status_id, to_profile_id };
       });

       dispatch({ type: GET_ALL_USER_REVIEW_FROM_SERVER, payload: reviewsArr });

    } catch (err) {
      dispatch(alertError(err));
    }

}



export const deleteReviewAction = (id, alias) => async dispatch => {

   // console.log('deleteReviewAction', id, xcard);
   /* Получаем алиас пользователя */
   // const alias = JSON.parse(localStorage.user).alias;


   const response = await xcard.delete(
     `/profiles/${alias}/reviews/${id}`
   );

   // https://testapi.xcard.one/profiles/:profile_alias/reviews/:review_id

   dispatch({ type: DELETE_REVIEW, payload: id });
};


export const approveReviewAction = (id, alias) => async dispatch => {

   console.log('deleteReviewAction', id, alias);
   // const alias = JSON.parse(localStorage.user).alias;


   const response = await xcard.put(
     `/profiles/${alias}/reviews/${id}`,
     {
       status_id: 1
     }
   );

   dispatch({ type: APPROVE_REVIEW, payload: id });

};












        /*
        const url = window.location.href.split('/');
        const alianAlias = url[url.length-1]
        if ( user.alias != alianAlias ) {
          return <PrivateRoute path="/route6" componentItem={AlienPage} exact/>
        }
        */

/*
  - документация - https://documenter.getpostman.com/view/3978124/SVYovLaC?version=latest#c31bd07c-9d94-49f2-bfeb-5ef5507f26f9
  - профили пользователей - https://documenter.getpostman.com/view/3978124/SVYovLaC?version=latest#ac493be8-b276-4607-80f3-73e2326dd02b

  - условно мой пользователь - test@yandex.ru 12345test - алиас "w131"
  - пользователь которого я отдал Владимиру - r@yandex.ru 12345test - его алисас "222"
  - для выхода чистим локальное хранилище - localStorage.clear()
*/
// https://documenter.getpostman.com/view/3978124/SVYovLaC?version=latest#c31bd07c-9d94-49f2-bfeb-5ef5507f26f9
// Я беру в ридакс-сторе getCV(auth.user.alias);
export const testReviewApiAction = ({per_page = 2, page = 1, review_id = 1}) => async dispatch => {

  /* Получаем алиас пользователя */
  const alias = JSON.parse(localStorage.user).alias;

  /* Получаем токен для записи в хидер */
  // const api_token = authHeader();
  const { api_token } = getToken('user');
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  // console.log( 'api_token - ', api_token )

  // xcard.defaults.headers.common['X-Card-Token'] = '4a68ae2f48a78f939f0d0ecd7a5125ab';


  try {

    /* Гет запросы на ЦВ-шку
    const response = await xcard.get(
      // `/profiles/${alias}/cv/detailed-list?per_page=${per_page}&page=${page}`  // Детальная ЦВ-шка для конкретного профиля...
    );
    */


    /* Гет запрос на получение списка профилей */
    const response = await xcard.get(
      `/profiles?per_page=${per_page}&page=${page}`  //
    );
    const userProfileData = response.data.data[0].id;


    /* Пост запрос на добавление отзыва
    const response = await xcard.post(
      `profiles/${alias}/reviews`,
      {
        from_profile_id: 67,
        to_profile_alias: "222",
        description: 'test second 222 review description',
        rating: 4
      }
    );
    */


     /* Гет запросы на отзывы
     const response = await xcard.get(
       // `/profiles/${alias}/cv/detailed-list?per_page=${per_page}&page=${page}`  // Детальная ЦВ-шка для конкретного профиля...
       // `/profiles/${alias}/reviews?per_page=${per_page}&page=${page}`  // что ли все отзывы для данного конкретного профиля
       // `/profiles/${alias}/reviews?per_page=${per_page}&page=${page}` // Get all reviews which was confirmed by owner of profile page
       // `/profiles/${alias}/reviews/all?per_page=${per_page}&page=${page}` // Get all reviews ,confirmed or not. Only for owner of profile page (с указанием количества)
       `/profiles/${alias}/reviews/all?page=${page}` // Get all reviews ,confirmed or not. Only for owner of profile page (без указания количества)
       // `/profiles/${alias}/reviews/${review_id}` // Get single Review
     );
      */
     /* Распарсивание данных полученных Гет-ом для всех отзывов
     const reviewsArr = response.data.data.map( (review) => {

       let { id, created_at, description, from_profile_id, rating, status_id, to_profile_id } = review;

       return { id, created_at, description, from_profile_id, rating, status_id, to_profile_id }
     });

     console.log( 'server response - ', response )
     console.log( 'reviewsArr - ', reviewsArr )

     dispatch({ type: TEST_REVIEW_API, payload: reviewsArr });
      */

     console.log( 'server response - ', userProfileData )

  } catch (err) {
    // console.log(err);
    dispatch(alertError(err));
  }
};
