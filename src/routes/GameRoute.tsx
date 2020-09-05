import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { css } from 'astroturf';

import PlayGame from 'components/PlayGame';

const cn = css`
  .game {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
`;

const GameRoute = () => {
  const { size } = useParams<{ size: string }>();
  const history = useHistory();

  const sizes = size.split('-');

  if (sizes.length !== 2) {
    history.replace('/');
    return null;
  }

  const [rowsString, colsString] = sizes;
  const rows = Number(rowsString);
  const cols = Number(colsString);
  if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    history.replace('/');
    return null;
  }

  return (
    <div className={cn.game}>
      <div className={cn.container}>
        <PlayGame rows={rows} cols={cols} />
      </div>
    </div>
  );
};

export default GameRoute;
