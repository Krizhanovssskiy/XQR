import {
  ADDED_PHONE_USER,
  ADDED_EMAIL_USER,
  CHANGE_PHONE_USER } from '../_actions/types';

export const addedPhoneUser = (phone) => {
  return {
    type: ADDED_PHONE_USER,
    payload: phone
  }
};

export const addedEmailUser = (email) => {
  return {
    type: ADDED_EMAIL_USER,
    payload: email
  }
};

export const changePhoneUser = (phone) => {
  return {
    type: CHANGE_PHONE_USER,
    payload: phone
  }
};