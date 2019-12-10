import {
  ADDED_REVIEWS,
  ADD_NEW_REVIEW,
  DELETE_REVIEW,
  APPROVE_REVIEW,
  TEST_REVIEW_API,
  GET_ALL_USER_REVIEW_FROM_SERVER,
  REVIEW_ADDED_SUCCESSFULLY_REPORT
} from '../_actions/types';

import { reviewsArray } from '../_helpers/reviewsArray';


// export default (state = reviewsArray, action) => {
export default (state = [], action) => {

  const { type, payload } = action;

  switch (type) {


    case TEST_REVIEW_API:

      // console.log( 'reviews reducer - ', reviewsArray )

      return [
        ...payload
      ];

    case GET_ALL_USER_REVIEW_FROM_SERVER:

      return [
        ...payload
      ];


    case ADDED_REVIEWS:
      return [
        ...state,
        payload
      ];

    case ADD_NEW_REVIEW:

      const randomID = (min, max) => (Math.floor(Math.random() * (max - min)) + min);

      console.log(payload);

      var today = new Date()
      console.log(today);

      return [
        {
          // id: Math.random(),
          id: randomID(1000, 2000),
          name: 'Роман',
          comment: payload.value,
          // publicationDate: `${new Date().toShortFormat()}`,
          publicationDate: '20 мая 2019',
          approve: false,
          star: payload.starsAmount,
        },
        ...state
      ];

    case DELETE_REVIEW:
      // console.log('DELETE_REVIEW', payload);
      const newState = state.filter(word => word.id != payload);
      return [
        ...newState
      ];
    case APPROVE_REVIEW:
      // mconsole.log('APPROVE_REVIEW', payload);
      // const newState = state.filter(word => word.id != payload);

      const approveItem = state.find( i => i.id == payload )
      approveItem.status_id = 1;
      const newApproveState = state.filter(i => i.id != payload);

      console.log('APPROVE_REVIEW', approveItem);

      return [
        ...newApproveState, approveItem
      ];
    default:
      return state;
  }
}
