import React from "react";
import DeviceListHeading from "./DeviceListHeading";
import DeviceListRow from "./DeviceListRow";

const deviceArr = [1, 3, 4, 5, 6, 7, 8];

function DeviceTable() {
  return (
    <div>
      <table>
        <thead>
          <DeviceListHeading />
        </thead>
        <tbody>
          {deviceArr && deviceArr.map((device) => <DeviceListRow />)}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceTable;
