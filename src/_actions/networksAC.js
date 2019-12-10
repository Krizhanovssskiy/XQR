import { POPULATE_NETWORKS } from './types';
import xcard from "../_apis/xcard";
import {alertError, alertSuccess} from "./alert";


export const getNetworks = () => async dispatch => {
  try {
    const {data, status} = await xcard.get(
      `/networks`
    );
    if (data && (status === 200 || status === '200')) {
      dispatch({type: POPULATE_NETWORKS, payload: data});
      dispatch(alertSuccess('contacts received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};
