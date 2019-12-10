import React, {Component, Fragment} from 'react';
import sprite                       from '../../../img/sprite.svg';
import {Link, withRouter}           from 'react-router-dom';
import {connect}                    from 'react-redux';
import {showPopup, hidePopup}       from '../../../_actions';
import {USER_MENU}                  from '../../../_constants';
import propTypes                    from 'prop-types';
import {is_mobile}                  from '../../../_src/lib/helpers';
import i18next                      from 'i18next';

import UserMenu from '../UserMenu';
import Dropdown from '../../Dropdown';
import Backdrop from '../../Dropdown/Backdrop';

class UserLoginProfile extends Component {

    static propTypes = {
        user:         propTypes.object.isRequired,
        user_id:      propTypes.number,
        isLoggedIn:   propTypes.bool,
        isChangePage: propTypes.bool.isRequired
    };

    deferredPrompt = null;

    componentDidMount() {
        let component = this;
        window.addEventListener('beforeinstallprompt', e => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            component.deferredPrompt = e;
            // Update UI notify the user they can add to home screen
            console.log('Install Prompt fired');
        });
    }

    addToHomeScreen = () => {
        if (this.deferredPrompt) {
            // Show the prompt
            this.deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                this.deferredPrompt = null;
            });
        } else {
            console.log('Invalid prompt object');
        }
    };

    renderLogin() {
        const {clazz, isLoggedIn, user_id, user, activeUser} = this.props;
        let avatar = "";
        if (activeUser && activeUser.user_profiles && activeUser.user_profiles.length > 0) {
            const [first_elements] = activeUser.user_profiles;
            const [profile_image] = first_elements.profile_images;
            if(profile_image) avatar = profile_image.image_url;
        }
        if (isLoggedIn && user && user.alias) {
            return (
                <Fragment>
                    {
                        avatar ? <img className={`${clazz}__icon-block Header__avatar`} src={avatar}/>
                            :
                            <span className={`${clazz}__icon-block`}>
                                <svg className={`${clazz}__icon-user`}>
                                  <use xlinkHref={`${sprite}#icon-user`}/>
                                </svg>
                            </span>
                    }
                    <span className={`${clazz}__icon-label`}>
                        {user.alias || `id: ${user_id}`}
                      </span>
                </Fragment>
            );
        } else {
            return (
                <Link to="/login" className={`${clazz}__login`}>
                    {i18next.t('login')}
                </Link>
            );
        }
    }

    onUserClick = popupToShow => {
        const {hideUserMenu, showUserMenu} = this.props;
        if (popupToShow === USER_MENU) {
            hideUserMenu();
        } else {
            showUserMenu(USER_MENU);
        }
    };

    render() {
        const {clazz, isLoggedIn, popupToShow} = this.props;
        const action = is_mobile() ? 'onClick' : 'onClick'; // TODO Fix this
        const handlers = {
            [action]: isLoggedIn ? () => this.onUserClick(popupToShow) : null
        };
        return (
            <div
                {...handlers}
                className={
                    isLoggedIn
                        ? `${clazz}__item-box ${clazz}__user-setting`
                        : `${clazz}__item-box`
                }>
                <div className={
                        isLoggedIn
                            ? `${clazz}__icon-box ${clazz}__icon-box--left  ${clazz}__icon-box-render-login`
                            : `${clazz}__icon-box ${clazz}__icon-box--left`
                    }>
                    {this.renderLogin()}
                </div>
                <Backdrop show={popupToShow === USER_MENU}/>
                <Dropdown show={popupToShow === USER_MENU} classPostfix={USER_MENU}>
                    <UserMenu/>
                </Dropdown>
            </div>
        );
    }
}

const mapStateToProps = ({auth, profile, isChangePage, popupToShow, activeUser}) => ( {
    user_profile: profile,
    activeUser,
    isChangePage,
    user:         auth.user,
    isLoggedIn:   auth.isLoggedIn,
    user_id:      auth.user.id,
    popupToShow
} );

export default connect(
    mapStateToProps,
    {
        showUserMenu: showPopup,
        hideUserMenu: hidePopup
    }
)(withRouter(UserLoginProfile));
