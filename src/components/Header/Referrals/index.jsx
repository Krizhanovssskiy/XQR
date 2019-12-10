import './styles.scss';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import i18next                    from "i18next";

const Referrals = ({ referrals_count }) => {
  const depth = 3;
  const refferals = [...Array(depth)];
  if (referrals_count) {
    for (let idx = 0; idx < depth; idx++) {
      const item = referrals_count[idx + 1] ? referrals_count[idx + 1] : 0;
      refferals[idx] = item;
    }
  } else {
    refferals.fill(0);
  }

  return (
    <ul className="Referrals">
      {refferals.map((data, idx) => (
        <li key={idx} className="Referrals__list-item">
          <span>{idx + 1}&#45;{i18next.t('user_menu.partners_item')}&nbsp;</span>
          <span className="Referrals__list-item-amount">{data}</span>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ activeUser }) => ({
  referrals_count: activeUser.referrals_count
});

Referrals.propTypes = {
  referrals_count: PropTypes.object
};

export default connect(mapStateToProps)(Referrals);
