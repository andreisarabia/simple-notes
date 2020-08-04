import React from 'react';

const Tags = ({ tags }) => {
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
