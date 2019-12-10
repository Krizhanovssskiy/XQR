import './style.scss';

import training1 from '../../img/gif/training-1.gif';
import training2 from '../../img/gif/training-2.gif';
import training3 from '../../img/gif/training-3.gif';

import React, {useEffect, useState} from 'react';
import {withRouter}                 from 'react-router-dom';
import {connect}                    from "react-redux";
import sprite                       from "../../img/sprite.svg";
import ItemSlider                   from "./ItemSlider";
import {hidePopup, showPopup}       from '../../_actions';

import Modal            from "../Modal/Modal";
import {TRAINING_POPUP} from "../../_constants";
import {useSwipeable}   from "react-swipeable";
import PropTypes        from "prop-types";

const gifSlider = [
    {
        imgUrl:     training1,
        headerText: 'Добавляйте социальные сети',
        text:       'На своей странице нажмите\n' +
                        '        "+" и добавьте свои социльные сети'
    },
    {
        imgUrl:     training2,
        headerText: 'Добавляйте коллег в записную книгу Xqr, потому что это эффективно',
        text:       'На странице нужного человека нажмите\n' +
                        '        "добавить". Визитка человека добавится\n' +
                        '        в вашем облаке XQR.Теперь визитка не потеряется!"'
    },
    {
        imgUrl:     training3,
        headerText: 'Пользуйтесь самым быстрым спобосом обмена контактами с Xqr',
        text:       'На странице нужного человека отсканируйте qr код,' +
                        '        далее вам будет предложено перейти по адресу"'
    },
];

const TrainingWindows = ({popupToShow, registration, showPopup,hidePopup, history, ...params}) => {

    const [idxItem, setIdxItem] = useState(0);

    useEffect(() => {
        const {state} = params.location;
        if (state && state.isNewUser) showPopup(TRAINING_POPUP);
    }, [])

    const onClickItem = index => {
        setIdxItem(index)
    };

    const onSwipedRight = ({dir}) => {
        if (dir === 'Right') {
            if (idxItem === 0) return setIdxItem(gifSlider.length - 1);
            setIdxItem(idxItem - 1);
        } else {
            if (idxItem === gifSlider.length - 1) return setIdxItem(0);
            setIdxItem(idxItem + 1);
        }
    }


    const onClosePopup = () => {
        hidePopup();
        history.replace(params.match.url, {})
    }

    const config = useSwipeable({
        onSwiped:                     (e) => onSwipedRight(e),
        preventDefaultTouchmoveEvent: true,
        trackMouse:                   true
    });

    return (
        ( popupToShow === TRAINING_POPUP &&
            <Modal>
                <div {...config} className='TrainingWindows'>
                    <div className="TrainingWindows__btn-box">
                        <button className='TrainingWindows__btn'
                                onClick={() => onClosePopup()}>
                            <svg className='TrainingWindows__btn-icon'>
                                <use xlinkHref={`${sprite}#icon-reset`}/>
                            </svg>
                        </button>
                    </div>

                    <ul className="TrainingWindows__slider">
                        <ItemSlider item={gifSlider[idxItem]}/>
                    </ul>

                    <div className='TrainingWindows__list-points-box'>
                        <ul className="TrainingWindows__list-points">
                            {
                                gifSlider.map((item, index) => {
                                    const clazz = index === idxItem
                                        ? "TrainingWindows__point TrainingWindows__point-active"
                                        : "TrainingWindows__point";

                                    return (
                                        <li key={index}
                                            className={clazz}
                                            onClick={() => onClickItem(index)}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Modal>
        )
    )
}

TrainingWindows.propTypes = {
    popupToShow: PropTypes.string,
    showPopup: PropTypes.func.isRequired,
    hidePopup: PropTypes.func.isRequired,
};


export default connect(
    ({popupToShow}) => ( {popupToShow} ),
    {hidePopup, showPopup}
)(withRouter(TrainingWindows));


