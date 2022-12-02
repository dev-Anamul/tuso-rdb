const managerCreateTicketValidation = (ticketObj) => {
  const error = {};

  if (!ticketObj.districtID) {
    error.districtID = "Required!";
  }
  if (!ticketObj.description) {
    error.description = "Required!";
  }
  if (!ticketObj.dateReported) {
    error.dateReported = "Required!";
  }
  if (!ticketObj.facilityID) {
    error.facilityID = "Required!";
  }
  if (!ticketObj.systemID) {
    error.systemID = "Required!";
  }
  if (!ticketObj.provinceID) {
    error.provinceID = "Required!";
  }
  if (!ticketObj.teamID) {
    error.teamID = "Required!";
  }

  if (!ticketObj.secondLevelCategoryID) {
    error.secondLevelCategoryID = "Required!";
  }
  if (!ticketObj.firstLevelCategoryID) {
    error.firstLevelCategoryID = "Required!";
  }
  if (!ticketObj.priorityID) {
    error.priorityID = "Required!";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default managerCreateTicketValidation;
