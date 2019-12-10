import { REGISTRATION,REGISTRATION_CLEAR, GET_ALIAS, CONFIRM_REGISTRATION , CLEAR_REG} from '../_actions/types';

const INITIAL_STATE = {
  isRegister: null,
  userRegistrationData: null,
  alias: null,
  confirmReg: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTRATION:
      return { ...state, isRegister: true, userRegistrationData: action.payload };
      case REGISTRATION_CLEAR:
          return {};
      case GET_ALIAS:
          return { ...state, alias: action.payload };
    case CLEAR_REG:
      return { ...state, isRegister: null,userRegistrationData:{}};
    case CONFIRM_REGISTRATION:
      return { ...state, confirmReg: true };
    default:
      return state;
  }
};
