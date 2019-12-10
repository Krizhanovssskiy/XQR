import './style.scss';
import { pick } from 'underscore';
import { SHOP, SHOPVIEW } from '../../_constants';
import React from 'react';
import { connect } from 'react-redux';
import ScrollingList from '../ScrollingList/ScrollingList';
import Shop from './Shop/Shop';
import ShopAdd from './ShopAdd';
import Modal from '../Modal';
import PopupShop from './PopupShop';
import ShopPopupView from './ShopPopupView/ShopPopupView';


const Shops = ({ shops, isChangePage, popupToShow }) => {
  const { shopsList } = shops;
  return (
    <div className="Services">
      <>
        <ScrollingList>
          {isChangePage && <ShopAdd />}
          {shopsList.map(shop => {
            const toShop = pick(shop, 'id', 'name', 'price', 'image_url');
            return <Shop key={shop.id} {...toShop} />;
          })}
        </ScrollingList>
        {popupToShow === SHOP && (
          <Modal>
            <PopupShop />
          </Modal>
        )}
        {popupToShow === SHOPVIEW && (
          <Modal>
            <ShopPopupView />
          </Modal>
        )}
      </>
    </div>
  );
};

const mapStateToProps = ({ shops, isChangePage, popupToShow }) => ({
  shops,
  isChangePage,
  popupToShow
});

export default connect(mapStateToProps)(Shops);
