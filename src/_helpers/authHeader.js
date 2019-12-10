import {compose} from 'redux';
import {has}     from 'underscore';
import moment    from 'moment';

export const getApiTokenFromLocalStorage = () => {
}

export const getDataFromLocalStorage = key => {
    return localStorage.getItem(key);
}

export const setDataFromLocalStorage = (key, data) => {
    return localStorage.setItem(key, data);
}


export const getToken = obj => compose(currentToken, getDecodeToken)(obj);

export const clearLocalStorage = () => localStorage.clear();


export const getDecodeToken = token => {
    if (token) return token;
    return null;
};


const currentToken = (object, time = Date.now() / 1000) => {
    if (( object && has(object, 'exp') ) && ( Number(object.exp) > time )) return object;
    return null;
};


export const parseCode = code => {
    let obj = {}
    obj.code = code;
    switch (code) {
        case 1:
            //"New confirmation code was sent to email or by sms\r\n
            obj.message = 'Логин существует';
            break;
        case 2:
            //"New confirmation code was sent to email or by sms\r\n
            obj.message = 'Новый код подтверждения отправлен на почту или телефон';
            break;
        case 3:
            //Confirmation code expired, user can NOT confirm account by using it\r\n"
            obj.message = 'Код подтверждения истек';
            break;
        case 4:
            //Confirmation code still active, user can confirm account by using it
            obj.message = 'Код подтверждения активен, подтвердите аккаунт';
            break;
        case 5:
            //"Registration attempts limit has reached, user can NOT get new confirmation code by email or sms\r\n
            obj.message = 'Превышено количество попыток регистрации,обратитесь в техническую поддержку';
            break;
        case 6:
            //User have registration attempts, user can get new confirmation code\r\n
            obj.message = 'Запросите новый код подтверждения';
            break;
        case 7:
            //Invalid confirmation code\n
            obj.message = 'Неверный код подтверждения';
            break;
        case 8:
            //Account confirmation successful
            obj.message = 'Аккаунт успешно подтверджен';
            break;
        case 10:
            //"Account already confirmed"
            obj.message = 'Аккаунт уже подтверджен';
            break;
        case 11:
            //"Account exist"
            obj.message = 'Аккаунт не существует';
            break;
        case 12:
            //"Account exist"
            obj.message = 'Пароль изменен';
            break;
        default:
    }
    return obj;
}
