export const isFeaturesHasData = ({ services }) => {
  const { servicesList } = services;
  const isUserHasServices = servicesList.length > 0;

  return { isUserHasServices };
};

export const isUserDetailsHasData = ({ cvData, portfolio }) => {
  const {
    profile_cv_skills,
    profile_cv_certificates,
    profile_cv_languages,
    profile_cv_education,
    profile_cv_work
  } = cvData;

  const isUserHasCv =
    profile_cv_skills.length > 0 ||
    profile_cv_certificates.length > 0 ||
    profile_cv_languages.length > 0 ||
    profile_cv_education.length > 0 ||
    profile_cv_work.length > 0;

  const { works } = portfolio;
  const isUserHasPortfolio = works.length > 0;
  return { isUserHasCv, isUserHasPortfolio };
};

export const isAboutMeHasData = ({ description, goals }) => {
  const isAboutMeHasDescription = Boolean(description);
  const isAboutMeHasGoals = goals.length > 0;

  return { isAboutMeHasDescription, isAboutMeHasGoals };
};
