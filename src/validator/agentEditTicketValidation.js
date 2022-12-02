const agentEditTicketValidation = (ticketObj) => {
  const error = {};

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

export default agentEditTicketValidation;
