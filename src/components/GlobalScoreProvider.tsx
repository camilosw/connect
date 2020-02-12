import React, { createContext, useReducer } from 'react';

export interface Score {
  time: number;
  taps: number;
}

export interface ScoreRecord {
  best: Score;
  last: Score;
}

type Store = Map<string, ScoreRecord>;

interface SaveAction {
  type: 'SAVE';
  level: string;
  score: Score;
}

interface ResetAction {
  type: 'RESET';
}

type Action = SaveAction | ResetAction;

export const initialValues = new Map<string, ScoreRecord>();

const reducer = (store: Store, action: Action) => {
  switch (action.type) {
    case 'SAVE': {
      const currentScore = store.get(action.level);
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

      const storeClone = new Map(store);
      return storeClone.set(action.level, newScore);
    }

    case 'RESET':
      return initialValues;

    default:
      return store;
  }
};

export const GlobalScoreContext = createContext<
  [Store, React.Dispatch<Action>?]
>([initialValues]);

const GlobalScoreProvider: React.FC = ({ children }) => {
  const context = useReducer(reducer, initialValues);

  return (
    <GlobalScoreContext.Provider value={context}>
      {children}
    </GlobalScoreContext.Provider>
  );
};

export default GlobalScoreProvider;
