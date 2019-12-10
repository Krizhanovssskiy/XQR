import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import {Reset} from "../Buttons";
import {addProductToCart} from "../../_actions";

const ProductPopUp = (props) => {
  const { onClouseProductPopUp } = props;
  const { id, images, name, price, description } = props.selectedObject;
  return (
    <div className='ProductPopUp' key={id}>
      <div className='ProductPopUp__container'>
        <div className="ProductPopUp__img-block">
          <img
            className='ProductPopUp__img'
            src={images}
            alt={name}
          />
        </div>
        <div className='ProductPopUp__info-product-box'>
          <Reset
            onClick={onClouseProductPopUp}
            className='ProductPopUp__form-btn-reset'
          />
          <p className='ProductPopUp__name'>{name}</p>

          <p className='ProductPopUp__price'>$ {price}</p>

          <button
            className='ProductPopUp__btn-added'
            onClick={() => {
              props.dispatch(addProductToCart({...props.product}))
            }}
          >
            Add to card
          </button>

          <p className='ProductPopUp__description'>{description}</p>
        </div>





      </div>
    </div>
  )
};

export default connect()(ProductPopUp);