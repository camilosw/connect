import React, { createContext, useReducer, useContext } from 'react';

interface Score {
  time: number;
  taps: number;
}

interface ScoreRecord {
  best: Score;
  last: Score;
}

type State = Map<string, ScoreRecord>;

interface SaveAction {
  type: 'SAVE';
  level: string;
  score: Score;
}

interface ResetAction {
  type: 'RESET';
}

type Action = SaveAction | ResetAction;

interface Context {
  score: State;
  saveScore(level: string, score: Score): void;
  resetScore(): void;
}

export const initialValues = new Map<string, ScoreRecord>();

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SAVE': {
      const currentScore = state.get(action.level);
      const bestScore = { ...action.score };
      if (currentScore) {
        if (currentScore.best.taps < action.score.taps) {
          bestScore.taps = currentScore.best.taps;
        }
        if (currentScore.best.time < action.score.time) {
          bestScore.time = currentScore.best.time;
        }
      }

      const newScore = {
        last: action.score,
        best: bestScore,
      };

      const storeClone = new Map(state);
      return storeClone.set(action.level, newScore);
    }

    case 'RESET':
      return initialValues;

    default:
      return state;
  }
};

const GlobalScoreContext = createContext<Context>({
  score: initialValues,
  saveScore: () => undefined,
  resetScore: () => undefined,
});

const GlobalScoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const saveScore = (level: string, score: Score) => {
    dispatch({ type: 'SAVE', level, score });
  };

  const resetScore = () => {
    dispatch({ type: 'RESET' });
  };

  const context = {
    score: state,
    saveScore,
    resetScore,
  };

  return (
    <GlobalScoreContext.Provider value={context}>
      {children}
    </GlobalScoreContext.Provider>
  );
};

export const useGlobalScore = () => {
  return useContext(GlobalScoreContext);
};

export default GlobalScoreProvider;
