import React, { useState } from 'react';

const AddNoteModal = ({ onSubmit, tags }) => {
  const [chosenTags, setChosenTags] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCancel = e => {
    e.preventDefault();
    setNewTitle('');
    setNewDescription('');
    setChosenTags([]);
    onSubmit(null);
  };

  const handleChosenTag = (e, tag) => {
    if (e.target.checked && !chosenTags.some(({ id }) => id === tag.id)) {
      setChosenTags([tag, ...chosenTags]);
    } else {
      setChosenTags(chosenTags.filter(chosenTag => chosenTag.id !== tag.id));
    }
  };

  return (
    <div className='modal'>
      <h3>Add Note</h3>

      <form id='add-note-grid'>
        <div id='add-title'>
          <label htmlFor='new-title-input'>Title</label>

          <input
            id='new-title-input'
            type='text'
            value={newTitle}
            onChange={e => setNewTitle(e.target.value.trim())}
            required
          />
        </div>

        <div id='add-description'>
          <label htmlFor='new-description-input'>Description</label>

          <textarea
            id='new-description-input'
            rows='5'
            cols='40'
            value={newDescription}
            onChange={e => setNewDescription(e.target.value.trim())}
            required
          ></textarea>
        </div>

        <div id='add-tags'>
          <label>Tags</label>

          <div id='tag-checkboxes'>
            {tags.map(tag => (
              <div key={tag.id}>
                <input
                  key={tag.id}
                  type='checkbox'
                  name={tag.name}
                  id={tag.name}
                  defaultChecked={false}
                  onChange={e => handleChosenTag(e, tag)}
                />

                <label htmlFor={tag.name}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div id='submit-new-note'>
          <button onClick={handleCancel}>Cancel</button>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteModal;
