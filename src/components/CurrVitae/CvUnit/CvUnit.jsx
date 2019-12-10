import './style.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import React from 'react';

const CvUnit = ({ cvLabelIdx, data, cvLabels }) => {
  const { inputsMetadata } = cvLabels[cvLabelIdx];
  const items = data.map(item => {
    return (
      <li key={item.id} className="CvUnit__item">
        <div className="CvUnit__text-box">
          <h3 className="cv-name">{item[inputsMetadata[0].name]}</h3>
          <h4 className="cv-subname">{item[inputsMetadata[1].name]}</h4>
          <p className="cv-description">{item[inputsMetadata[2].name]}</p>
        </div>
        {inputsMetadata[4] ? (
          <p className="cv-year">
            {moment(item[inputsMetadata[3].name]).format('YYYY')}&#8209;
            {moment(item[inputsMetadata[4].name]).format('YYYY')}
          </p>
        ) : (
          <p className="cv-year">
            {moment(item[inputsMetadata[3].name]).format('YYYY')}
          </p>
        )}
      </li>
    );
  });
  return <ul>{items}</ul>;
};

const mapStateToProps = ({ cvLabels }) => ({ cvLabels });

export default connect(mapStateToProps)(CvUnit);
