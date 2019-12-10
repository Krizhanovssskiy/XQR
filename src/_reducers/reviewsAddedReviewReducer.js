import {
  REVIEW_ADDED_SUCCESSFULLY_REPORT,
  REVIEW_ADDED_REPORT_DELETE
} from '../_actions/types';


// export default (state = reviewsArray, action) => {
export default (state = false, action) => {

  const { type, payload } = action;

  switch (type) {

      case REVIEW_ADDED_SUCCESSFULLY_REPORT:

        console.log( 'REVIEW_ADDED_SUCCESSFULLY_REPORT - ', payload )

        return (
          payload.status
        );

      case REVIEW_ADDED_REPORT_DELETE:

        console.log( 'REVIEW_ADDED_REPORT_DELETE - ', payload )

        return (
          payload
        );
    default:
      return state;
  }
}
