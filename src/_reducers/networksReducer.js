import { POPULATE_NETWORKS } from '../_actions/types';

export default ( state = [], action) => {
  const { type, payload } = action;
  switch (type) {

    case POPULATE_NETWORKS:
      return [ ...payload ];

    default: return state;
  }
}
