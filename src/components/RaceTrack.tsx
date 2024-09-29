import React, { useState, useEffect } from 'react';

interface RaceTrackProps {
  gardenWidth: number;
  gardenHeight: number;
}

interface RobotPosition {
  x: number;
  y: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ gardenWidth, gardenHeight }) => {
  const [robotPosition, setRobotPosition] = useState<RobotPosition>({ x: 0, y: 0 });
  const [mowedAreas, setMowedAreas] = useState<boolean[][]>([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [optimizationStrategy, setOptimizationStrategy] = useState<'random' | 'spiral' | 'zigzag'>('random');
  const [batteryLevel, setBatteryLevel] = useState(400);
  const [isCharging, setIsCharging] = useState(false);
  const [lastMowingPosition, setLastMowingPosition] = useState<RobotPosition | null>(null);
  const [isMowingComplete, setIsMowingComplete] = useState(false);
  const [chargingTime, setChargingTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isReturningToLastPosition, setIsReturningToLastPosition] = useState(false);

  const trees: Obstacle[] = [
    { x: Math.floor(gardenWidth / 3), y: Math.floor(gardenHeight / 3), width: 1, height: 1 },
    { x: Math.floor(gardenWidth * 2 / 3), y: Math.floor(gardenHeight * 2 / 3), width: 1, height: 1 }
  ];

  const bench: Obstacle = { x: Math.floor(gardenWidth / 2) - 3, y: gardenHeight - 3, width: 6, height: 2 };
  const chargingStation: RobotPosition = { x: 0, y: 0 };

  const obstacles = [...trees, bench];

  const MAX_BATTERY_LEVEL = 400;
  const CHARGING_DURATION = 15; // 15 Sekunden Ladezeit
  const BASE_MOVE_INTERVAL = 1000; // Basis-Intervall für 1 Feld pro Sekunde

  useEffect(() => {
    setMowedAreas(Array(gardenHeight).fill(null).map(() => Array(gardenWidth).fill(false)));
  }, [gardenWidth, gardenHeight]);

  useEffect(() => {
    if (isSimulationRunning) {
      const interval = setInterval(() => {
        setRobotPosition(prev => {
          if (isCharging) {
            if (prev.x === chargingStation.x && prev.y === chargingStation.y) {
              setChargingTime(time => {
                if (time < CHARGING_DURATION) {
                  return time + 1;
                } else {
                  setBatteryLevel(MAX_BATTERY_LEVEL);
                  setIsCharging(false);
                  setChargingTime(0);
                  if (isMowingComplete) {
                    setIsSimulationRunning(false);
                  } else if (lastMowingPosition) {
                    setIsReturningToLastPosition(true);
                  }
                  return 0;
                }
              });
              return prev;
            }
            return moveTowardsChargingStation(prev);
          }

          if (isReturningToLastPosition) {
            if (prev.x === lastMowingPosition?.x && prev.y === lastMowingPosition?.y) {
              setIsReturningToLastPosition(false);
              setLastMowingPosition(null);
            } else {
              return moveTowardsPosition(prev, lastMowingPosition!);
            }
          }

          if (batteryLevel <= 60 || isMowingComplete) {
            setIsCharging(true);
            setLastMowingPosition(prev);
            return moveTowardsChargingStation(prev);
          }

          // Mähe das aktuelle Feld nur, wenn es noch nicht gemäht wurde
          if (!mowedAreas[prev.y][prev.x]) {
            setMowedAreas(areas => {
              const newAreas = [...areas];
              newAreas[prev.y][prev.x] = true;
              return newAreas;
            });
            // Reduziere den Batteriestand nur, wenn tatsächlich gemäht wurde
            setBatteryLevel(level => Math.max(0, level - Math.floor(Math.random() * 3) - 1));
          }

          // Überprüfe, ob alle mähbaren Bereiche gemäht wurden
          const allMowed = mowedAreas.every((row, y) =>
            row.every((cell, x) => cell || isObstacle(x, y))
          );
          if (allMowed && !isMowingComplete) {
            setIsMowingComplete(true);
            return moveTowardsChargingStation(prev);
          }

          // Bewege den Roboter zur nächsten Position
          return getNextPosition(prev);
        });
      }, BASE_MOVE_INTERVAL / speed);

      return () => clearInterval(interval);
    }
  }, [isSimulationRunning, gardenWidth, gardenHeight, batteryLevel, isCharging, isMowingComplete, speed, isReturningToLastPosition]);

  const moveTowardsChargingStation = (currentPosition: RobotPosition): RobotPosition => {
    const dx = Math.sign(chargingStation.x - currentPosition.x);
    const dy = Math.sign(chargingStation.y - currentPosition.y);
    if (dx !== 0) {
      return { x: currentPosition.x + dx, y: currentPosition.y };
    }
    if (dy !== 0) {
      return { x: currentPosition.x, y: currentPosition.y + dy };
    }
    return currentPosition;
  };

  const moveTowardsPosition = (currentPosition: RobotPosition, targetPosition: RobotPosition): RobotPosition => {
    const dx = Math.sign(targetPosition.x - currentPosition.x);
    const dy = Math.sign(targetPosition.y - currentPosition.y);
    if (dx !== 0) {
      return { x: currentPosition.x + dx, y: currentPosition.y };
    }
    if (dy !== 0) {
      return { x: currentPosition.x, y: currentPosition.y + dy };
    }
    return currentPosition;
  };

  const getNextPosition = (currentPosition: RobotPosition): RobotPosition => {
    switch (optimizationStrategy) {
      case 'spiral':
        return getSpiralNextPosition(currentPosition);
      case 'zigzag':
        return getZigzagNextPosition(currentPosition);
      default:
        return getRandomNextPosition(currentPosition);
    }
  };

  const getRandomNextPosition = (currentPosition: RobotPosition): RobotPosition => {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 }
    ];

    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const { dx, dy } of shuffledDirections) {
      const newX = currentPosition.x + dx;
      const newY = currentPosition.y + dy;

      if (isValidMove(newX, newY) && !mowedAreas[newY][newX]) {
        return { x: newX, y: newY };
      }
    }

    // Wenn kein ungemähtes Feld gefunden wurde, suche das nächste ungemähte Feld
    for (let y = 0; y < gardenHeight; y++) {
      for (let x = 0; x < gardenWidth; x++) {
        if (!mowedAreas[y][x] && !isObstacle(x, y)) {
          return { x, y };
        }
      }
    }

    return currentPosition; // Bleibe auf der aktuellen Position, wenn alles gemäht ist
  };

  const getSpiralNextPosition = (currentPosition: RobotPosition): RobotPosition => {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 }
    ];
    let directionIndex = 0;
    let steps = 1;
    let stepCount = 0;

    while (true) {
      const { dx, dy } = directions[directionIndex];
      const newX = currentPosition.x + dx;
      const newY = currentPosition.y + dy;

      if (isValidMove(newX, newY) && !mowedAreas[newY][newX]) {
        return { x: newX, y: newY };
      }

      stepCount++;
      if (stepCount === steps) {
        directionIndex = (directionIndex + 1) % 4;
        stepCount = 0;
        if (directionIndex % 2 === 0) {
          steps++;
        }
      }

      if (steps > Math.max(gardenWidth, gardenHeight)) {
        return currentPosition;
      }
    }
  };

  const getZigzagNextPosition = (currentPosition: RobotPosition): RobotPosition => {
    const isEvenRow = currentPosition.y % 2 === 0;
    const dx = isEvenRow ? 1 : -1;
    const newX = currentPosition.x + dx;

    if (isValidMove(newX, currentPosition.y) && !mowedAreas[currentPosition.y][newX]) {
      return { x: newX, y: currentPosition.y };
    }

    const newY = currentPosition.y + 1;
    if (isValidMove(currentPosition.x, newY) && !mowedAreas[newY][currentPosition.x]) {
      return { x: currentPosition.x, y: newY };
    }

    return currentPosition;
  };

  const isValidMove = (x: number, y: number): boolean => {
    return x >= 0 && x < gardenWidth && y >= 0 && y < gardenHeight && !isObstacle(x, y);
  };

  const isObstacle = (x: number, y: number) => obstacles.some(obstacle =>
    x >= obstacle.x && x < obstacle.x + obstacle.width &&
    y >= obstacle.y && y < obstacle.y + obstacle.height
  );

  const startSimulation = () => {
    setRobotPosition(chargingStation);
    setMowedAreas(Array(gardenHeight).fill(null).map(() => Array(gardenWidth).fill(false)));
    setBatteryLevel(MAX_BATTERY_LEVEL);
    setIsCharging(false);
    setLastMowingPosition(null);
    setIsMowingComplete(false);
    setIsSimulationRunning(true);
  };

  const cancelSimulation = () => {
    setIsSimulationRunning(false);
    setRobotPosition(chargingStation);
    setMowedAreas(Array(gardenHeight).fill(null).map(() => Array(gardenWidth).fill(false)));
    setBatteryLevel(MAX_BATTERY_LEVEL);
    setIsCharging(false);
    setLastMowingPosition(null);
    setIsMowingComplete(false);
    setChargingTime(0);
    setIsReturningToLastPosition(false);
  };

  return (
    <div className="race-track" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Gartenübersicht</h2>
      <div
        className="garden-visualization"
        style={{
          width: `${gardenWidth * 20}px`,
          height: `${gardenHeight * 20}px`,
          position: 'relative',
          border: '2px solid #4a4a4a',
          borderRadius: '10px',
          margin: '20px 0',
          overflow: 'hidden',
          backgroundColor: '#228B22'
        }}
      >
        {mowedAreas.map((row, y) =>
          row.map((isMowed, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                position: 'absolute',
                left: `${x * 20}px`,
                top: `${y * 20}px`,
                width: '20px',
                height: '20px',
                backgroundColor: isMowed ? '#90EE90' : 'transparent',
                transition: 'background-color 0.3s'
              }}
            />
          ))
        )}
        {trees.map((tree, index) => (
          <div
            key={`tree-${index}`}
            style={{
              position: 'absolute',
              left: `${tree.x * 20}px`,
              top: `${tree.y * 20}px`,
              width: '20px',
              height: '20px',
              backgroundColor: '#4a2700',
              borderRadius: '50%',
              boxShadow: '0 0 0 2px #228B22, 0 0 0 4px #4a2700',
              zIndex: 5
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '16px',
              backgroundColor: '#228B22',
              borderRadius: '50% 50% 0 0'
            }} />
          </div>
        ))}
        <div
          className="bench"
          style={{
            position: 'absolute',
            left: `${bench.x * 20}px`,
            top: `${bench.y * 20}px`,
            width: `${bench.width * 20}px`,
            height: `${bench.height * 20}px`,
            backgroundColor: '#8B4513',
            zIndex: 5,
            borderRadius: '5px'
          }}
        />
        <div
          className="charging-station"
          style={{
            position: 'absolute',
            left: `${chargingStation.x * 20}px`,
            top: `${chargingStation.y * 20}px`,
            width: '30px',
            height: '30px',
            backgroundColor: '#4169E1',
            borderRadius: '5px',
            zIndex: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ color: 'white', fontSize: '20px' }}>⚡</div>
        </div>
        <div
          className="robot"
          style={{
            position: 'absolute',
            left: `${robotPosition.x * 20}px`,
            top: `${robotPosition.y * 20}px`,
            width: '20px',
            height: '20px',
            backgroundColor: isCharging ? '#FFD700' : '#FF6347',
            borderRadius: '50%',
            border: '2px solid #DAA520',
            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
            zIndex: 10,
            transition: 'left 0.2s, top 0.2s, background-color 0.3s',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ color: 'black', fontSize: '14px' }}>🤖</div>
        </div>
      </div>
      <p>Roboter Position: X: {robotPosition.x}, Y: {robotPosition.y}</p>
      <p>Batteriestand: {batteryLevel} / {MAX_BATTERY_LEVEL} ({Math.round(batteryLevel / MAX_BATTERY_LEVEL * 100)}%)</p>
      <p>
        {isCharging ? `Lädt... (${chargingTime}s / ${CHARGING_DURATION}s)` :
         isReturningToLastPosition ? 'Kehrt zur letzten Position zurück' :
         isMowingComplete ? 'Mähen abgeschlossen' : 'Mäht'}
      </p>
      <div>
        <label htmlFor="speed-slider">Geschwindigkeit: {speed} Feld(er) pro Sekunde</label>
        <input
          id="speed-slider"
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ width: '200px', margin: '10px 0' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={startSimulation}
          disabled={isSimulationRunning}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isSimulationRunning ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isSimulationRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isSimulationRunning ? 'Simulation läuft...' : 'Simulation starten'}
        </button>
        <button
          onClick={cancelSimulation}
          disabled={!isSimulationRunning}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: !isSimulationRunning ? '#ccc' : '#FF6347',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: !isSimulationRunning ? 'not-allowed' : 'pointer'
          }}
        >
          Simulation abbrechen
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setOptimizationStrategy('random')}
          style={{
            padding: '5px 10px',
            margin: '0 5px',
            backgroundColor: optimizationStrategy === 'random' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Zufällig
        </button>
        <button
          onClick={() => setOptimizationStrategy('spiral')}
          style={{
            padding: '5px 10px',
            margin: '0 5px',
            backgroundColor: optimizationStrategy === 'spiral' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Spirale
        </button>
        <button
          onClick={() => setOptimizationStrategy('zigzag')}
          style={{
            padding: '5px 10px',
            margin: '0 5px',
            backgroundColor: optimizationStrategy === 'zigzag' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Zickzack
        </button>
      </div>
      <p>Aktuelle Strategie: {optimizationStrategy}</p>
    </div>
  );
};

export default RaceTrack;
