import './style.scss';
import sprite from '../../../img/sprite.svg';
import { connect } from 'react-redux';
import React, { useState } from "react";
import Reviews from '../../Reviews';

import { addReviewAction } from '../../../_actions';
// import { deleteAdedReviewReportAction} from '../../../_actions';

import { getUserInfo } from '../../../_src/lib/api';

const Star = ({ selected = false, onClick = f => f }) => (
  <svg onClick={onClick} className="AddedReviews__icon">
    <use xlinkHref={`${sprite}${selected ? "#icon-star-review-filled" : "#icon-star-review"}`} />
  </svg>
);


const StarRating = ({ totalStars, starsAmountChange }) => {
  const [starsSelected, selectStar] = useState(0);

  // const changeArray = (n) => () => selectStar(n)

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => { selectStar(i + 1); starsAmountChange(i + 1); } }
          // onClick={changeArray(i + 1)}
        />
      ))}
    </div>
  );
};




class AddedReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', starsAmount: 0, isReviewAdd: false};
  }

  componentDidMount() {
    //this.props.getUserInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(this.state.isReviewAdd) {
      setTimeout(
        () => {
          this.setState((state, props) => ({
            isReviewAdd: false
          }));
          // this.props.deleteAdedReviewReportAction()
        },
        1500
      );
    }

  }


  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  starsAmountChange = (number) => {

    // console.log(number);
    this.setState({starsAmount: number});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const location = this.props.location.pathname.split('/');
    const alianAlias = location[location.length-1]

    console.log(
      alianAlias
    )

    let response = this.props.addReviewAction(
      this.state,
      this.props.user.alias,
      this.props.user.api_token,
      alianAlias
    )

    response.then( (value) => {
      this.setState((state, props) => ({
        isReviewAdd: value.status
      }));
    })

    this.setState((state, props) => ({
      value: '',
      starsAmount: 0
    }));
  }

  addReviewAdedSuccesView = () => {
     return (
        <p>Отзыв добавлен успешно и находиться на рассмотрении!</p>
     );
  }

  addReviewView = () => {
    return (
      <React.Fragment>
        <h3 className="AddedReviews__title">Отзывы</h3>

        <Reviews clazz="AddedReviews__Reviews-list" isAlien={true} location={this.props.location} />

        <form onSubmit={this.handleSubmit}>
            <textarea
              value={this.state.value}
              onChange={this.handleChange}
              className="AddedReviews__textarea"
              placeholder="Напишите отзыв"
            />

            <div className="AddedReviews__star-box">
              <StarRating totalStars={5} starsAmountChange={this.starsAmountChange} />
            </div>

            <button className="CreateWebPage__btn">
              Добавить отзыв
            </button>
        </form>
      </React.Fragment>
    );
  }

  switchReviewStatus = () => {
    const isReviewAdd = this.state.isReviewAdd;

    switch (isReviewAdd) {

        case 201:

          return ( this.addReviewAdedSuccesView() );

        default:
          return ( this.addReviewView() );
    }
  }

  render() {

    return (
      <section className="AddedReviews section-main">

          {
            //this.switchReviewStatus()
          }

          <h2 style={{color: 'var(--color-primary)'}}>Скоро здесь появятся ваши отзывы</h2>

      </section>
    );
  }
}

export default connect(
  (state) => ({
    reviewsArray: state.reviews,
    isReviewAdd: state.isReviewAdd,
    first_name: state.profile.first_name
  }), { addReviewAction, getUserInfo }
)(AddedReviews);





/*
const AddedReviews = ( {addReviewAction} ) => {

  // console.log( addReviewAction )

  const addReview = () => {

    addReviewAction('some reviw data')
  }

  return (
    <section className="AddedReviews section-main">
      <h3 className="AddedReviews__title">Отзывы</h3>

      <Reviews clazz="AddedReviews__Reviews-list" isAlien={true} />

      <textarea className="AddedReviews__textarea" placeholder="Напишите отзыв" />

      <div className="AddedReviews__star-box">
        <svg className="AddedReviews__icon">
          <use xlinkHref={`${sprite}#icon-star-review-filled`} />
        </svg>
        <svg className="AddedReviews__icon">
          <use xlinkHref={`${sprite}#icon-star-review-filled`} />
        </svg>
        <svg className="AddedReviews__icon">
          <use xlinkHref={`${sprite}#icon-star-review`} />
        </svg>
        <svg className="AddedReviews__icon">
          <use xlinkHref={`${sprite}#icon-star-review`} />
        </svg>
        <svg className="AddedReviews__icon">
          <use xlinkHref={`${sprite}#icon-star-review`} />
        </svg>
      </div>

      <div onClick={addReview} className="AddedReviews__btn">Оставить отзыв</div>
    </section>
  );
};
*/
