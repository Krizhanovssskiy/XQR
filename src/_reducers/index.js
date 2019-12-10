import {combineReducers}    from 'redux';
import isChange             from './isChangeReducer';
import isOwnPageReducer     from './isOwnPageReducer';
import registrationReducer  from './registrationReducer';
import authReducer          from './authReducer';
import alertsReducer        from './alertsReducer';
import profileReducer       from './profileReducer';
import playerReducer        from './playerReducer';
import servicesReducer      from './servicesReducer';
import shopsReducer         from './shopsReducer';
import groupContactsReducer from './groupContactsReducer';
import popupReducer         from './popupReducer';
import cvLabelsReducer      from './cvLabelsReducer';
import pickTabsReducer      from './pickTabsReducer';
import currVitaeReducer     from './currVitaeReducer';

import reviewsReducer            from './reviewsReducer';
import reviewsAddedReviewReducer from './reviewsAddedReviewReducer';

import apiKeysReducer    from './apiKeysReducer';
import shopItemsReducer  from './shopItemsReducer';
import shopCartReducer   from './shopCartReducer';
import contactsReducer   from './infoContactsReducer';
import portfolioReducer  from './portfolioReducer';
import videoReducer      from './videoReducer';
import networksReducer   from './networksReducer';
import categoriesReducer from './categoriesReducer';
import friendsReducer    from './friendsReducer';
import goalsReducer      from './goalsReducer';
import customTagsReducer from './customTagsReducer';
import languageReducer   from './languageReducer';
import searchReducer     from './searchReducer';
import hostNameReducer   from './hostNameReducer';

import activeUserReducer from './activeUserReducer';

export default combineReducers({
    isChangePage:   isChange,
    isOwnPage:      isOwnPageReducer,
    registration:   registrationReducer,
    auth:           authReducer,
    activeUser:     activeUserReducer,
    profile:        profileReducer,
    alert:          alertsReducer,
    movie:          playerReducer,
    services:       servicesReducer,
    shops:          shopsReducer,
    groupsContacts: groupContactsReducer,
    popupToShow:    popupReducer,
    cvLabels:       cvLabelsReducer,
    pickedTabs:     pickTabsReducer,
    networks:       networksReducer,
    cvData:         currVitaeReducer,
    reviews:        reviewsReducer,
    hostName:       hostNameReducer,
    searchResult:   searchReducer,
    lang:           languageReducer,
    isReviewAdd:    reviewsAddedReviewReducer,
    apiKeys:        apiKeysReducer,
    shopItems:      shopItemsReducer,
    cartItems:      shopCartReducer,
    infoContacts:   contactsReducer,
    portfolio:      portfolioReducer,
    videos:         videoReducer,
    categories:     categoriesReducer,
    friends:        friendsReducer,
    goals:          goalsReducer,
    customTags:     customTagsReducer,
});
