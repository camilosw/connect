import { useEffect, useReducer } from 'react';

interface State {
  playing: boolean;
  startTime: number;
  time: number;
  taps: number;
}

interface Action {
  type: 'START' | 'TAP' | 'TIME' | 'STOP';
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'START':
      return {
        playing: true,
        startTime: new Date().getTime(),
        time: 0,
        taps: 0,
      };

    case 'TAP':
      return {
        ...state,
        taps: state.taps + 1,
      };

    case 'TIME': {
      if (!state.playing) {
        return state;
      }
      return {
        ...state,
        time: new Date().getTime() - state.startTime,
      };
    }

    case 'STOP':
      return {
        ...state,
        time: new Date().getTime() - state.startTime,
        playing: false,
      };

    default:
      return state;
  }
};

export const usePlayScore = () => {
  const [state, dispatch] = useReducer(reducer, {
    playing: false,
    startTime: 0,
    time: 0,
    taps: 0,
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (state.playing) {
      const id = setInterval(() => {
        dispatch({ type: 'TIME' });
      }, 53);
      return () => clearInterval(id);
    }
  }, [state]);

  const start = () => dispatch({ type: 'START' });
  const stop = () => dispatch({ type: 'STOP' });
  const tap = () => dispatch({ type: 'TAP' });

  return {
    taps: state.taps,
    time: state.time,
    start,
    stop,
    tap,
  };
};
