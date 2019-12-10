import React, {Fragment, useState, useEffect} from 'react';
import './styles.scss';
import sprite                                 from '../../../img/sprite.svg';
import {QUIZZES_POPUP}                        from '../../../_constants';
import {connect}                              from 'react-redux';
import {
    showPopup,
    hidePopup,
    setIsChangePage,
    resetCurrentUser
}                                             from '../../../_actions';
import Referrals                              from '../Referrals';
import i18next                                from 'i18next';
import PropTypes                              from "prop-types";
import {withRouter}                           from 'react-router-dom';

const UserMenu = ({
                      history,
                      user_auth,
                      isOwnPage,
                      isChangePage,
                      showPopup,
                      hidePopup,
                      setIsChangePage, resetCurrentUser
                  }) => {
    const [viewMode, setViewMode] = useState(true);


    useEffect(() => {
        setViewMode(isChangePage);
    })

    const onQuizzesClick = () => {
        // hidePopup();
        showPopup(QUIZZES_POPUP);
    };

    const changeView = () => {
        setIsChangePage(!isChangePage)
    };


    return (
        <div
            //  onMouseLeave={() => hidePopup()}
            className="UserMenu">
            <div className="UserMenu__box">
                <section className="UserMenu__section">
                    <ul>
                        <li className="UserMenu__list-item">
                            <p className="UserMenu__list-item-pointer"
                               onClick={() => {
                                   history.push(`/user/${user_auth.alias}`);
                                   hidePopup();
                               }}>
                                {i18next.t('user_menu.my_page')}</p>
                            {isOwnPage ?
                                <p className="UserMenu__icon-visible-box" onClick={changeView}>
                                    {viewMode ?
                                        <Fragment>
                                            {i18next.t('user_menu.view')}
                                            <svg className="UserMenu__icon-visible">
                                                <use xlinkHref={`${sprite}#icon-visible`}/>
                                            </svg>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            {i18next.t('user_menu.edit')}
                                            <svg className="UserMenu__icon-visible">
                                                <use xlinkHref={`${sprite}#icon-pencil`}/>
                                            </svg>
                                        </Fragment>
                                    }
                                </p>
                                :
                                <p className="UserMenu__icon-visible-box">
                                    <Fragment>
                                        {i18next.t('user_menu.edit')}
                                        <svg className="UserMenu__icon-visible">
                                            <use xlinkHref={`${sprite}#icon-pencil`}/>
                                        </svg>
                                    </Fragment>
                                </p>
                            }
                        </li>
                        <li className="UserMenu__list-item UserMenu__bigger">
                            {i18next.t('user_menu.PRO')}
                        </li>
                        {/* <li className="UserMenu__list-item">Уведомления</li>
                         <li className="UserMenu__list-item">Настройки</li> */}
                        <li className="UserMenu__list-item">
                            <p>{i18next.t('user_menu.quizzes')}</p>
                            <svg
                                onClick={onQuizzesClick}
                                className="UserMenu__icon-plus_in_circle"
                            >
                                <use xlinkHref={`${sprite}#icon-plus_in_circle`}/>
                            </svg>
                        </li>
                        <li className="UserMenu__list-item UserMenu__list-item-pointer">
                            <p>{i18next.t('user_menu.ballance')}</p>
                            <p className="UserMenu__ballance">&#36;0</p>
                        </li>
                    </ul>
                </section>
                <section className="UserMenu__section">
                    <h3 className="UserMenu__title">{i18next.t('user_menu.partners')}</h3>
                    <Referrals/>
                </section>
                {/* <section className="UserMenu__section">
                 <h3 className="UserMenu__title">Бизнес страницы</h3>
                 <ul className="UserMenu__list">
                 <li className="UserMenu__list-item">My Awesome Company</li>
                 <li className="UserMenu__list-item">My Company 2</li>
                 </ul>
                 </section> */}
                <section className="UserMenu__section">
                    <ul className="UserMenu__list">
                        <li
                            onClick={() => {
                                resetCurrentUser();
                                setIsChangePage(false);
                                hidePopup();
                            }}
                            className="UserMenu__list-item UserMenu__list-item-pointer">
                            {i18next.t('logout')}
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};


UserMenu.propTypes = {
    isChangePage:     PropTypes.bool.isRequired,
    isOwnPage:        PropTypes.bool.isRequired,
    showPopup:        PropTypes.func,
    user_auth:        PropTypes.object,
    hidePopup:        PropTypes.func,
    setIsChangePage:  PropTypes.func,
    resetCurrentUser: PropTypes.func,
};

export default connect(
    ({isChangePage, isOwnPage, auth}) => ( {isChangePage, isOwnPage, user_auth: auth.user} ),
    {showPopup, hidePopup, setIsChangePage, resetCurrentUser}
)(withRouter(UserMenu));
