import React, { useState, useEffect } from 'react';
import robotIcon from '../assets/lawn-robot-mower.svg';

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
  const [progress, setProgress] = useState(0);
  const [robotDirection, setRobotDirection] = useState<'left' | 'right'>('right');

  const trees: Obstacle[] = [
    { x: Math.floor(gardenWidth / 3), y: Math.floor(gardenHeight / 3), width: 1, height: 1 },
    { x: Math.floor(gardenWidth * 2 / 3), y: Math.floor(gardenHeight * 2 / 3), width: 1, height: 1 }
  ];

  const bench: Obstacle = { x: Math.floor(gardenWidth / 2) - 3, y: gardenHeight - 3, width: 6, height: 2 };
  const chargingStation: RobotPosition = { x: 0, y: 0 };

  const obstacles = [...trees, bench];

  const MAX_BATTERY_LEVEL = 400;
  const BASE_CHARGING_DURATION = 15; // 15 seconds base charging time
  const BASE_MOVE_INTERVAL = 1000; // Base interval for 1 field per second

  // Berechne die Anzahl der mähbaren Zellen (ohne Hindernisse)
  const mowableCells = gardenWidth * gardenHeight - obstacles.reduce((sum, obstacle) => sum + obstacle.width * obstacle.height, 0);

  const cameraViewSize = 5; // Size of the camera view (5x5 grid)

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
                const adjustedChargingDuration = BASE_CHARGING_DURATION / speed;
                if (time < adjustedChargingDuration) {
                  return time + (1 / speed); // Increment by a fraction based on speed
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

          // Determine the next position
          const nextPosition = getNextPosition(prev);

          // Update the robot direction based on movement
          if (nextPosition.x > prev.x) {
            setRobotDirection('right');
          } else if (nextPosition.x < prev.x) {
            setRobotDirection('left');
          }

          return nextPosition;
        });
      }, BASE_MOVE_INTERVAL / speed);

      return () => clearInterval(interval);
    }
  }, [isSimulationRunning, gardenWidth, gardenHeight, batteryLevel, isCharging, isMowingComplete, speed, isReturningToLastPosition]);

  useEffect(() => {
    // Berechne den Fortschritt
    const mowedCells = mowedAreas.flat().filter(cell => cell).length;
    const newProgress = (mowedCells / mowableCells) * 100;
    setProgress(Math.min(newProgress, 100)); // Begrenzt den Fortschritt auf maximal 100%
  }, [mowedAreas, mowableCells]);

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

  const findNearestUnmowedCell = (currentPosition: RobotPosition): RobotPosition | null => {
    const queue: { position: RobotPosition; distance: number }[] = [{ position: currentPosition, distance: 0 }];
    const visited: boolean[][] = Array(gardenHeight).fill(null).map(() => Array(gardenWidth).fill(false));
    visited[currentPosition.y][currentPosition.x] = true;

    while (queue.length > 0) {
      const { position, distance } = queue.shift()!;

      if (!mowedAreas[position.y][position.x] && !isObstacle(position.x, position.y)) {
        return position;
      }

      const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 }
      ];

      for (const { dx, dy } of directions) {
        const newX = position.x + dx;
        const newY = position.y + dy;

        if (isValidMove(newX, newY) && !visited[newY][newX]) {
          queue.push({ position: { x: newX, y: newY }, distance: distance + 1 });
          visited[newY][newX] = true;
        }
      }
    }

    return null; // Kein ungemähtes Feld gefunden
  };

  const getNextPosition = (currentPosition: RobotPosition): RobotPosition => {
    const nearestUnmowedCell = findNearestUnmowedCell(currentPosition);

    if (nearestUnmowedCell) {
      return moveTowardsPosition(currentPosition, nearestUnmowedCell);
    } else {
      setIsMowingComplete(true);
      return moveTowardsChargingStation(currentPosition);
    }
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

  const getCameraView = () => {
    const view: JSX.Element[] = [];

    for (let y = -Math.floor(cameraViewSize/2); y <= Math.floor(cameraViewSize/2); y++) {
      for (let x = -Math.floor(cameraViewSize/2); x <= Math.floor(cameraViewSize/2); x++) {
        const cellX = robotPosition.x + x;
        const cellY = robotPosition.y + y;
        let cellContent: JSX.Element | null = null;

        if (cellX >= 0 && cellX < gardenWidth && cellY >= 0 && cellY < gardenHeight) {
          if (x === 0 && y === 0) {
            cellContent = <img src={robotIcon} alt="Robot" style={{ width: '100%', height: '100%', transform: robotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }} />;
          } else if (isObstacle(cellX, cellY)) {

            cellContent = <div style={{ backgroundColor: '#8B4513', width: '100%', height: '100%', borderRadius: '50%' }} />;
          } else {
            console.log('Obstacle at 2');
            cellContent = <div style={{ backgroundColor: (mowedAreas?.[cellY]?.[cellX] ?? false) ? '#90EE90' : '#228B22', width: '100%', height: '100%' }} />;
          }
        } else {
          cellContent = <div style={{ backgroundColor: '#808080', width: '100%', height: '100%' }} />;
        }

        view.push(
          <div key={`camera-${x}-${y}`} style={{ width: '20px', height: '20px' }}>
            {cellContent}
          </div>
        );
      }
    }
    return view;
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
              backgroundColor: '#8B4513',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 5
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '0',
              width: '20px',
              height: '20px',
              backgroundColor: '#228B22',
              borderRadius: '50%',
              boxShadow: '0 0 0 2px #006400'
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
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '2px',
            height: '4px',
            backgroundColor: '#A0522D',
            borderRadius: '2px'
          }} />
        </div>
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
        <img
          src={robotIcon}
          alt="Robot Mower"
          style={{
            position: 'absolute',
            left: `${robotPosition.x * 20}px`,
            top: `${robotPosition.y * 20}px`,
            width: '20px',
            height: '20px',
            zIndex: 10,
            transition: 'left 0.2s, top 0.2s',
            filter: isCharging ? 'hue-rotate(180deg)' : 'none',
            transform: robotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        />
      </div>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', marginTop: '10px' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '20px',
            backgroundColor: '#4CAF50',
            borderRadius: '5px',
            transition: 'width 0.3s ease-in-out'
          }}
        />
      </div>
      <p>Fortschritt: {Math.round(progress)}%</p>
      <p>Roboter Position: X: {robotPosition.x}, Y: {robotPosition.y}</p>
      <p>Batteriestand: {batteryLevel} / {MAX_BATTERY_LEVEL} ({Math.round(batteryLevel / MAX_BATTERY_LEVEL * 100)}%)</p>
      <p>
        {isCharging
          ? `Lädt... (${chargingTime.toFixed(1)}s / ${(BASE_CHARGING_DURATION / speed).toFixed(1)}s)`
          : isReturningToLastPosition
            ? 'Kehrt zur letzten Position zurück'
            : isMowingComplete
              ? 'Mähen abgeschlossen'
              : 'Mäht'}
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
      <div style={{ marginTop: '20px' }}>
        <h3>Kamera-Ansicht</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cameraViewSize}, 20px)`,
          gap: '1px',
          border: '2px solid #4a4a4a',
          padding: '5px',
          backgroundColor: '#4a4a4a'
        }}>
          {getCameraView()}
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;
