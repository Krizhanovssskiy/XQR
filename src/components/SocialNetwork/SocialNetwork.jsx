import './style.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import validator from 'validator';

import Modal from '../Modal';
import {PlusBtn, SocialNetworkBtn} from '../Buttons';
import ItemList from './ItemList';
import PopUpShareSocialNetworks from './PopUpShareSocialNetworks';
import PopUpAddedSocialNetwork from './PopUpAddedSocialNetwork';
import {
  showPopup,
  hidePopup,
  getContacts,
  createContact,
  deleteContact,
  updateNetworks,
  deleteContactRedux,
  addedContactRedux
} from '../../_actions';
import {ADDED_SOCIAL_NETWORKS, SHARE_SOCIAL_NETWORKS} from '../../_constants';
import {urlNetworksArray} from '../../_helpers/urlNetworksArray';

class SocialNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validLink: '',
      inputValid: true,
      networkId: null,
      userLink: '',
      socialNetworkId: null,
    };
    this.oldState = '';
    this.iconNetworks = '';
  }

  static propTypes = {
    user_profile: PropTypes.object,
    auth: PropTypes.object,
    isChangePage: PropTypes.bool,
    socialNetworks: PropTypes.array,
    popupToShow: PropTypes.string,
    networks: PropTypes.array,

    hidePopup: PropTypes.func,
    showPopup: PropTypes.func,
    getContacts: PropTypes.func,
    getNetworks: PropTypes.func,
    createContact: PropTypes.func,
    deleteContact: PropTypes.func,
    updateNetworks: PropTypes.func,
    deleteContactRedux: PropTypes.func,
    addedContactRedux: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    if (this.props.networks !== prevProps.networks) {
      this.iconNetworks = this.props.networks;
    }
  }

  onEditSocialNetwork = (item, idx) => {
    this.oldState = item;
    const networkObj = this.props.networks.find(elem => elem.id === item.network_id);
    if (networkObj.name === 'telegram') {
      this.setState({
        validLink: new RegExp("^(.*)(" + 't.me' + ").*", "gm"),
        networkId: item.id,
        userLink: item.contact_value,
        socialNetworkId: item.network_id,
      });
      this.props.deleteContactRedux(item.id);
      this.props.showPopup(ADDED_SOCIAL_NETWORKS);
      return;
    }
    this.setState({
      validLink: new RegExp("^(.*)(" + networkObj.name + ").*", "gm"),
      networkId: item.id,
      userLink: item.contact_value,
      socialNetworkId: item.network_id,
    });
    this.props.deleteContactRedux(item.id);
    this.props.showPopup(ADDED_SOCIAL_NETWORKS);
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({
      userLink: value,
      inputValid: true
    });
    const {socialNetworkId} = this.state;
    if (!socialNetworkId) return;


  };
  onSubmitObj = async e => {
    e.preventDefault();
    const {auth, profile, createContact, updateNetworks} = this.props;
    const {networkId, socialNetworkId, userLink, inputValid, validLink} = this.state;
    const {api_token} = auth.user;
    const {alias, id: profile_id} = profile;
    if (validator.isURL(userLink, { protocols: ['http','https','ftp'],
                  require_tld: true, require_protocol: true,
                  require_host: true, require_valid_protocol: true,
                  allow_underscores: false, host_whitelist: false,
                  host_blacklist: false, allow_trailing_dot: false,
                  allow_protocol_relative_urls: false, disallow_auth: false })) {

      let regex = validLink;
      if (userLink.match(regex)) {
        this.setState({inputValid: true})
      } else {
        return this.setState({inputValid: false});
      }
    }
    console.log(userLink, 'userLink no url')
    if (
      (socialNetworkId === 11 || socialNetworkId === '11')
      || (socialNetworkId === 7 || socialNetworkId === '7')
    ) {
      const string = userLink.split('+');
      if (networkId) {
        await updateNetworks({
          api_token,
          alias,
          contact_id: networkId,
          contact_value: string[string.length - 1],
        });
      } else {
        await createContact({
          api_token,
          alias,
          profile_id,
          method_id: 3,
          network_id: socialNetworkId,
          contact_value: string[string.length - 1],
        });
      }
      this.props.hidePopup();
      this.setState({
        validLink: '',
        inputValid: true,
        networkId: null,
        userLink: '',
        socialNetworkId: null,
      });
      this.oldState = '';
      return;
    }
    if (socialNetworkId === 3 || socialNetworkId === '3') {
      const string = userLink.split('@');
      if (networkId) {
        await updateNetworks({
          api_token,
          alias,
          contact_id: networkId,
          contact_value: string[string.length - 1],
        });
      } else {
        await createContact({
          api_token,
          alias,
          profile_id,
          method_id: 3,
          network_id: socialNetworkId,
          contact_value: string[string.length - 1],
        });
      }
      this.props.hidePopup();
      this.setState({
        validLink: '',
        inputValid: true,
        networkId: null,
        userLink: '',
        socialNetworkId: null,
      });
      this.oldState = '';
      return;
    }

    if (socialNetworkId === null) return;
    if (networkId) {
      await updateNetworks({
        api_token,
        alias,
        contact_id: networkId,
        contact_value: userLink,
      });
    } else {
      await createContact({
        api_token,
        alias,
        profile_id,
        method_id: 3,
        network_id: socialNetworkId,
        contact_value: userLink,
      });
    }

    this.props.hidePopup();
    this.setState({
      validLink: '',
      inputValid: true,
      networkId: null,
      userLink: '',
      socialNetworkId: null,
    });
    this.oldState = '';
  };
  onDeleteNetwork = (contact_id) => {
    const {deleteContact, auth: {user}, profile: {alias}} = this.props;
    const {api_token} = user;
    deleteContact({alias, contact_id, api_token})
  };
  onClickSocialIcon = (item) => () => {
    if (item.name === 'telegram') {
      this.setState({
        socialNetworkId: item.id,
        validLink: new RegExp("^(.*)(" + 't.me' + ").*", "gm")
      });
      return;
    }
    this.setState({
      socialNetworkId: item.id,
      validLink: new RegExp("^(.*)(" + item.name + ").*", "gm")
    });
  };
  onResetSocialPopup = () => {
    this.setState({
      networkId: null,
      userLink: '',
      socialNetworkId: null,
      validLink: '',
      inputValid: false
    });
    if (this.oldState.length !== 0) {
      this.props.addedContactRedux(this.oldState);
    }
    this.oldState = '';
    this.props.hidePopup();
  };

  iconSocialNetwork = (network_id) => {
    if (this.props.networks && this.props.networks.length > 0) {
      const item = this.props.networks.find(elem => elem.id === network_id);
      return item.name;
    }
    return '';
  };

  render() {
    const {inputValid, ...itemsPopUp} = this.state;
    const {
      clazz,
      popupToShow,
      showPopup,
      socialNetworks,
      isChangePage,
      networks
    } = this.props;
    return (
      <div className={`SocialNetwork__container ${clazz}`}>
        <div className="SocialNetwork__icon-container">
          <ul className="SocialNetwork__icon-list">
            <li key="icon-share" className="SocialNetwork__icon-box">
              <div className="SocialNetwork__icon-inner-box 22">
                <SocialNetworkBtn
                  onClick={() => {
                    showPopup(SHARE_SOCIAL_NETWORKS);
                  }}
                  iconId="share"
                />
              </div>
              {popupToShow === SHARE_SOCIAL_NETWORKS && (
                <Modal>
                  <PopUpShareSocialNetworks list={networks}/>
                </Modal>
              )}
            </li>
            {socialNetworks.map((item, idx) => {
              const elementNetwork = urlNetworksArray.find(
                elem => elem.socialId === item.network_id
              );
              const urlNetwork = elementNetwork.url_networks;
              return (
                <ItemList
                  iconId={this.iconSocialNetwork(item.network_id)}
                  network_id={item.network_id}
                  isChangePage={isChangePage}
                  key={item.id}
                  onEdit={() => this.onEditSocialNetwork(item, idx)}
                  onDelete={() => {
                    this.onDeleteNetwork(item.id);
                  }}
                  userLink={validator.isURL(item.contact_value)
                    ? item.contact_value
                    : urlNetwork + item.contact_value}
                />
              );
            })}
            {socialNetworks.length < 10 &&
            (isChangePage ? (
              <li key="icon-plus" className="SocialNetwork__icon-box">
                <div className="SocialNetwork__icon-inner-box">
                  <PlusBtn
                    className={
                      socialNetworks.length === 0 ? "SocialNetwork__icon-plusBtn" : null
                    }
                    onClick={() => {
                      this.props.showPopup(ADDED_SOCIAL_NETWORKS);
                    }}
                  />
                </div>
              </li>
            ) : null)}
          </ul>
        </div>
        {popupToShow === ADDED_SOCIAL_NETWORKS && (
          <PopUpAddedSocialNetwork
            itemsPopUp={itemsPopUp}
            handleChange={this.handleChange}
            onSubmitObj={this.onSubmitObj}
            onClickSocialIcon={this.onClickSocialIcon}
            onResetSocialPopup={this.onResetSocialPopup}
          />
        )}
      </div>
    );
  }
}

const mapSateToProps = ({
                          profile,
                          auth,
                          isChangePage,
                          infoContacts,
                          popupToShow,
                          networks
                        }) => ({
    profile,
    auth,
    isChangePage,
    socialNetworks: infoContacts.socialNetworks,
    popupToShow,
    networks,
  }
);

export default connect(
  mapSateToProps,
  {
    hidePopup,
    showPopup,
    getContacts,
    createContact,
    deleteContact,
    updateNetworks,
    deleteContactRedux,
    addedContactRedux
  }
)(SocialNetwork);
