import {
  ADD_GROUP_CONTACTS,
  DELETE_GROUP_CONTACTS } from "../_actions/types";

const initialState = [
  {
    id: Date.now().toString(),
    name: 'All contact',
    image: '',
    contacts: []
  },
];

export default ( state = initialState, action ) => {

  switch (action.type) {
    case ADD_GROUP_CONTACTS:{
      return [
        ...state,
        action.payload
      ];
    }
    case DELETE_GROUP_CONTACTS:{
      const { id } = action.payload;
      const idx = state.findIndex(item => item.id === id );
      console.log(idx);
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];
    }

    default: return state;
  }
}