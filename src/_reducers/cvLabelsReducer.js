import i18next from "i18next";

export default () => {
  return [
    {
      formsKey: 'profile_cv_skills_forms',
      apiKey: 'profile_cv_skills',
      apiPath: 'skills',
      title: i18next.t("profile_cv.prof_skills"),
      inputsMetadata: [
        { placeholder: i18next.t("profile_cv.skill"), name: 'name', type: 'text' },
        { name: 'stars', type: 'number' }
      ]
    },
    {
      formsKey: 'profile_cv_certificates_forms',
      apiKey: 'profile_cv_certificates',
      apiPath: 'certificates',
      title: i18next.t("profile_cv.certificates"),
      inputsMetadata: [
        { placeholder: i18next.t("profile_cv.certificat_plh"), name: 'skill_name', type: 'text' },
        {
          placeholder: i18next.t("profile_cv.institution_name"),
          name: 'institution_name',
          type: 'text'
        },
        { placeholder: i18next.t("profile_cv.course_name"), name: 'course_name', type: 'text' },
        { placeholder: i18next.t("profile_cv.year"), name: 'description', type: 'date' }
      ]
    },
    {
      formsKey: 'profile_cv_languages_forms',
      apiKey: 'profile_cv_languages',
      apiPath: 'languages',
      title: i18next.t("profile_cv.languages"),
      inputsMetadata: [
        { placeholder: i18next.t("profile_cv.languag_plh"), name: 'name', type: 'text' },
        { name: 'stars', type: 'number' }
      ]
    },
    {
      formsKey: 'profile_cv_education_forms',
      apiKey: 'profile_cv_education',
      apiPath: 'education',
      title: i18next.t("profile_cv.education"),
      inputsMetadata: [
        { placeholder: i18next.t("profile_cv.institution"), name: 'institution', type: 'text' },
        { placeholder: i18next.t("profile_cv.faculty"), name: 'description', type: 'text' },
        { placeholder: i18next.t("profile_cv.profession"), name: 'profession', type: 'text' },
        { placeholder: i18next.t("profile_cv.date_start"), name: 'date_start', type: 'date' },
        { placeholder: i18next.t("profile_cv.date_end"), name: 'date_end', type: 'date' }
      ]
    },
    {
      formsKey: 'profile_cv_work_forms',
      apiKey: 'profile_cv_work',
      apiPath: 'work',
      title: i18next.t("profile_cv.work"),
      inputsMetadata: [
        { placeholder: i18next.t("profile_cv.company"), name: 'company', type: 'text' },
        { placeholder: i18next.t("profile_cv.position"), name: 'position', type: 'text' },
        { placeholder: i18next.t("description"), name: 'description', type: 'text' },
        { placeholder: i18next.t("profile_cv.date_start"), name: 'date_start', type: 'date' },
        { placeholder: i18next.t("profile_cv.date_end"), name: 'date_end', type: 'date' }
      ]
    }
  ];
};
