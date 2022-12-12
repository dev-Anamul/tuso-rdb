import React from "react";
import TicketLifeHeading from "./TicketLifeHeading";
import TicketLifeRow from "./TicketLifeRow";

function TicketLifeTable({ ticketLifeList }) {
  return (
    <div>
      <table className="responsive_table_class w-100">
        <TicketLifeHeading />
        {ticketLifeList &&
          ticketLifeList?.map((ticket) => <TicketLifeRow ticket={ticket} />)}
      </table>
    </div>
  );
}

export default TicketLifeTable;
