import React from "react";

function TicketLifeRow({ ticket }) {
  return (
    <tr className="border-bottom border-2 w-100">
      <td className="py-2">{ticket?.ticketNo}</td>
      <td>{ticket?.facilityName}</td>
      <td>{ticket?.startDate}</td>
      <td>{ticket?.openByAdmin}</td>
      <td>{ticket?.openByAgent}</td>
      <td>{ticket?.openBySupervisor}</td>
      <td>{ticket?.openByExpertLead}</td>
      <td>{ticket?.openByExpert}</td>
      <td>{ticket?.ticketClosed}</td>
    </tr>
  );
}

export default TicketLifeRow;
