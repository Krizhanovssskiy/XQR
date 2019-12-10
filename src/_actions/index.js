export {
    registration,
    resetCurrentUser,
    createAlias,
    setHostName,
    auth,
    setCurrentUser,
    clearReg,
    forgotPassword,
    accountConfirmation,
    getNewCodeConfirm,
    getNewResetCode,
    resetPassword,
    resetRegistration,
} from './regLog';


export {showPlayer, hidePlayer}                from './player';


export {searchAction,clearSearchAction}         from './search';
export {lang_init}                              from './language';

export {
    getServices,
    createService,
    updateService,
    destroyService,
    setCurrentService,
    resetCurrentService
}                                                    from './services';

export {
    getShop,
    createShop,
    updateShop,
    destroyShop,
    setCurrentShop,
    resetCurrentShop
}                                                    from './shopAC';

export {showPopup, hidePopup}                        from './popup';

export {
    pickFeaturesTab,
    pickUserdetailsTab,
    pickAboutMeTab,
    pickGlobalMenuTab
}                                                      from './pickTabs';

export {setIsChangePage,setOwnPage}                               from './pageChanges';

export {getNetworks}                                  from './networksAC';

export {
    getPortfolio,
    createWork,
    updateWork,
    destroyWork,
    setCurrentWork,
    resetCurrentWork
}                                                     from './portfolio';

export {
    getCV,
    addCvEntity,
    updateCvEntity,
    deleteCvEntity,
    createForm,
    removeForm,
    clearFromBlanks,
    onFormInputChange,
    populateForms
}                                                   from './currVitae';

export {alertSuccess, alertObject, alertError, alertClear} from './alert';

export {
    addedPhoneUser,
    addedEmailUser,
    changePhoneUser
}                                                  from './userContactsAC';

export {
    getContactsAction,
    createContactAction,
    updateContactAction,
    deleteContactAction
}                                                  from './contactsActions';

export {
    deleteReviewAction,
    approveReviewAction,
    addReviewAction,
    testReviewApiAction,
    getAllUserReviewsAction,
    getAllConfirmedUserReviewsAction,
    deleteAdedReviewReportAction
}                                                  from './deleteReviewAction';

export {
    addShopItemsActions,
    addProductToCart,
    removeProductToCart,
    incrementCartQuantity,
    decrementCartQuantity
}                                                 from './shopActions';
export {
    createContact,
    getContacts,
    updateContact,
    updateInfoUserContactAction,
    deleteContact,
    deleteContactRedux,
    addedContactRedux,
    updateNetworks,

}                                                from './contacts';

export {
    getVideoListing,
    getSingleVideo,
    createVideo,
    updateVideo,
    destroyVideo,
    uploadVideoImage,
    deleteVideoImage
}                                                from './video';

export {
    getCategories,
    createCategory,
    updateCategory,
    destroyCategory,
    setCurrentCategory,
    resetCurrentCategory
}                                             from './categories';

export {
    getFriends,
    getFriendsByCategory,
    addFriend,
    addFriendAndPastToSomeCategory,
    pastFriendToSomeCategory,
    removeFriendFromCategory,
    removeFriend,
    getScrollFriend
}                                                 from './friends';

export {
    getGoalsListing,
    createGoal,
    destroyGoal,
    updateGoal
}                                                  from './goalsAC';


export {
  getCustomTagsListing,
  createCustomTag,
  deleteCustomTag
}                                                  from './customTagsAC';
