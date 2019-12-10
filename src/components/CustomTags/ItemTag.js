
import React from 'react';

const ItemTag = ({ id, name, idx, onClickCustomTag }) => (
  <li
    onClick={() => onClickCustomTag({ id, name })}
    className='CustomTags__task-item'
  >
    <div className='CustomTags__count-task'>{ idx + 1 }</div>
    { name }
  </li>
);

export default ItemTag;