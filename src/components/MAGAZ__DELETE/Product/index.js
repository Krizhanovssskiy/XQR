import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// import {formatMoney} from "../../pipes/priceFormatter";

import './Product.scss';
import ProductImage from "../ProductImage";

import {addProductToCart} from "../../../_actions";

// console.log(addProductToCart())


/*
  Компонент для отображение товара, выводится в цикле

  - Экшен - shopAction.js => addProductToCart(product) {...}
  - Константа - ADD_PRODUCT_TO_CART
  - Редьюсер - shopCartReducer.js

  - Стейт - cartItems ( combineReducers() )

  @ props.product - получает от компонента ProductList
  @ props.product.images - [] - массив ссылок на картинки
  @ props.dispatch() - функция Редакса для вызова Екшена
*/
const Product = (props) => {

  const {
      title,
      price,
      images,
      description,
      id,
  } = props.product;

console.log(props);
  return (

    <div
      key={id}
      className="ScrollHorizont__img-box"
    >

      <div className="ScrollHorizont__product">

        <ProductImage product={props.product} />

        <div className="card-body product__text">
          <h4 className="card-title product__title">
              <Link to={`/products/${id}`}>{title}</Link>
          </h4>
          <h5 className="product__price">$11</h5>
          {/* <p className="card-text product__description">{description}</p> */}
          <button
              onClick={() => {
                  props.dispatch(addProductToCart({...props.product}))
              }}
              className="btn btn-info product__add-to-cart">Add to cart
          </button>
        </div>
      </div>

    </div>
  );
};

export default connect()(Product);



/*
<button
    onClick={() => {
        props.dispatch(addProductToCart({...props.product}))
    }}
    className="btn btn-info product__add-to-cart">Add to cart
</button>
*/
