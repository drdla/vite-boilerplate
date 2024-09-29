import React from 'react';
import RaceTrack from './components/RaceTrack';
// import BatteryStatus from './components/BatteryStatus';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Rasenmähroboter Steuerung</h1>
      <div className="main-content">
        <RaceTrack gardenWidth={30} gardenHeight={20} />
        {/* <div className="control-panel">
          <BatteryStatus batteryLevel={75} />
        </div> */}
      </div>
    </div>
  );
}

export default App;
