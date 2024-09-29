import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RaceTrack from './RaceTrack';

describe('RaceTrack Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    expect(screen.getByText('Gartenübersicht')).toBeInTheDocument();
  });

  it('starts simulation when start button is clicked', () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    const startButton = screen.getByText('Simulation starten');
    fireEvent.click(startButton);
    expect(screen.getByText('Simulation läuft...')).toBeInTheDocument();
  });

  it('cancels simulation when cancel button is clicked', () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    const startButton = screen.getByText('Simulation starten');
    fireEvent.click(startButton);
    const cancelButton = screen.getByText('Simulation abbrechen');
    fireEvent.click(cancelButton);
    expect(screen.getByText('Simulation starten')).toBeInTheDocument();
  });

  it('changes speed when slider is moved', () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    const slider = screen.getByLabelText(/Geschwindigkeit:/);
    fireEvent.change(slider, { target: { value: '5' } });
    expect(screen.getByText('Geschwindigkeit: 5 Feld(er) pro Sekunde')).toBeInTheDocument();
  });

  it('changes optimization strategy when buttons are clicked', () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    const spiralButton = screen.getByText('Spirale');
    fireEvent.click(spiralButton);
    expect(screen.getByText('Aktuelle Strategie: spiral')).toBeInTheDocument();
  });

  it('simulates mowing and updates battery level', () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    const startButton = screen.getByText('Simulation starten');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    const batteryStatus = screen.getByText(/Batteriestand:/);
    expect(batteryStatus.textContent).not.toBe('Batteriestand: 400 / 400 (100%)');
  });

  it('returns to charging station when battery is low', async () => {
    render(<RaceTrack gardenWidth={10} gardenHeight={10} />);
    const startButton = screen.getByText('Simulation starten');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(100000);
    });
    expect(await screen.findByText(/Lädt.../)).toBeInTheDocument();
  });
});
