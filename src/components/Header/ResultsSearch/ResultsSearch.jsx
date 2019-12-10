import './style.scss';
import productImg from '../../../img/photo-3.png'

import React, {Fragment} from 'react';
import PropTypes         from "prop-types";
import {Link}            from "react-router-dom";
import sprite            from "../../../img/sprite.svg";

const ProductSearch = () => (
    <div className='ResultsSearch__Result'>
        <div className="ResultsSearch__Result--img-box">
            <img
                className="ResultsSearch__Result--img"
                src={productImg}
                alt="user img"/>
        </div>

        <div className="ResultsSearch__Result--text-box">
            <p className="ResultsSearch__Result--name">
                <span className='ResultsSearch__Result--bold'>City guide</span>
                (Konstancia Algremonto) with a price
            </p>
            <p className="ResultsSearch__Result--name ResultsSearch__Result--bold">
                $500
            </p>
            <p className='ResultsSearch__Result--price'>
                shop
            </p>
        </div>
    </div>
);


const UserSearch = ({item}) => {

    let [profile_images] = item.profile_images;
    return (
        <Fragment>

            <Link to={`/user/${item.alias}`} className="ResultsSearch__Result Friend__text-box__link">
                <div className="ResultsSearch__Result--img-box">
                    {
                        ( profile_images && profile_images.image_url ) ?
                            <img
                                className="ResultsSearch__Result--img"
                                src={( profile_images && profile_images.image_url )}
                                alt="user img"/> :
                            <div className={`ResultsSearch__Result--img ResultsSearch__Result--block-flex`}>
                                <svg className={`ResultsSearch__Result--svg`}>
                                    <use xlinkHref={`${sprite}#icon-user`}/>
                                </svg>
                            </div>
                    }
                </div>
                <div className="ResultsSearch__Result--text-box">
                    <p className="ResultsSearch__Result--name ResultsSearch__Result--bold">
                        {item.first_name}
                    </p>
                    <p className="ResultsSearch__Result--special">
                        {item.specialty}
                    </p>
                </div>
            </Link>
        </Fragment>
    )
};

UserSearch.propTypes = {
    item: PropTypes.object,
};


const ResultsSearch = ({setIsSearchView, searchResult}) => (
        <div className='ResultsSearch'>
            <p className='ResultsSearch__header-text'>Результаты поиска</p>
            {
                ( searchResult.length > 0 ?
                        searchResult.map((item, key) => (
                            <UserSearch item={item} key={key}/>
                        )) :
                        <span className="ResultsSearch__header-text">Не найдено</span>
                )
            }
            <div className="ResultsSearch__button--close-block">
                <svg
                    onClick={() => setIsSearchView(false)}
                    role="button"
                    className="ServicesPopupView__icon-cancel">
                    <use xlinkHref={`${sprite}#icon-cancel`}/>
                </svg>
            </div>
        </div>
);



ResultsSearch.propTypes = {
    searchResult:    PropTypes.array,
    setIsSearchView: PropTypes.func
};


export default ResultsSearch;
