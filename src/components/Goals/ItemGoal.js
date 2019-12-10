
import React from 'react';

const ItemGoal = ({ id, name, idx, onClickGoal }) => (
  <li
    onClick={() => onClickGoal({ id, name })}
    className='Goals__task-item'
  >
    <div className='Goals__count-task'>{ idx + 1 }</div>
    { name }
  </li>
);

export default ItemGoal;