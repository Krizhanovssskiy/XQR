import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PlusBtn } from '../Buttons';
import { createLink } from '../../_src/lib/helpers';

class UserContacts extends Component {
  link = '';

  constructor(props) {
    super(props);
    this.readOnly = false;
  }

  static propTypes = {
    userContacts: PropTypes.array,
    toggleContacts: PropTypes.bool,
    isChangePage: PropTypes.bool,
    onToggleContacts: PropTypes.func
  };

  componentDidMount() {
    if (!this.props.isChangePage) this.readOnly = true;
  }

  dropDownContacts = () => {
    const {
      toggleContacts,
      userContacts,
      onToggleContacts,
      onClickContact,
      isChangePage,
      popupToShow
    } = this.props;
    return (
      toggleContacts && (
        <Fragment>
          <span onClick={onToggleContacts}>▼</span>
          <div className="MainInfoContact__list-contacts">
            {userContacts && userContacts.length > 0
              ? userContacts.map((item, idx) => (
                  <div
                    onClick={() =>
                      isChangePage && onClickContact(item, popupToShow)
                    }
                    key={item.id}
                    className="MainInfoContact__contact MainInfoContact__contact--link"
                  >
                    {item.contact_value}
                  </div>
                ))
              : null}
          </div>
        </Fragment>
      )
    );
  };

  renderContact({ userContacts, isChangePage, openPopUpAddContact }) {
    if (userContacts && userContacts.length > 0) {
      const method_id = userContacts[0].method_id;

      if (method_id === 2 || method_id === '2')
        this.link = createLink('phone', userContacts[0].contact_value);
      else if (method_id === 1 || method_id === '1')
        this.link = createLink('mail', userContacts[0].contact_value);

      if (isChangePage) {
        return (
          <span
            onClick={openPopUpAddContact}
            className="MainInfoContact__many-contacts "
          >
            {userContacts[0].contact_value}
          </span>
        );
      } else {
        return (
          <a
            href={this.link}
            className="MainInfoContact__many-contacts MainInfoContact__contact--link"
          >
            {userContacts[0].contact_value}
          </a>
        );
      }
    } else {
      if (isChangePage)
        return (
          <PlusBtn
            onClick={openPopUpAddContact}
            className="MainInfoContact__contact-btn-plus"
          />
        );
      else return null;
    }
  }

  render() {
    const {
      userContacts,
      toggleContacts,
      openPopUpAddContact,
      onToggleContacts,
      isChangePage
    } = this.props;
    return (
      <div className="MainInfoContact__box-contacts">
        {this.renderContact({
          userContacts,
          isChangePage,
          openPopUpAddContact
        })}
        {userContacts && userContacts.length >= 2 && !toggleContacts && (
          <span onClick={onToggleContacts}>▶</span>
        )}
        {this.dropDownContacts()}
      </div>
    );
  }
}

export default UserContacts;
