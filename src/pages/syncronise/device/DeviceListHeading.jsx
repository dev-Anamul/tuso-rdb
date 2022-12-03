import React from "react";

function DeviceListHeading() {
  return (
    <tr>
      <th>Username</th>
      <th>Device name</th>
      <th>Public IP address</th>
      <th>Private IP address</th>
      <th>CPU usage</th>
      <th>Total memory</th>
      <th>Memory Used</th>
      <th>Available memory</th>
      <th>Memory consumption percentage</th>
      <th>Status</th>
    </tr>
  );
}

export default DeviceListHeading;
