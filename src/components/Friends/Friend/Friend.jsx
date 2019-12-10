import './style.scss';
// import sprite from '../../../img/sprite.svg';
import icon   from '../../../img/icon-180x180.png';
import {Link} from "react-router-dom";
import React  from 'react';
import qrCode from '../../../img/qr-code-small.png';

const Friend = ({
                    id,
                    first_name,
                    last_name,
                    alias,
                    specialty,
                    profile_images,
                }) => {
    let imageSrc = icon;
    if (profile_images.length > 0) {
        const {thumb_url, image_url} = profile_images.find(image => {
            return image.is_main === 1 || image.is_main === '1';
        });
        imageSrc = thumb_url || image_url || icon;
    }

    const link = `/user/${alias}`;

    return (

        <li className="Friend">
            <Link to={link} className="Friend__text-box__link">
                <div className="Friend__contact-box">
                    <div className="Friend__images-block">
                        <div className="Friend__image-box">
                            <img src={imageSrc} alt="contact" className="Friend__image"/>
                        </div>
                        <div className="Friend__qr-box">
                            <div className="Friend__qr-innerbox">
                                <img src={qrCode} alt="qr-code" className="Friend__qr-code"/>
                            </div>
                        </div>
                    </div>

                    <div className="Friend__text-box">
                        <h4 className="Friend__name">
                            {`${first_name || ''}`} &nbsp;{`${last_name || ''}`}
                            {!( first_name || last_name ) && alias}
                        </h4>
                        <p className="Friend__spec">{`${specialty || ''}`}</p>
                    </div>
                </div>
            </Link>
            {/* ГДЕ propTypes???????
             <div className="Friend__icon-box">
             <p className="Friend__icon-amount-letters">5</p>
             <svg className="Friend__icon">
             <use xlinkHref={`${sprite}#icon-contacts-envelope`} />
             </svg>
             </div> */}
        </li>
    );
};


export default Friend;
