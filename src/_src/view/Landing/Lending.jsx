import './style.scss';
import logoHeader from './img/xqr1.png';
import logoWelcom from './img/xqr2.png';
import sprite     from "../../../img/sprite.svg";

import React, {useEffect, useState}                         from 'react';
import {connect}                                            from 'react-redux';
import {
    hidePopup,
    showPopup
}                                                           from '../../../_actions';
import {Link, withRouter}                                   from 'react-router-dom';
import PopupMenu                                            from "./PopupMenu";
import PopupSubscription                                    from "./PopupSubscription";
import VideoPlayer                                          from './VideoPlayer';
import Modal                                                from "../../../components/Modal";
import {POPUP_MENU, POPUP_SUBSCRIPTION, POPUP_VIDEO_PLAYER} from "../../../_constants";
import {getToken}                                           from '../../../_helpers/authHeader';


const Lending = ({
                     hidePopup,
                     showPopup,
                     popupToShow,
                     history,
                     user,
                 }) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const token = getToken(user);
        if (token && token.alias) history.push(`/user/${token.alias}`);
        setVisible(true)
    }, [])

    return (
        visible &&
        <div className='Lending'>
            <div className='Lending__gradient'>
                <div
                    className='Lending__sandwich-box'
                    onClick={() => showPopup(POPUP_MENU)}
                >
                    <span className='Lending__sandwich-btn'/>
                </div>

                <header className='Lending__header'>
                    <div className="container Lending__container">
                        <div className="Lending__logo">
                            <img src={logoHeader} alt="logo" className="Lending__logo-img"/>
                        </div>

                        <div className="Lending__nav">
                            <ul className='Lending__nav-lists'>
                                <li className=''>
                                    <Link to='/register' className='Lending__nav-link'>
                                        Xqr Web-версия
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => showPopup(POPUP_SUBSCRIPTION)}
                                        to='/'
                                        className='Lending__nav-link'>
                                        Функции
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => showPopup(POPUP_SUBSCRIPTION)}
                                        to='/'
                                        className='Lending__nav-link'>
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => showPopup(POPUP_SUBSCRIPTION)}
                                        to='/'
                                        className='Lending__nav-link'>
                                        RU
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="Lending__header-btn-block">
                            <button
                                onClick={() => showPopup(POPUP_SUBSCRIPTION)}
                                className='Lending__header-btn'>
                                Для Бизнеса
                            </button>
                        </div>
                    </div>
                </header>

                <div className="Lending__content">
                    <div className="Lending__box-images"/>
                    <div className="Lending__welcom-box">
                        <img src={logoWelcom} alt="logo" className='Lending__welcom-logo-img'/>
                        <p className='Lending__welcom-text'>Сохраняй контакты</p>
                        <p className='Lending__welcom-text'>Расскажи о себе</p>
                        <p className='Lending__welcom-text'>Найди единомышленников</p>
                        <div className="Lending__welcom-btns">
                            <Link to='/register' className='Lending__btn-web'>
                               Web-версия Xqr
                            </Link>
                            <div
                                onClick={() => showPopup(POPUP_VIDEO_PLAYER)}
                                className='Lending__btn-how-work'
                            >
                  <span>
                    <svg className="Button__none-background-icon">
                      <use xlinkHref={`${sprite}#icon-play`}/>
                    </svg>
                  </span>
                                Как это работает ?
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                popupToShow === POPUP_MENU && (
                    <Modal>
                        <PopupMenu/>
                    </Modal>
                )
            }

            {
                popupToShow === POPUP_SUBSCRIPTION && (
                    <Modal>
                        <div className="Lending__padding">
                            <PopupSubscription/>
                        </div>
                    </Modal>
                )
            }

            {
                popupToShow === POPUP_VIDEO_PLAYER && (
                    <Modal>
                        <div className='Lending__padding'>
                            <VideoPlayer/>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
};

const mapStateToProps = ({popupToShow, auth}) => ( {
    popupToShow, user: auth.user
} );

export default connect(
    mapStateToProps,
    {
        hidePopup,
        showPopup
    }
)(withRouter(Lending));
