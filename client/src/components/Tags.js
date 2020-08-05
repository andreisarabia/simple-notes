import React, { useState } from 'react';

const Tags = ({ tags, onAddTag, onDeleteTag }) => {
  const [newTag, setNewTag] = useState('');

  const handleSubmitTag = async event => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/tag/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagName: newTag.trim() }),
    });

    const { tag } = await response.json();

    if (tag) onAddTag(tag);

    setNewTag('');
  };

  const deleteTag = async id => {
    await fetch(`http://localhost:3001/api/tag/${id}`, { method: 'DELETE' });

    onDeleteTag(id);
  };

  return (
    <>
      <form id='add-tag-inputs' onSubmit={handleSubmitTag}>
        <input
          type='text'
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
        />
        <button onClick={handleSubmitTag}>Add Tag</button>
      </form>

      {tags.length > 0 ? (
        <div className='all-tags'>
          {tags.map(tag => (
            <div className='tag-info' key={tag.id}>
              <span className='tag-name'>{tag.name}</span>
              <span className='delete-tag' onClick={() => deleteTag(tag.id)}>
                delete
              </span>
            </div>
          ))}
        </div>
      ) : (
        <i>No tags created</i>
      )}
    </>
  );
};

export default Tags;
