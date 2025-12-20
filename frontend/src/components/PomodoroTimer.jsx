import React, { useState, useEffect, useRef } from 'react';
import startSfx from '../assets/sounds/startTimer.mp3'
import pauseSfx from '../assets/sounds/pauseTimer.mp3'
import timesUpSfx from '../assets/sounds/timesUp.mp3'

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work');
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isMuted, setIsMuted] = useState(false);

  // refs to hold latest values for use inside interval callback
  const totalRef = useRef(workDuration * 60);
  const intervalRef = useRef(null);
  const isMutedRef = useRef(isMuted);
  const sessionRef = useRef(sessionType);
  const workDurationRef = useRef(workDuration);
  const breakDurationRef = useRef(breakDuration);
  const prevTotalRef = useRef(totalRef.current);

  // keep refs in sync with state
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { sessionRef.current = sessionType; }, [sessionType]);
  useEffect(() => { workDurationRef.current = workDuration; }, [workDuration]);
  useEffect(() => { breakDurationRef.current = breakDuration; }, [breakDuration]);

  // initialize totalRef when component mounts
  useEffect(() => {
    totalRef.current = workDuration * 60;
    setMinutes(Math.floor(totalRef.current / 60));
    setSeconds(totalRef.current % 60);
    prevTotalRef.current = totalRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playAudio = (src) => {
    if (!isMutedRef.current) {
      const audio = new Audio(src);
      audio.play().catch(()=>{});
    }
  };

  const switchSessionAndSetTotal = (newSession) => {
    if (newSession === 'break') {
      totalRef.current = breakDurationRef.current * 60;
    } else {
      totalRef.current = workDurationRef.current * 60;
    }
    sessionRef.current = newSession;
    setSessionType(newSession);
    setMinutes(Math.floor(totalRef.current / 60));
    setSeconds(totalRef.current % 60);
  };

  const tick = () => {
    if (totalRef.current <= 0) return;

    totalRef.current -= 1;
    const mins = Math.floor(totalRef.current / 60);
    const secs = totalRef.current % 60;
    setMinutes(mins);
    setSeconds(secs);

    if (totalRef.current === 0) {
      // play notification
      playAudio(timesUpSfx);

      // switch session and set next total, then stop the timer (preserve previous behavior)
      const nextSession = sessionRef.current === 'work' ? 'break' : 'work';
      switchSessionAndSetTotal(nextSession);

      // stop timer after session end (user can start again)
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsActive(false);
    }
  };

  // start/stop interval when isActive changes
  useEffect(() => {
    if (isActive) {
      // ensure totalRef has current remaining time if starting mid-way
      if (intervalRef.current == null) {
        intervalRef.current = setInterval(tick, 1000);
      }
    } else {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // detect external manual sets to 0 and play notification (edge cases)
  useEffect(() => {
    const total = minutes * 60 + seconds;
    if (prevTotalRef.current > 0 && total === 0) {
      playAudio(timesUpSfx);
    }
    prevTotalRef.current = total;
  }, [minutes, seconds]);

  const playStart = () => playAudio(startSfx);
  const playPause = () => playAudio(pauseSfx);

  const handleStart = () => {
    // ensure totalRef is in sync (useful if durations changed while stopped)
    totalRef.current = minutes * 60 + seconds;
    setIsActive(true);
    playStart();
  };
  const handlePause = () => { setIsActive(false); playPause(); };
  const handleReset = () => {
    setIsActive(false);
    const resetTotal = workDurationRef.current * 60;
    totalRef.current = resetTotal;
    setSessionType('work');
    sessionRef.current = 'work';
    setMinutes(Math.floor(resetTotal / 60));
    setSeconds(resetTotal % 60);
    playPause();
  };

  const handleWorkDurationChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setWorkDuration(value);
    workDurationRef.current = value;
    // if currently showing work and timer is stopped, update display
    if (sessionRef.current === 'work' && !isActive) {
      totalRef.current = value * 60;
      setMinutes(Math.floor(totalRef.current / 60));
      setSeconds(totalRef.current % 60);
    }
  };

  const handleBreakDurationChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setBreakDuration(value);
    breakDurationRef.current = value;
    if (sessionRef.current === 'break' && !isActive) {
      totalRef.current = value * 60;
      setMinutes(Math.floor(totalRef.current / 60));
      setSeconds(totalRef.current % 60);
    }
  };

  return (
    <div className='flex flex-col gap-4 sm:gap-6 h-full w-full bg-transparent p-4 sm:p-5 md:p-6 lg:p-8 border
                    border-amber-900 transition-all duration-100 ease-in-out hover:shadow-amber-900/50 hover:shadow-lg
                    background-blur min-h-[420px]'>
      {/* Header */}
      <div className='text-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-amber-400 tracking-wide mb-2 major-mono-display-regular'>
          {sessionType === 'work' ? 'Work Session' : 'Break Time'}
        </h2>
      </div>

      {/* Timer Display */}
      <div className='flex justify-center items-center'>
        <div className='text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold text-amber-300 font-mono tracking-wider leading-tight'
             style={{ textShadow: '0 0 10px rgba(245, 158, 11, 0.3)' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {/* Controls Section */}
      <div className='flex flex-col gap-3 my-2'>
        <div className='flex gap-2 justify-center flex-wrap'>
          <button
            onClick={handleStart}
            disabled={isActive}
            className='px-3 sm:px-4 py-2 bg-white/10 border border-white/20 text-amber-400 rounded-md cursor-pointer text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 active:scale-95'
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isActive}
            className='px-3 sm:px-4 py-2 bg-white/10 border border-white/20 text-amber-400 rounded-md cursor-pointer text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 active:scale-95'
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className='px-3 sm:px-4 py-2 bg-white/10 border border-white/20 text-amber-400 rounded-md cursor-pointer text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 active:scale-95'
          >
            Reset
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div className='flex flex-col gap-3 mt-4 pt-4 border-t border-white/10'>
        {/* Work Duration */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-gray-300'>
          <label className='text-gray-400 font-medium text-sm sm:text-base md:text-lg'>Work Duration</label>
          <input
            type='number'
            value={workDuration}
            onChange={handleWorkDurationChange}
            disabled={isActive}
            className='w-14 sm:w-16 md:w-20 px-2 py-1 bg-white/5 border border-white/15 text-amber-400 rounded text-sm sm:text-base md:text-lg text-center transition-all duration-200 focus:outline-none focus:bg-white/10 focus:border-amber-400/40 focus:shadow-md focus:shadow-amber-400/20 disabled:opacity-50'
            min='1'
            max='60'
          />
        </div>

        {/* Break Duration */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-gray-300'>
          <label className='text-gray-400 font-medium text-sm sm:text-base md:text-lg'>Break Duration</label>
          <input
            type='number'
            value={breakDuration}
            onChange={handleBreakDurationChange}
            disabled={isActive}
            className='w-14 sm:w-16 md:w-20 px-2 py-1 bg-white/5 border border-white/15 text-amber-400 rounded text-sm sm:text-base md:text-lg text-center transition-all duration-200 focus:outline-none focus:bg-white/10 focus:border-amber-400/40 focus:shadow-md focus:shadow-amber-400/20 disabled:opacity-50'
            min='1'
            max='30'
          />
        </div>

        {/* Mute Toggle */}
        <div className='flex items-center gap-3 mt-2'>
          <button
            onClick={() => { setIsMuted(v => !v); }}
            className='w-8 h-8 sm:w-9 sm:h-9 bg-white/10 border border-white/20 text-amber-400 rounded cursor-pointer flex items-center justify-center text-lg sm:text-xl transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20'
            aria-label='Toggle sound'
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <span className='text-gray-400 text-sm sm:text-base md:text-lg'>{isMuted ? 'Muted' : 'Sound On'}</span>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;