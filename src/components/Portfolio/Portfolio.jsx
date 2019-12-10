import './style.scss';
import { useOnWheel } from '../../_helpers/customHooks';
import { uniqueId } from 'underscore';
import React from 'react';
import { connect } from 'react-redux';
import { WORK, WORK_ANOTHER_PERSON } from '../../_constants';
import Modal from '../Modal';
import Work from './Work';
import WorkPopup from './WorkPopup';
import WorkAdd from './WorkAdd';
import WorkPopupView from './WorkPopupView';

const Portfolio = ({ portfolio, popupToShow, isChangePage }) => {
  const { works } = portfolio;

  const renderDummyBlanks = () => {
    if (!isChangePage) return;
    if (works.length > 2) return null;
    const dummies = [...Array(3 - works.length)];
    return dummies.map(() => (
      <li key={uniqueId('dummy_')} className="Portfolio__dummy" />
    ));
  };

  const { wheeledElement, onMouseWheel } = useOnWheel();
  const classPrefix = isChangePage ? 'Portfolio' : 'PortfolioViewFull';

  return (
    <>
      <div className={`${classPrefix}__container`}>
        <ul
          ref={wheeledElement}
          onWheel={onMouseWheel}
          className={`${classPrefix}__list`}
        >
          {isChangePage && <WorkAdd />}
          {works.map(work => {
            const { id, name, description, image_url, work_url } = work;

            return (
              <Work
                classPrefix={classPrefix}
                key={id}
                id={id}
                name={name}
                description={description}
                image_url={image_url}
                work_url={work_url}
              />
            );
          })}
          {classPrefix === 'Portfolio' && renderDummyBlanks()}
        </ul>
      </div>
      {popupToShow === WORK && (
        <Modal>
          <WorkPopup />
        </Modal>
      )}
      {popupToShow === WORK_ANOTHER_PERSON && (
        <Modal>
          <WorkPopupView />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = ({ portfolio, popupToShow, isChangePage }) => ({
  portfolio,
  popupToShow,
  isChangePage
});

export default connect(mapStateToProps)(Portfolio);
