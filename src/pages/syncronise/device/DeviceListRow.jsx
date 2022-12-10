import React from "react";

function DeviceListRow({ device }) {
  return (
    <tr className="border-bottom border-2 w-100">
      <td className="py-2">{device?.username}</td>
      <td>{device?.deviceName}</td>
      <td>{device?.publicIP}</td>
      <td>{device?.privateIP}</td>
      <td>{device?.cpuUtilizationPercentage}%</td>
      <td>{device?.memoryTotal} GB</td>
      <td>{device?.memoryUsed} GB</td>
      <td>{device?.memoryAvailable} GB</td>
      <td>{device?.memoryUtilizationPercentage}%</td>
      <td>{device?.status ? "Online" : "Offline"}</td>
    </tr>
  );
}

export default DeviceListRow;
