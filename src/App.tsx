import React from 'react';
import RaceTrack from './components/RaceTrack';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Rasenmähroboter Steuerung</h1>
      <div className="main-content">
        <RaceTrack gardenWidth={30} gardenHeight={20} />
      </div>
    </div>
  );
}

export default App;
