import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import CvSection from './CvSection';
import CvUnit from './CvUnit';
import ProfSkills from './ProfSkills';
import LangSkills from './LangSkills';
import i18next from "i18next";

const CurrVitae = ({
  classPrefix = 'CurrVitae',
  cvLabels,
  cvLabelsOrdered,
  cvData
}) => {
  const cvDataToRender = cvLabelsOrdered || cvLabels;
  const sections = cvDataToRender.map(({ apiKey, title }) => {
    switch (title) {
      case cvLabels[0].title:
        return (
          <CvSection key={title} title={title}>
            <ProfSkills title={title} data={cvData[apiKey]} />
          </CvSection>
        );
      case cvLabels[2].title:
        return (
          <CvSection key={title} title={title}>
            <LangSkills
              title={title}
              levels={cvLabels[2].levels}
              data={cvData[apiKey]}
            />
          </CvSection>
        );
      case cvLabels[1].title:
        return (
          <CvSection key={title} title={title}>
            <CvUnit title={title} data={cvData[apiKey]} cvLabelIdx={1} />
          </CvSection>
        );

      case cvLabels[3].title:
        return (
          <CvSection key={title} title={title}>
            <CvUnit title={title} data={cvData[apiKey]} cvLabelIdx={3} />
          </CvSection>
        );

      case cvLabels[4].title:
        return (
          <CvSection key={title} title={title}>
            <CvUnit title={title} data={cvData[apiKey]} cvLabelIdx={4} />
          </CvSection>
        );
      default:
        return console.log('Something gone wrong');
    }
  });
  return <div className={classPrefix}>{cvData ? sections : 'Loading...'}</div>;
};

const mapStateToProps = state => {
  const { cvLabels, cvData } = state;
  return { cvLabels, cvData };
};

export default connect(mapStateToProps)(CurrVitae);
