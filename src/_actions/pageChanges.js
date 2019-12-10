import { IS_CHANGE_PAGE,IS_OWN_PAGE} from './types';

export const setIsChangePage = flag => ({ type: IS_CHANGE_PAGE, payload: flag });
export const setOwnPage = flag => ({ type: IS_OWN_PAGE, payload: flag });
