import { useState, useEffect } from 'react';

const usePlayScore = () => {
  const [playing, setPlaying] = useState(true);
  const [taps, setTaps] = useState(0);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (playing) {
      const id = setInterval(() => {
        setTime(new Date().getTime() - startTime);
      }, 53);
      return () => clearInterval(id);
    }
  }, [playing, startTime]);

  const start = () => {
    setTaps(0);
    setTime(0);
    setStartTime(new Date().getTime());
    setPlaying(true);
  };

  const stop = () => {
    setPlaying(false);
    setTime(new Date().getTime() - startTime);
  };

  const tap = () => setTaps(t => t + 1);

  return {
    taps,
    time,
    start,
    stop,
    tap,
  };
};

export default usePlayScore;
