import React from 'react';

interface BatteryStatusProps {
  batteryLevel?: number; // Batteriestand in Prozent
}

const BatteryStatus: React.FC<BatteryStatusProps> = ({ batteryLevel = 0 }) => {
  return (
    <div className="battery-status">
      <h3>Batteriestatus</h3>
      <div className="battery-indicator">
        <div className="battery-level" style={{ width: `${batteryLevel}%` }}></div>
      </div>
      <p>{batteryLevel}%</p>
    </div>
  );
};

export default BatteryStatus;
