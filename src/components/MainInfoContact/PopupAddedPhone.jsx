import React                 from 'react';
import PropTypes             from 'prop-types';
import {informContactsArray} from "../../_helpers/informContactsArray";
import i18next               from 'i18next';

const PopupAddedPhone = ({typeInput, placeholder, valueInput, valueSelect, onChangeSelect, onChangeInput, onReset, onSubmitData}) => {
    return (
        <div className="MainInfoContact__popup-box">
            <form
                onSubmit={onSubmitData}
                className="MainInfoContact__popup-form">
                <div className='MainInfoContact__popup-top-box'>
                    <select
                        //value={valueSelect}
                        onChange={onChangeSelect}
                        className='MainInfoContact__popup-select'>
                        {
                            informContactsArray.map((item, key) => (
                                    <option
                                        key={key}
                                        value={++key}
                                        className='SocialNetwork__option'>
                                        {item}
                                    </option>
                                )
                            )
                        }
                    </select>
                    <div className="MainInfoContact__btns-block">
                        <button
                            onClick={onReset}
                            className="MainInfoContact__popup-btn"
                        >
                            {i18next.t("cancel_btn")}
                        </button>
                        <button
                            onClick={onSubmitData}
                            className="MainInfoContact__popup-btn"
                        >
                            {i18next.t("save_btn")}
                        </button>
                    </div>
                </div>
                <input placeholder={placeholder}
                       onChange={(e) => onChangeInput(e)}
                       value={valueInput}
                       type={typeInput}
                       className="MainInfoContact__popup-input"
                />
            </form>
        </div>
    )
};

PopupAddedPhone.PropTyps = {
    typeInput:      PropTypes.string,
    valueInput:     PropTypes.string,
    placeholder:    PropTypes.any,
    valueSelect:    PropTypes.string,
    onChangeSelect: PropTypes.func,
    onChangeInput:  PropTypes.func,
    onReset:        PropTypes.func,
    onSubmitData:   PropTypes.func
};

export default PopupAddedPhone;
