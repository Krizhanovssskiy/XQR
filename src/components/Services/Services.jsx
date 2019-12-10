import './style.scss';
import { pick } from 'underscore';
import { SERVICE, SERVICEVIEW } from '../../_constants';
import React from 'react';
import { connect } from 'react-redux';
import ScrollingList from '../ScrollingList/ScrollingList';
import Service from './Service/Service';
import ServiceAdd from './ServiceAdd/ServiceAdd';
import Modal from '../Modal';
import PopupServices from './PopupServices';
import ServicesPopupView from './ServicesPopupView/ServicesPopupView';

const Services = ({ services, isChangePage, popupToShow }) => {
  const { servicesList } = services;
  return (
    <div className="Services">
      <>
        <ScrollingList>
          {isChangePage && <ServiceAdd />}
          {servicesList.map(service => {
            const toService = pick(service, 'id', 'name', 'price', 'image_url');
            return <Service key={service.id} {...toService} />;
          })}
        </ScrollingList>
        {popupToShow === SERVICE && (
          <Modal>
            <PopupServices />
          </Modal>
        )}
        {popupToShow === SERVICEVIEW && (
          <Modal>
            <ServicesPopupView />
          </Modal>
        )}
      </>
    </div>
  );
};

const mapStateToProps = ({ services, isChangePage, popupToShow }) => ({
  services,
  isChangePage,
  popupToShow
});

export default connect(mapStateToProps)(Services);
