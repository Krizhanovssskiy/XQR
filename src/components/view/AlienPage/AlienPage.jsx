import './style.scss';
import {
    isFeaturesHasData,
    isUserDetailsHasData,
    isAboutMeHasData
} from '../../../_helpers/isBlockHaveData';

import useMobileDetect                      from '../../../_helpers/useMobileDetect';
import React, {useEffect, useRef, useState} from 'react';
import PropTypes                            from 'prop-types';
import {withRouter}                         from 'react-router-dom';
import {connect}                            from 'react-redux';
import {getUserInfo}                        from '../../../_src/lib/api';
import {
    getServices,
    getCV,
    getPortfolio,
    getGoalsListing,
    getVideoListing,
    getNetworks,
    getContacts,
    getCategories,
    getFriends,
    getShop
}                                           from '../../../_actions';

import UserHeading         from '../../UserHeading';
import GlobalMenu          from '../../GlobalMenu';
import CallToAction        from '../../CallToAction';
import UserInfoYellow      from '../../UserInfoYellow';
import Ads                 from '../Ads';
import UserMainInfo        from '../../UserMainInfo';
import Features            from '../../Features';
import MainAboutMe         from '../MainAboutMe';
import AddedReviews        from '../AddedReviews';
import UserDetailsViewFull from '../UserDetailsViewFull';
import Loader              from '../../Loader';
import Modal               from '../../Modal';

const AlienPage = ({
                       ownAlias,
                       api_token,
                       services,
                       cvData,
                       portfolio,
                       description,
                       goals,
                       getUserInfo,
                       getServices,
                       getCV,
                       getPortfolio,
                       getShop,
                       getGoalsListing,
                       getVideoListing,
                       getNetworks,
                       getContacts,
                       getCategories,
                       getFriends,
                       match
                   }) => {
    const {
              params: {alias}
          } = match;

    useEffect(() => {
        if (alias) {
            getUserInfo({alias});
        }
    }, [alias, getUserInfo]);

    const alienRef = useRef(null);

    useEffect(() => {
        if (alienRef.current) {
            alienRef.current.scrollIntoView();
        }
    });

    const [isAllDataReceived, setIsAllDataReceived] = useState(false);
    useEffect(() => {
        ( async () => {
            if (alias) {
                await Promise.all([
                    getServices(alias),
                    getCV(alias),
                    getPortfolio(alias),
                    getGoalsListing(alias),
                    getVideoListing(alias),
                    getNetworks(),
                    getContacts(alias),
                    getShop(alias)
                ]);
                setIsAllDataReceived(true);
            }
        } )();
    }, [
        alias,
        getServices,
        getCV,
        getPortfolio,
        getGoalsListing,
        getVideoListing,
        getNetworks,
        getContacts,
        getShop
    ]);

    useEffect(() => {
        ( async () => {
            if (ownAlias && api_token) {
                await Promise.all([
                    getCategories(api_token, ownAlias),
                    getFriends(api_token, ownAlias)
                ]);
                setIsAllDataReceived(true);
            }
        } )();
    }, [ownAlias, api_token, getCategories, getFriends]);

    const isMobile = useMobileDetect();

    if (!isAllDataReceived) {
        return (
            <Modal>
                <Loader/>;
            </Modal>
        );
    }

    const {isUserHasServices} = isFeaturesHasData({services});
    const {isUserHasCv, isUserHasPortfolio} = isUserDetailsHasData({
        cvData,
        portfolio
    });
    const {isAboutMeHasDescription, isAboutMeHasGoals} = isAboutMeHasData({
        description,
        goals
    });
    // TODO Render a different layout depending on the values of the variables "isHas..."

    switch (isMobile) {
        case true:
            return (
                <div ref={alienRef} className="Alien">
                    <div className="Alien__UserHeading-box">
                        <UserHeading/>
                        <UserInfoYellow/>
                    </div>
                    <div className="Alien__UserDetails-box">
                        <GlobalMenu
                            isUserHasServices={isUserHasServices}
                            isUserHasCv={isUserHasCv}
                            isUserHasPortfolio={isUserHasPortfolio}
                        />
                    </div>
                    <div className="Alien__CallToAction-box">
                        <CallToAction/>
                    </div>
                    <div className="Alien__Ads-box">
                        {/*<Ads />*/}
                    </div>
                </div>
            );
        case false:
            return (
                <div className="Alien">
                    <div className="Alien__UserHeading-box">
                        <UserHeading/>
                    </div>
                    {( isAboutMeHasDescription || isAboutMeHasGoals ) && (
                        <div className="Alien__AboutMe-box">
                            <MainAboutMe
                                notAdditional={false}
                                isAboutMeHasDescription={isAboutMeHasDescription}
                                isAboutMeHasGoals={isAboutMeHasGoals}
                            />
                        </div>
                    )}
                    <div className="Alien__Ads-box">
                        <Ads/>
                    </div>
                    <div className="Alien__UserMainInfo-box">
                        <UserMainInfo/>
                    </div>
                    <div className="Alien__Features-box">
                        <Features isUserHasServices={isUserHasServices}/>
                    </div>
                    <div className="Alien__AddedReviews-box">
                        <AddedReviews/>
                    </div>
                    {( isUserHasCv || isUserHasPortfolio ) && (
                        <div className="Alien__UserDetails-box">
                            <UserDetailsViewFull
                                isUserHasCv={isUserHasCv}
                                isUserHasPortfolio={isUserHasPortfolio}
                            />
                        </div>
                    )}
                </div>
            );
        case null:
            return null;
        default:
            return console.error('something gone wrong');
    }
};
AlienPage.propTypes = {
    match:       PropTypes.object,
    getUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = ({
                             auth,
                             services,
                             cvData,
                             portfolio,
                             profile,
                             goals
                         }) => ( {
    ownAlias:    auth.user.alias,
    api_token:   auth.user.api_token,
    services,
    cvData,
    portfolio,
    description: profile.description,
    goals
} );

export default connect(
    mapStateToProps,
    {
        getUserInfo,
        getServices,
        getCV,
        getPortfolio,
        getGoalsListing,
        getVideoListing,
        getNetworks,
        getContacts,
        getCategories,
        getFriends,
        getShop
    }
)(withRouter(AlienPage));
