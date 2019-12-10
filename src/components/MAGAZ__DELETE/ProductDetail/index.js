import React, { useEffect } from 'react';
import {connect} from 'react-redux';
// import {formatMoney} from "../../pipes/priceFormatter";
// import {addProductToCart} from "../../actions";

import { addShopItemsActions } from '../../../_actions';


const ProductDetail = (props) => {

    /*
      const {
          title,
          price,
          images,
          description,
          id,
      } = props.product;
    */
    useEffect( () => { props.addShopItemsActions() }, [] ) // [] -  код выполняется только на этапе рендеринга компонента - То есть работает только как компонент дидмаунт

    if ( props.shopItems.length > 0 ) {
      var item = props.shopItems.find(i => i.id == props.match.params.id);
      // console.log( item );
    }

    console.log( item )

    const onCart = () => {
        // props.dispatch(addProductToCart(props.product));
    };

    return (
      <article className="card-body p-5">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h3 className="title mb-3">dddddddddd</h3>

          <p className="price-detail-wrap">
          	<span className="price h3 text-warning">
          		<span className="currency">$</span><span className="num"></span>
          	</span>
          </p>
          <dl className="item-property">
              <dt>Description</dt>
              <dd><p className="text-capitalize"></p></dd>
          </dl>

          <button
              onClick={onCart}
              className="btn btn-lg btn-outline-primary text-uppercase"><i
              className="fa fa-shopping-cart"/> { item ? item.title : '' }
          </button>
      </article>
    );
};


const mapStateToProps = ({shopItems}) => ({shopItems})  // нужно возвращать объект, функция коннект добавит в этот объект экшн и этот объект мы реструктурируем в пропсах компонента
// const mapStateToProps = state => {
//   const { shopItems } = state;
  // console.log( state );
//   return { shopItems };  // нужно возвращать объект, функция коннект добавит в этот объект экшн и этот объект мы реструктурируем в пропсах компонента
// }


export default connect( mapStateToProps, { addShopItemsActions } )(ProductDetail);
