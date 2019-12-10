import './style.scss';
import sprite from '../../img/sprite.svg';
import { pick } from 'underscore';
import { CATEGORY, CONTACTS } from '../../_constants';
import React from 'react';
import { connect } from 'react-redux';
import ScrollingList from '../ScrollingList/ScrollingList';
import Category from './Category';
import CategoryAdd from './CategoryAdd/CategoryAdd';
import Modal from '../Modal';
import PopupGroups from './PopupCategories';
import i18next from "i18next";

const Categories = ({ categories, popupToShow, friends, lang }) => {
  const { categoriesList } = categories;
  return (
    <>
      <section className="Categories section-main">
        <div className="Categories__header">
          <div className="Categories__title-box">
            <svg className="Categories__icon Categories__icon--users">
              <use xlinkHref={`${sprite}#icon-contacts-users`} />
            </svg>
            <h3 className="Categories__title">{i18next.t("contacts")}</h3>
            <span className="Categories__quantity">
              {friends.isDataReceived ? friends.friendsList.length : null}
            </span>
          </div>
          <div className="Categories__icons-box">
            <svg className="Categories__icon Categories__icon--active">
              <use xlinkHref={`${sprite}#icon-contacts-pause`} />
            </svg>
            <svg className="Categories__icon">
              <use xlinkHref={`${sprite}#icon-contacts-menu`} />
            </svg>
            <svg className="Categories__icon">
              <use xlinkHref={`${sprite}#icon-contacts-chevron-left`} />
            </svg>
            <svg className="Categories__icon">
              <use xlinkHref={`${sprite}#icon-contacts-chevron-right`} />
            </svg>
          </div>
        </div>

        <ScrollingList>
          <CategoryAdd />
          {categoriesList.map(category => {
            const toCategory = pick(category, 'id', 'name', 'image_url');
            return <Category key={category.id} {...toCategory} />;
          })}
        </ScrollingList>
      </section>
      {popupToShow === CATEGORY && (
        <Modal>
          <PopupGroups />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = ({
  categories,
  popupToShow,
  friends,
  lang
}) => ({
  categories,
  popupToShow,
  friends,
  lang
});

export default connect(mapStateToProps)(Categories);
