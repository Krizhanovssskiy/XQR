import './style.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import _ from 'underscore';
import i18next from "i18next";

const sendData = async (object, field, setUserInfo, alertClear) => {
  await setUserInfo(object, field);
  alertClear();
};
const offEdit = setIsEdit => setIsEdit(false);
const offEditDebounced = _.debounce(offEdit, 5000);
const sendDataApiDebounced = AwesomeDebouncePromise(sendData, 3000);

const AboutMe = ({
  isChangePage,
  userProfile,
  user,
  setUserInfo,
  alertClear
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const textInputRef = React.createRef();
  let { alias, id } = userProfile;
  let { api_token } = user;

  useEffect(() => {
    if (isEdit && textInputRef.current) textInputRef.current.focus();
    if (userProfile.description !== textAreaValue && !textAreaValue) setTextAreaValue(userProfile.description);
  }, [isEdit, userProfile.description, textAreaValue, textInputRef]);

  const onEditClick = () => setIsEdit(true);
  const onFieldTextChange = (name, e) => {
    const value = e.target.value;

    if (value || value.length === 0) {
      setTextAreaValue(value);
      let field = { [name]: value };
      sendDataApiDebounced.apply(this, [
        { api_token, alias, profile_id: id },
        field,
        setUserInfo,
        alertClear
      ]);
    }
    offEditDebounced.call(this, setIsEdit);
  };

  const _renderWithoutEdit = () => (
    <div className="AboutMe__box-title">
      <h3 className="AboutMe__title">{i18next.t('main_about_me.about_me')}</h3>
      <p className={'AboutMe__text' + (!textAreaValue ? ' AboutMe__text--disabled' : '')}>
        {textAreaValue || i18next.t('main_about_me.inform_absent')}
      </p>
    </div>
  );

  return isChangePage ? (
    <div className="AboutMe__box-title" onClick={onEditClick}>
      <h3 className="AboutMe__title">{i18next.t('main_about_me.about_me')}</h3>
      {isEdit ? (
        <textarea
          ref={textInputRef}
          className="AboutMe__text AboutMe__textarea"
          onChange={e => onFieldTextChange('description', e)}
          value={textAreaValue || ''}
        />
      ) : (
        <p
          className={
            'AboutMe__text' + (!textAreaValue ? ' AboutMe__text--disabled' : '')
          }
        >
          {textAreaValue || i18next.t('main_about_me.process_filling')}
        </p>
      )}
    </div>
  ) : (
    _renderWithoutEdit()
  );
};

AboutMe.propTypes = {
  isChangePage: PropTypes.bool,
  userProfile: PropTypes.object,
  editUserData: PropTypes.func,
  user: PropTypes.object,
  setUserInfo: PropTypes.func.isRequired,
  alertClear: PropTypes.func
};

export default AboutMe;
