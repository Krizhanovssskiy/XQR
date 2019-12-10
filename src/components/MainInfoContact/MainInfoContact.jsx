import './style.scss';

import React, {Component, Fragment} from 'react';
import {connect}                    from 'react-redux';
import {PlusBtn}                    from '../Buttons';
import {
    hidePopup,
    showPopup,
    getContacts,
    updateContact,
    createContact,
    deleteContact,
    updateInfoUserContactAction
}                                   from '../../_actions';
import {
    OPEN_POPUP_WEBSITE,
    OPEN_POPUP_PHONE,
    OPEN_POPUP_EMAIL
}                                   from '../../_constants';
import UserContacts                 from './UserContacts';
import AwesomeDebouncePromise       from 'awesome-debounce-promise';
import PopupAddedPhone              from './PopupAddedPhone';
import PopUpAddedContacts           from './PopUpAddedContacts';
import {editUserData, setUserInfo}  from '../../_src/lib/api';
import {alertClear}                 from '../../_actions';
import {createLink}                 from '../../_src/lib/helpers';
import MySmartSite                  from './MySmartSite';
import i18next                      from 'i18next';
import validator                    from 'validator';

class MainInfoContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactId:   null,
            myWebsite:   '',
            valueInput:  '',
            valueSelect: '',
            togglePhone: false,
            toggleEmail: false
        };
        this.clearAlert = () => {
            props.alertClear();
        };
        this.queryApi = ({contact_value, id, api_token, alias}) => {
            props.updateContact({
                api_token,
                alias,
                contact_id: id,
                contact_value
            });
        };
        this.ClearDebounced = AwesomeDebouncePromise(this.clearAlert, 3000);
        this.queryApiDebounced = AwesomeDebouncePromise(this.queryApi, 2000);
    }

    onTogglePhone = () => {
        this.setState(state => ( {
            togglePhone: !state.togglePhone,
            toggleEmail: false
        } ));
    };
    onToggleEmail = () => {
        this.setState(state => ( {
            togglePhone: false,
            toggleEmail: !state.toggleEmail
        } ));
    };
    onChangeContact = async (e, item) => {
        const {
                  updateInfoUserContactAction,
                  user,
                  user_profile: {alias}
              } = this.props;
        const {api_token} = user;

        const obj = {
            alias,
            ...item,
            contact_value:
                item.method_id === 2 ? '+' + Number(e.target.value) : e.target.value,
            api_token
        };
        updateInfoUserContactAction(obj);
        this.queryApiDebounced(obj);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps && this.props) {
            const {user_profile: {alias}, getContacts} = this.props;
            if (prevProps.user_profile.alias !== alias) getContacts(alias);
        }
    }

    componentDidMount() {
        const {myWebsite} = this.state;
        const {user_profile} = this.props;
        if (!myWebsite && user_profile && user_profile.site !== myWebsite) {
            this.setState({myWebsite: user_profile.site})
        }
    }

    onDeleteContact = contactId => {
        this.props.deleteContact({contact_id: contactId});
        this.setState({
            valueInput: '',
            contactId:  null
        });
        this.props.hidePopup();
    };
    onClickContact = (contact, popupToShow) => {
        this.setState({
            contactId:   contact.id,
            valueInput:  contact.contact_value,
            togglePhone: false,
            toggleEmail: false
        });
        this.props.showPopup(popupToShow);
    };

    onChangeValue = name => e => {
        this.setState({
            [name]: e.target.value
        });
    };
    onSubmitData = name => async e => {
        e.preventDefault();
        const {
                  user_profile,
                  user,
                  setUserInfo,
                  updateContact,
                  createContact
              } = this.props;
        const {valueSelect, valueInput, myWebsite, contactId} = this.state;
        const {api_token} = user;
        const {alias, id} = user_profile;
        if (api_token) {
            if (user_profile.hasOwnProperty(name)) {
                let field = {[name]: myWebsite};
                await setUserInfo(
                    {
                        api_token,
                        alias,
                        profile_id: id
                    },
                    field
                );
            } else {
                if (valueInput && ( name === 'phone' || name === 'email' )) {

                    let method_id = '';
                    let contact_value = '';
                    if (name === 'phone') {

                        const isValidPhone = validator.isMobilePhone(valueInput);
                        if (!isValidPhone) {
                            alert('Неккоректный формат');
                            return;
                        }
                        method_id = 2;
                        contact_value = valueInput[0] === "+" ? valueInput : `+${valueInput}`;
                    } else {
                        method_id = 1;
                        contact_value = valueInput;
                    }
                    if (contactId) {
                        await updateContact({
                            api_token,
                            alias,
                            contact_id:    contactId,
                            contact_value: valueInput
                        });
                    } else {
                        await createContact({
                            api_token,
                            alias,
                            profile_id: id,
                            contact_value,
                            method_id,
                            type_id:    valueSelect || 1
                        });
                    }
                }
            }
            this.setState({
                valueInput:  '',
                valueSelect: '',
                // myWebsite:   ''
            });
            this.ClearDebounced();
            this.props.hidePopup();
        }

    };
    onChangeInput = e => {
        this.setState({
            valueInput: e.target.value
        });
    };
    onChangeSelect = e => {
        this.setState({
            valueSelect: e.target.value
        });
    };
    onReset = () => {
        this.setState({
            valueInput:  '',
            valueSelect: '',
            contactId:   null
        });
        this.props.hidePopup();
    };

    openPopUpMyWebsite = () => {
        this.setState({
            togglePhone: false,
            toggleEmail: false,
            // myWebsite:   ''
        });
        this.props.showPopup(OPEN_POPUP_WEBSITE);
    };
    openPopUpPhone = () => {
        this.setState({
            togglePhone: false,
            toggleEmail: false
        });
        this.props.showPopup(OPEN_POPUP_PHONE);
    };
    openPopUpEmail = () => {
        this.setState({
            togglePhone: false,
            toggleEmail: false
        });
        this.props.showPopup(OPEN_POPUP_EMAIL);
    };

    findPopUpPhone = () => {
        const {userPhones} = this.props;
        const {contactId, valueInput, valueSelect} = this.state;
        const res = userPhones.findIndex(item => item.id === contactId);
        if (res === -1 || res === '-1') {
            return (
                <PopupAddedPhone
                    typeInput="text"
                    valueInput={valueInput}
                    valueSelect={valueSelect}
                    onChangeSelect={this.onChangeSelect}
                    onChangeInput={this.onChangeInput}
                    onReset={this.onReset}
                    onSubmitData={this.onSubmitData('phone')}
                />
            );
        } else {
            return (
                <PopUpAddedContacts
                    contactId={contactId}
                    valueInput={valueInput}
                    onSubmitData={this.onSubmitData('phone')}
                    onChangeInput={this.onChangeInput}
                    onReset={this.onReset}
                    onDeleteContact={this.onDeleteContact}
                />
            );
        }
    };

    render() {
        const {
                  contactId,
                  myWebsite,
                  togglePhone,
                  toggleEmail,
                  valueInput
              } = this.state;
        const {
                  popupToShow,
                  userPhones,
                  userEmails,
                  user_profile,
                  isChangePage
              } = this.props;

        const webSite = user_profile.site || '';

        return (
            <div className="MainInfoContact__contact-container">
                <div className="MainInfoContact__contact-box">
                    <MySmartSite/>
                </div>
                <div className="MainInfoContact__contact-box">
                    <p className="MainInfoContact__contact">{i18next.t('mainInfo.site')}</p>
                    {isChangePage ? (
                        <Fragment>
                            {webSite ? (
                                <p onClick={this.openPopUpMyWebsite}
                                   className="MainInfoContact__contact">
                                    {webSite}
                                </p>
                            ) : (
                                <PlusBtn
                                    onClick={this.openPopUpMyWebsite}
                                    className="MainInfoContact__contact-btn-plus"
                                />
                            )}
                        </Fragment>
                    ) : (
                        <a href={createLink('site', webSite)}
                           target="_blank"
                           className="MainInfoContact__contact--link">
                            {webSite}
                        </a>
                    )}
                    {popupToShow === OPEN_POPUP_WEBSITE && (
                        <PopUpAddedContacts
                            valueInput={myWebsite}
                            onSubmitData={this.onSubmitData('site')}
                            onChangeInput={this.onChangeValue('myWebsite')}
                            onReset={this.onReset}
                        />
                    )}
                </div>
                <div className="MainInfoContact__contact-box">
                    <p className="MainInfoContact__contact">{i18next.t('mainInfo.phone')}</p>
                    <UserContacts
                        popupToShow={OPEN_POPUP_PHONE}
                        isChangePage={isChangePage}
                        userContacts={userPhones}
                        toggleContacts={togglePhone}
                        onChangeContact={this.onChangeContact}
                        openPopUpAddContact={this.openPopUpPhone}
                        onToggleContacts={this.onTogglePhone}
                        onClickContact={this.onClickContact}
                    />

                    {isChangePage &&
                    popupToShow === OPEN_POPUP_PHONE &&
                    this.findPopUpPhone()}
                </div>
                <div className="MainInfoContact__contact-box">
                    <p className="MainInfoContact__contact">
                        {i18next.t('mainInfo.email')}</p>
                    <UserContacts
                        popupToShow={OPEN_POPUP_EMAIL}
                        isChangePage={isChangePage}
                        userContacts={userEmails}
                        toggleContacts={toggleEmail}
                        onChangeContact={this.onChangeContact}
                        openPopUpAddContact={this.openPopUpEmail}
                        onToggleContacts={this.onToggleEmail}
                        onClickContact={this.onClickContact}
                    />
                    {isChangePage
                        ? popupToShow === OPEN_POPUP_EMAIL && (
                        <PopUpAddedContacts
                            contactId={contactId}
                            valueInput={valueInput}
                            onSubmitData={this.onSubmitData('email')}
                            onChangeInput={this.onChangeInput}
                            onReset={this.onReset}
                            onDeleteContact={this.onDeleteContact}
                        />
                    )
                        : null}
                </div>
            </div>
        );
    }
}

export default connect(
    ({profile, popupToShow, auth, infoContacts, isChangePage}) => ( {
        userPhones:   infoContacts.phoneNumbers,
        userEmails:   infoContacts.emails,
        popupToShow,
        infoContacts,
        user_profile: profile,
        user:         auth.user,
        isChangePage
    } ),
    {
        alertClear,
        hidePopup,
        showPopup,
        getContacts,
        editUserData,
        updateContact,
        deleteContact,
        updateInfoUserContactAction,
        setUserInfo,
        createContact
    }
)(MainInfoContact);
