import React, { useState } from 'react';

const Tags = () => {
  const [tags, setTags] = useState([
    { id: 1, name: 'personal' },
    { id: 2, name: 'politics' },
  ]);

  return (
    <>
      <div id='add-tag-inputs'>
        <input type='text' />
        <button>Add Tag</button>
      </div>

      <div className='all-tags'>
        {tags.map(tag => (
          <div className='tag-info' key={tag.id}>
            <span className='tag-name'>{tag.name}</span>
            <span className='delete-tag'>delete</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tags;
