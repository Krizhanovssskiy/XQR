import React, {Component, Fragment} from 'react';

import {Route, withRouter} from 'react-router-dom';
import {connect}           from 'react-redux';
import propTypes           from "prop-types";

import {
    setCurrentUser,
    resetCurrentUser,
    setIsChangePage,
    setOwnPage
}                      from "../_actions";
import {getSingleUser} from "../_src/lib/api"
import { getToken }      from '../_helpers/authHeader';
import MainLayout      from '../_src/layouts/Main'

class PrivateRoute extends Component {
    static propTypes = {
        componentItem:        propTypes.any.isRequired,
        user:                 propTypes.object.isRequired,
        userRegistrationData: propTypes.object,
        setIsChangePage:      propTypes.func.isRequired,
        isLoggedIn:           propTypes.bool,
        setUser:              propTypes.func,
        setOwnPage:           propTypes.func
    };

    constructor(props) {
        super(props);
        this.isAlien = true;
        const {
                  user, isLoggedIn, computedMatch,
                  setIsChangePage, resetUser,
                  getSingleUser
              } = props;

        const token = getToken(user);
        const {params} = computedMatch;
        const {alias} = params;
        if (token) {
            let id = token.id;
            if (token.hasOwnProperty('user_id')) id = token.user_id;
            getSingleUser(id, token.api_token);
            if (token.alias === alias && isLoggedIn && user) {
                setIsChangePage(true);
                this.isAlien = false;
            } else {
                setIsChangePage(false);
                this.isAlien = true;
            }
        } else resetUser();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {user, isLoggedIn, computedMatch, setIsChangePage, resetUser, isChangePage} = this.props;
        const token = getToken(user);
        const {params} = computedMatch;
        const {alias} = params;
        if (( prevProps.computedMatch.params.alias !== alias ) ||
            prevProps.isLoggedIn !== isLoggedIn) {
            if (token) {
                if (token.alias === alias && isLoggedIn && user) {
                    setIsChangePage(true);
                    this.isAlien = false;
                } else {
                    setIsChangePage(false);
                    this.isAlien = true;
                }
            } else {
                setIsChangePage(false);
                this.isAlien = true;
                if (isLoggedIn) resetUser();
                this.forceUpdate();
            }
        }
    }

    renderAlienPage = () => {
        const {otherComponent: OtherComponent} = this.props;

        return (
            <Route {...this.props} render={props => ( <OtherComponent {...props} /> )}
            />
        )
    }

    renderOwnPage = () => {
        const {componentItem: ComponentItem} = this.props;

        return (
            <Route {...this.props}
                   render={props => ( <ComponentItem {...props} /> )}

            />
        )
    }

    render() {
        const {setOwnPage}=this.props;
        setOwnPage(!this.isAlien);
        return (
            <MainLayout>
                {this.isAlien ? this.renderAlienPage() : this.renderOwnPage()}
            </MainLayout>
        );
    }

}

export default connect(
    ({auth, registration}) => ( {
        userRegistrationData: registration.userRegistrationData,
        isLoggedIn:           auth.isLoggedIn,
        user:                 auth.user,
    } ),
    {
        setUser:   setCurrentUser,
        setIsChangePage,
        setOwnPage,
        resetUser: resetCurrentUser,
        getSingleUser,
    },
)(withRouter(PrivateRoute));
