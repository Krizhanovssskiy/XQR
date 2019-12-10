import {
  POPULATE_SHOP,
  CREATE_SHOP,
  UPDATE_SHOP,
  DELETE_SHOP,
  SET_CURRENT_SHOP,
  RESET_CURRENT_SHOP
} from '../_actions/types';

const INITIAL_STATE = {
  shopsList: [],
  currentShop: {
    name: '',
    price: '',
    description: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_SHOP:
      return {
        ...state,
        shopsList: action.payload
      };

    case CREATE_SHOP:
      return {
        ...state,
        shopsList: [action.payload, ...state.shopsList]
      };

    case UPDATE_SHOP:
      const updatedShopList = [...state.shopsList];
      const updatedIdx = updatedShopList.findIndex(
        shop => shop.id === action.payload.id
      );
      updatedShopList[updatedIdx] = action.payload;
      return {
        ...state,
        shopsList: updatedShopList
      };

    case DELETE_SHOP:
      const deletedShopList = state.shopsList.filter(
        shop => shop.id !== action.payload.product_id
      );
      return {
        ...state,
        shopsList: deletedShopList
      };

    case SET_CURRENT_SHOP:
      return {
        ...state,
        currentShop: {
          ...state.shopsList.find(
            service => service.id === action.payload.id
          )
        }
      };

    case RESET_CURRENT_SHOP:
      return {
        ...state,
        currentShop: INITIAL_STATE.currentShop
      };

    default:
      return state;
  }
};
