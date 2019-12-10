import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from "../ItemList";
import { Reset } from "../../Buttons";
import { hidePopup } from '../../../_actions';
import i18next from 'i18next';
const domain = 'https://xqr.one/user/';

const getDomainUser = ( domain, alias ) => domain + alias;

const getUrl = ({share_url,
                  alias,
                  description,
                  image_url,
                  specialty}) => {
  const site = getDomainUser(domain, alias);
  let url = share_url.replace('{description}',  description);
  url = url.replace('{site}', site);
  url = url.replace('{custom_text}', `Моя Бизнес страница: ${site} ${description}` );
  url = url.replace('{title}', specialty);
  url = url.replace('{image}', image_url);
  return url;
};

class PopUpShareSocialNetworks extends Component {

  render() {
    const { list, user_profile } = this.props;
    const { alias, description, profile_images, specialty } = user_profile;
    const { image_url } = profile_images[0];
    const shareArray = list.filter(item => item.share_url);
    return(
      <div className="ShareSocialNetworks__container">
        <p className='ShareSocialNetworks__text'>{i18next.t('soc_network.share_popup')}</p>
        <ul className="SocialNetwork__icon-list">
          {
            shareArray.map(({id, name, share_url}) => (
              <ItemList
                key={id}
                iconId={name}
                userLink={getUrl({
                  share_url,
                  alias,
                  description,
                  image_url,
                  specialty
                })}
                toСhange
                clazz='ShareSocialNetworks__icon'
              />
            ))
          }
        </ul>
        <div className='SocialNetwork__form-btn-block'>
          <Reset
            onClick={this.props.hidePopup}
            className='SocialNetwork__icon-form-btn'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ profile }) => ({
  user_profile: profile
});

export default connect(
  mapStateToProps,
  {
    hidePopup
  }
)(PopUpShareSocialNetworks);