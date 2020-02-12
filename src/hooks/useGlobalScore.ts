import { useContext } from 'react';
import { GlobalScoreContext, Score } from '../components/GlobalScoreProvider';

const useGlobalScore = () => {
  const [state, dispatch] = useContext(GlobalScoreContext);

  const saveScore = (level: string, score: Score) => {
    if (dispatch) {
      dispatch({ type: 'SAVE', level, score });
    }
  };

  const resetScore = () => {
    if (dispatch) {
      dispatch({ type: 'RESET' });
    }
  };

  return { score: state, saveScore, resetScore };
};

export default useGlobalScore;
