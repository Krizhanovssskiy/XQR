import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../Product";
import { addShopItemsActions } from '../../../_actions';
import { PlusCircle } from '../../Buttons';
/*
  - Данные - shopItemHelper
  - Экшен - shopAction.js => addShopItemsActions() {...}
  - Константа - ADD_ITEMS_ON_SHOP
  - Редьюсер - shopItemsReducer.js

  - Стейт - shopItems ( combineReducers() )

  @ this.props.shopItems ( из mapStateToProps )
  @ this.props.addShopItemsActions ( передается в connect() вторым параметром )
*/
class ProductList extends Component {

    componentDidMount() {
        this.props.addShopItemsActions();
        // this.props.dispatch( addShopItemsActions() )
    }

    render() {
        console.log(this.props);
        const { shopItems } = this.props;

        return (
          <div className="products" style={{display: 'flex'}}>
            { shopItems.map( p => <Product key={p.id} product={p} /> ) }
            <div
              key='PlusCircle'
              className="ScrollHorizont__img-box ScrollHorizont__added"
            >
              <PlusCircle onClick={() => addShopItemsActions()}  />
            </div>
          </div>



        );
    }
}

const mapStateToProps = ({shopItems}) => ({shopItems});

export default connect(
  mapStateToProps,
  {
    addShopItemsActions
  })(ProductList);
// export default connect(mapStateToProps, null)(ProductList);
