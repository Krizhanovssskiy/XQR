import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from "prop-types";
import _ from 'underscore';


class RegisterRoute extends Component {
    pathName = "/register";
    static propTypes = {
        componentItem: propTypes.any,
        userRegistrationData: propTypes.object,
        isRegister: propTypes.bool,
        setUser: propTypes.func
    };

    render() {
        const { componentItem: ComponentItem, isRegister, userRegistrationData } = this.props;
        return (
            <Route {...this.props}
                render={props => {
                    if (isRegister && !_.isEmpty(userRegistrationData)) return <ComponentItem {...props} />
                    return <Redirect to={{ pathname: this.pathName, state: { from: this.props.location } }} />
                }}
            />
        );
    }
}


export default connect(
    ({registration}) => ({
        isRegister: registration.isRegister,
        userRegistrationData: registration.userRegistrationData })
)(withRouter(RegisterRoute));
