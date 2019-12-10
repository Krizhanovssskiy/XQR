import './style.scss';
import { WORK, WORK_ANOTHER_PERSON } from '../../../_constants';
import { connect } from 'react-redux';
import { showPopup, setCurrentWork } from '../../../_actions';
import React from 'react';

const Work = ({
  isChangePage,
  id,
  name,
  description,
  image_url,
  setCurrentWork,
  showPopup
}) => {
  const onWorkClick = () => {
    setCurrentWork({ id });
    if (isChangePage) {
      showPopup(WORK);
    } else {
      showPopup(WORK_ANOTHER_PERSON);
    }
  };
  return (
    <li onClick={onWorkClick} className="Work">
      <div className="Work__image-box">
        {image_url && (
          <img src={image_url} alt={name} className="Work__image" />
        )}
        <div className="Work__text-box">
          <h4 className="Work__name">{name}</h4>
          <p className="Work__description">{description}</p>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = ({ isChangePage }) => ({ isChangePage });

export default connect(
  mapStateToProps,
  { showPopup, setCurrentWork }
)(Work);
