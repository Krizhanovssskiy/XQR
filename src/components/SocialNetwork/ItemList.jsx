import React from 'react';
import { SocialNetworkBtn } from "../Buttons";

const keys = 100;

const ItemList = ({network_id, iconId, userLink, onEdit, onDelete, isChangePage, onClick, clazz}) => {
    return (
    <li
      onClick={onClick}
      key={keys+network_id}
      className="SocialNetwork__icon-box">
      <div className="SocialNetwork__icon-inner-box">
        <a href={userLink} target='_blank' rel = "noopener noreferrer">

          <SocialNetworkBtn iconId={iconId} className={clazz} />
        </a>
      </div>

      {
        isChangePage
        && (
        <div className='SocialNetwork__popup-btn-block'>
          <button
            // onClick={isEdit}
            className='SocialNetwork__popUp-btn'
          >
            Добавить
          </button>
          <button
            onClick={onEdit}
            className='SocialNetwork__popUp-btn'
          >
            Изменить
          </button>
          <button
            onClick={onDelete}
            className='SocialNetwork__popUp-btn'
          >
            Удалить
          </button>
        </div>
        )
      }
    </li>
  )
};

export default ItemList;