import {useState, useEffect} from 'react';


export const useAuthBtnHooks = ({auth, registration, location, initialFunc, authInSocial}) => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/register' || pathname === '/register/') {
            setFlag(true);
        }
        initialFunc()
    }, [location.pathname,initialFunc]);

    const onSignIn = () => {
        authInSocial((userId,network_id) => {
            let object = {
                id:         userId,
                network_id: network_id,
                method_id:  3,
            };
            if (flag) {
                const search = location.search;
                const params = new URLSearchParams(search);
                object.referrer_alias = params.get('referrer_alias');
                registration(object);
            } else auth(object);
        });
    };

    return {onSignIn}
}

