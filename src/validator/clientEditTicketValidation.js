const clientEditTicketValidation = (ticketObj) => {
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

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default clientEditTicketValidation;
