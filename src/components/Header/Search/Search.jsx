import './style.scss';

import sprite from '../../../img/sprite.svg';

import React, {useState, useEffect}      from 'react';
import ResultsSearch                     from '../ResultsSearch'
import PropTypes                         from "prop-types";
import {connect}                         from "react-redux";
import {Link, withRouter}                from 'react-router-dom';
import {searchAction, clearSearchAction} from "../../../_actions";
import Modal                             from "../../Modal";
import i18next                           from "i18next";


const Search = ({searchResult, searchAction, clearSearchAction, location}) => {
    const [searchInput, setSearchInput] = useState("");
    const [isSearchView, setIsSearchView] = useState(false);

    useEffect(() => {
        clearSearchAction();
        setSearchInput("");
        setIsSearchView(false)
    }, [location.pathname]);


    const searchQuery = async (e) => {
        e.preventDefault();
        if (searchInput.length < 3) {
            alert('Длина поиска не менее 3 символов');
            return;
        }

        await searchAction(searchInput);
        setIsSearchView(true)
    };

    const clearSearch = (e) => {
        e.preventDefault();
        clearSearchAction();
        setSearchInput("");
    };

    return (
        <div className="Search">
            <form className="Search__form-search">
                <button className="Search__button Search__button-magnifying-glass" onClick={searchQuery}>
                    <svg className="Search__icon Search__icon-magnifying-glass">
                        <use xlinkHref={`${sprite}#icon-magnifying-glass`}/>
                    </svg>
                </button>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    className="Search__input"
                    placeholder={"X "+i18next.t('search_text')}
                />
                <button className="Search__button Search__button-cross" onClick={clearSearch}>
                    <svg className="Search__icon Search__icon-cross">
                        <use xlinkHref={`${sprite}#icon-cross`}/>
                    </svg>
                </button>
            </form>
            {
                ( isSearchView ) && (
                    <Modal>
                        <ResultsSearch setIsSearchView={setIsSearchView} searchResult={searchResult}/>
                    </Modal>
                )
            }
        </div>
    );
};


Search.propTypes = {
    searchResult:      PropTypes.array,
    searchAction:      PropTypes.func.isRequired,
    clearSearchAction: PropTypes.func.isRequired,
    location:          PropTypes.object
};


export default connect(
    ({searchResult}) => ( {searchResult} ),
    {searchAction, clearSearchAction}
)(withRouter(Search));



