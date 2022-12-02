const editIncidentCategoryValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.incidentCategorys) {
    error.incidentCategorys = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default editIncidentCategoryValidator;
