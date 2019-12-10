import {
  isEmail,
  isMobilePhone,
  isAlphanumeric,
  isLength,
  isCurrency
} from 'validator';

export const validateLogin = login => {
  if (login.length === 0) return null;
  if (isEmail(login)) return 'email';
  else if (isMobilePhone(login)) return 'phone';
};

export const validatePassword = password => {
  if (password.length === 0) return null;
  if (!isAlphanumeric(password)) return 'symbols';
  if (!isLength(password, { min: 4, max: 20 })) return 'length';
  return true;
};

export const validatePrice = price => {
  console.log(price);
  console.log(isCurrency(price, {allow_negatives: false}));
  return isCurrency(price, {allow_negatives: false});
};
