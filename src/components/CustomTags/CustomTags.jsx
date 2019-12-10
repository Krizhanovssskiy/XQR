import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserInfo} from '../../_src/lib/api';
import { hidePopup,
          showPopup,
          getCustomTagsListing,
          createCustomTag,
          deleteCustomTag} from "../../_actions";
import PopUpAddedHashTags from "./PopUpAddedHashTags/PopUpAddedHashTags";
import { OPEN_POPUP_TAGS } from '../../_constants';
import Modal from "../Modal";
import ItemTag from "./ItemTag";
import i18next from "i18next";

class CustomTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagId: null,
      valueInput: ''
    };
  }

  componentDidMount() {
    const { match, getCustomTagsListing } = this.props;
    const {params} = match;
    const alias = params.alias;

    if (alias) {
      getCustomTagsListing(alias);
    }
  }

  onClickCustomTag = ({ id, name }) => {
    this.setState({
      tagId: id,
      valueInput: name
    });
    this.props.showPopup(OPEN_POPUP_TAGS);
  };
  onDeleteData = (tagId) => {
    const { auth, user_profile, hidePopup, deleteCustomTag, } = this.props;
    const {api_token} = auth.user;
    const { alias } = user_profile;
    deleteCustomTag({
      api_token,
      alias,
      tag_id: tagId
    });
    hidePopup();
    this.setState({
      tagId: null,
      valueInput: ''
    })
  };
  onSubmitData = (e) => {
    e.preventDefault();
    const { valueInput: tag_name } = this.state;
    const { auth, user_profile, createCustomTag} = this.props;
    const {api_token} = auth.user;
    const { alias, id: profile_id } = user_profile;
    createCustomTag({
      api_token,
      alias,
      tag_name,
      profile_id
    });
    this.setState({
      valueInput: ''
    });
    this.props.hidePopup()
  };
  onChangeInput = e => {
    const value = e.target.value;
    this.setState({
      valueInput: value
    })
  };
  onResetPopUp = () => {
    this.setState({
      tagId: null,
      valueInput: ''
    });

    this.props.hidePopup();
  };

  render() {
    const { clazz,
      customTags,
      isChangePage,
      popupToShow,
      showPopup,} = this.props;
    const { tagId, valueInput } = this.state;
    return (
      <div className='CustomTags'>
        <div className={`CustomTags__container ${clazz}CustomTags`}>
          <ul className='CustomTags__list-tasks'>
            {
              customTags.map( (item, idx) => {
                return (
                  <ItemTag
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    idx={idx}
                    onClickCustomTag={isChangePage && this.onClickCustomTag}
                  />
                )
              })
            }
          </ul>
          {
            isChangePage && (
              <button
                onClick={() => showPopup(OPEN_POPUP_TAGS)}
                className='CustomTags__btn-add-task'
              >
                +  {i18next.t("added_hash_tag")}
              </button>
            )
          }

        </div>

        {
          popupToShow === OPEN_POPUP_TAGS && isChangePage && (
            <Modal>
              <PopUpAddedHashTags
                tagId={tagId}
                valueInput={valueInput}
                onChangeInput={this.onChangeInput}
                onReset={this.onResetPopUp}
                onSubmitData={this.onSubmitData}
                onDeleteData={this.onDeleteData}
              />
            </Modal>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ profile,
                           auth,
                           customTags,
                           popupToShow,
                           isChangePage
                         }) => ({
  user_profile: profile,
  auth,
  customTags,
  popupToShow,
  isChangePage,
});


export default connect(
  mapStateToProps,
  {
    getUserInfo,
    showPopup,
    hidePopup,
    getCustomTagsListing,
    createCustomTag,
    deleteCustomTag,
  }
)(withRouter(CustomTags));