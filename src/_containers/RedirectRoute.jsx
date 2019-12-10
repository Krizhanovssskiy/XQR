import React, {Component}            from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect}                     from 'react-redux';
import {bindActionCreators}          from 'redux';
import propTypes                     from "prop-types";
import {getToken}                    from '../_helpers/authHeader';
import {setCurrentUser}              from "../_actions";
import {parseHost}                   from '../_src/lib/helpers'

class RedirectRoute extends Component {
    constructor(props) {
        super(props);
        this.pathname = "/login";
        const token = getToken(props.user);
        if (token && token.alias) {
            props.setUser(token);
            this.pathname = `/user/${token.alias}`;
        }
    }

    static propTypes = {
        componentItem:        propTypes.any,
        userRegistrationData: propTypes.object,
        isRegister:           propTypes.bool,
        setUser:              propTypes.func
    };


    render() {
        const {location} = this.props;
        const {pathname} = this;
        const object_host=parseHost();
        return (
            !object_host && <Redirect to={{ pathname, state: { from: location } }} />
        );
    }
};

export default connect(
    ({auth}) => ( {isLoggedIn: auth.isLoggedIn, user: auth.user} ),
    dispatch => ( {setUser: bindActionCreators(setCurrentUser, dispatch)} )
)(withRouter(RedirectRoute));
