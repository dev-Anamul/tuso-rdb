import React from "react";

function TicketLifeHeading() {
  return (
    <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
      <th>Ticket No</th>
      <th>Facility Name</th>
      <th>Start Date</th>
      <th>Admin Open</th>
      <th>Agent Open</th>
      <th>Supervisor Open</th>
      <th>Leader Open</th>
      <th>Member Open</th>
      <th>Status</th>
    </tr>
  );
}

export default TicketLifeHeading;
