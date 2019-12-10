import { connect } from 'react-redux';
import { createForm, populateForms } from '../../../_actions';

import React, { useEffect } from 'react';
import CvForms from './CvForms';
import CvForm from './CvForm';

const CvPopupUnit = ({
  cvLabels,
  cvData,
  cvLabelIdx,
  populateForms
}) => {
  const { apiKey, formsKey } = cvLabels[cvLabelIdx];
  const dbEntities = cvData[apiKey];
  const formEntities = cvData[formsKey];

  useEffect(() => {
    if (dbEntities.length > 0) {
      populateForms({ apiKey, formsKey, cvLabelIdx });
    }
  }, [dbEntities.length, apiKey, formsKey, cvLabelIdx, populateForms]);

  const forms = formEntities.map((entity, i) => {
    const isLastItem = !!formEntities[i + 1];
    return (
      <CvForm
        key={entity.id}
        cvLabelIdx={cvLabelIdx}
        entity={entity}
        lastForm={isLastItem ? false : true}
      />
    );
  });

  return <CvForms cvLabelIdx={cvLabelIdx}>{forms}</CvForms>;
};

const mapStateToProps = ({ cvLabels, cvData }) => ({ cvLabels, cvData });

export default connect(
  mapStateToProps,
  { createForm, populateForms }
)(CvPopupUnit);
