import './style.scss';

import { DOMAIN } from '../../_constants';
import { connect } from 'react-redux';
import { alertSuccess } from '../../_actions';

import React, {Fragment} from 'react';
import i18next from 'i18next';


const MySmartSite = ({ alias, alertSuccess }) => {
  const copyToClipboard = e => {
    e.target.focus();
    e.target.select();
    document.execCommand('copy');
    alertSuccess('Ссылка скопирована в буфер обмена');
    alert('Ссылка скопирована в буфер обмена');
  };

  const url = `${alias}.${DOMAIN}`;

  return (
    <Fragment>
      <p className="MainInfoContact__contact">{i18next.t('mainInfo.smart_site')}</p>
      <input
        className="MainInfoContact__input-smart-site"
        type="text"
        onClick={copyToClipboard}
        value={url}
        readOnly
      />
    </Fragment>
  );
};

const mapStateToProps = ({ profile }) => ({ alias: profile.alias });

export default connect(
  mapStateToProps,
  { alertSuccess }
)(MySmartSite);
