import React from "react";
import DeviceListHeading from "./DeviceListHeading";
import DeviceListRow from "./DeviceListRow";

const deviceArr = [1, 3, 4, 5, 6, 7, 8];

function DeviceTable() {
  return (
    <div>
      <table className="responsive_table_class w-100">
        <DeviceListHeading />
        {deviceArr && deviceArr.map((device) => <DeviceListRow />)}
      </table>
    </div>
  );
}

export default DeviceTable;
